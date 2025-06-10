const puppeteer = require('puppeteer');
const path = require('path');
const { URL } = require('url');
const fs = require('fs');

(async () => {
    // --- ユーザーが指定する引数 ---
    // 第1引数: PDF化したいMarkdownファイルのプロジェクトルートからの相対パス
    // 例: docs/guide/introduction.md
    const mdFilePathArg = process.argv[2];

    // 第2引数: VitePress開発サーバーのベースURL
    // 例: http://localhost:5173/docs/  や http://127.0.0.1:5173/
    // 自身の環境で `npm run docs:dev` を実行した際に表示されるURLに合わせてください。
    const devServerBaseUrlArg = process.argv[3];
    // --- ここまで ---

    if (!mdFilePathArg || !devServerBaseUrlArg) {
        console.error('エラー: Markdownファイルのパスと開発サーバーのURLを引数として指定してください。');
        console.error('例: node export-pdf/export-pdf.js docs/guide/introduction.md http://localhost:5173/docs/');
        process.exit(1);
    }

    // Markdownパスの拡張子を .html に変更してページパスとする
    // (例: docs/app/ios/ios-index.md -> docs/app/ios/ios-index.html)
    const pagePath = mdFilePathArg.replace(/\.md$/, '.html');
    const targetUrl = new URL(pagePath, devServerBaseUrlArg).toString();

    // PDFの出力パスとファイル名を新しい構造で生成
    // (例: docs/app/ios/file.md -> export-pdf/pdf/app/ios/file.pdf)
    const projectRoot = process.cwd();
    const relativePathFromDocs = mdFilePathArg.startsWith('docs/') ? mdFilePathArg.substring(5) : mdFilePathArg;

    // 'content' ディレクトリをパスから除外する
    const pathParts = relativePathFromDocs.split(path.sep);
    const filteredPathParts = pathParts.filter(part => part.toLowerCase() !== 'content');
    const pathWithoutContentDir = filteredPathParts.join(path.sep);

    const pdfRelativePath = pathWithoutContentDir.replace(/\.md$/, '.pdf');
    const pdfPath = path.join(projectRoot, 'export-pdf', 'pdf', pdfRelativePath);

    console.log(`対象のMarkdownファイル: ${mdFilePathArg}`);
    console.log(`開発サーバーURL: ${devServerBaseUrlArg}`);
    console.log(`PuppeteerでアクセスするURL: ${targetUrl}`);
    console.log(`出力PDFパス: ${pdfPath}`);

    let browser;
    try {
        // PDF出力先ディレクトリを作成
        const pdfDir = path.dirname(pdfPath);
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        console.log('Puppeteerを起動中...');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        console.log('新しいページを開いています...');
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(30000); // 30秒

        console.log(`ページに移動中: ${targetUrl}`);
        await page.goto(targetUrl, {
            waitUntil: 'load'
        });

        // スクリーン用スタイルを適用
        await page.emulateMediaType('screen');

        // VitePressのコンテンツが表示されるまで待機
        await page.waitForSelector('.VPContent', { visible: true, timeout: 30000 });

        console.log(`PDFを生成中: ${pdfPath}`);
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
        });

        console.log('PDFが正常に生成されました。');

    } catch (error) {
        console.error('PDF生成中にエラーが発生しました:', error);
        process.exit(1);
    } finally {
        if (browser) {
            console.log('ブラウザを閉じています...');
            await browser.close();
        }
    }
})(); 