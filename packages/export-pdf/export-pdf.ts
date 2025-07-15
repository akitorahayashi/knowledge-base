#!/usr/bin/env node
import puppeteer, { Browser } from 'puppeteer';
import * as path from 'path';
import { URL } from 'url';
import * as fs from 'fs';

(async () => {
    const args = process.argv.slice(2);
    let mdFilePathArg: string | undefined;
    let devServerBaseUrlArg: string | undefined;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' && args[i + 1]) {
            mdFilePathArg = args[i + 1];
            i++;
        } else if (args[i] === '--server' && args[i + 1]) {
            devServerBaseUrlArg = args[i + 1];
            i++;
        }
    }

    if (!mdFilePathArg || !devServerBaseUrlArg) {
        console.error('Markdownファイルのパス(--input)とサーバーURL(--server)を指定してください。');
        console.error('例: npx export-pdf --input sources/app/ios/some-feature.md --server http://localhost:5173/');
        process.exit(1);
    }

    // .md → .html に変換（sources/は自動的に除外されます）
    let pagePath = mdFilePathArg.replace(/\.md$/, '.html');
    // sources/で始まる場合は除外
    if (pagePath.startsWith('sources/')) {
        pagePath = pagePath.substring('sources/'.length);
    }

    const targetUrl: string = new URL(pagePath, devServerBaseUrlArg).toString();


    // PDF出力パス生成（pdfディレクトリ直下にファイル名のみで保存）
    const projectRoot: string = process.cwd();
    const pdfFileName: string = path.basename(mdFilePathArg, '.md') + '.pdf';
    const pdfPath: string = path.join(projectRoot, 'packages', 'export-pdf', 'pdf', pdfFileName);

    console.log(`対象のMarkdownファイル: ${mdFilePathArg}`);
    console.log(`サーバーURL: ${devServerBaseUrlArg}`);
    console.log(`PuppeteerでアクセスするURL: ${targetUrl}`);
    console.log(`PDFの出力先: ${pdfPath}`);


    let browser: Browser | undefined;
    try {
        // PDF出力先ディレクトリ作成
        const pdfDir: string = path.dirname(pdfPath);
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        console.log('Puppeteerを起動');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        console.log('ページの作成');
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(30000); // 30秒

        console.log(`ページの移動: ${targetUrl}`);
        await page.goto(targetUrl, {
            waitUntil: 'load'
        });

        // 印刷用スタイル
        await page.emulateMediaType('print');

        // VitePressコンテンツの表示を待つ
        await page.waitForSelector('.VPContent', { visible: true, timeout: 30000 });

        console.log(`PDFを生成: ${pdfPath}`);
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
        });

        console.log('PDFの生成が完了');

    } catch (error) {
        console.error('PDF生成エラー:', error);
        process.exit(1);
    } finally {
        if (browser) {
            console.log('ブラウザを終了');
            await browser.close();
        }
    }
})();