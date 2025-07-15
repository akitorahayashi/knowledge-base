# PDFエクスポートスクリプトの使用方法

このスクリプト (`export-pdf.js`) は、VitePressの開発サーバーで表示されるMarkdownファイルを指定して、その内容をPDFとしてエクスポートします。

## 前提条件

1.  Node.jsとnpmがインストールされている必要があります。
2.  プロジェクトのルートで `npm install` を実行し、必要な依存パッケージをインストールしてください。
3.  PDFをエクスポートする前に、別のターミナルでVitePressの開発サーバーを起動しておく必要があります。
    ```bash
    npm run docs:dev
    ```

## 実行コマンド

VitePress開発サーバーが起動している状態で、プロジェクトのルートディレクトリから以下のコマンドを実行します。

```bash
export-pdf -- <Markdownファイルのパス> <開発サーバーのURL>
```

### 引数の説明

*   **`<Markdownファイルのパス>`:**
    PDF化したいMarkdownファイルの、プロジェクトルートからの相対パスを指定します。
    例: `sources/app/ios/your-page.md`

*   **`<開発サーバーのURL>`:**
    起動しているVitePress開発サーバーの完全なベースURLを指定します。
    `npm run docs:dev` を実行した際にターミナルに表示されるURL（例: `http://localhost:5173/docs/`）を正確に指定してください。
    **注意:** このURLは、ポート番号やベースパス（例: `/docs/` の部分）が環境によって異なる場合があります。必ずご自身の環境で確認したURLを使用してください。

### コマンド実行例

Markdownファイル `sources/app/ios/some-feature.md` を、開発サーバー `http://localhost:5173/sources/` を使ってPDF化する場合:

```bash
npm run docs:export-pdf -- sources/app/ios/some-feature.md http://localhost:5173/sources/
```

## 出力先

生成されたPDFファイルは、以下の構造で `packages/export-pdf/pdf/` ディレクトリ以下に保存されます。

`packages/export-pdf/pdf/<プラットフォーム>/<カテゴリ>/<ファイル名>.pdf`

例えば、`sources/app/ios/introduction.md` をPDF化した場合、出力先は `packages/export-pdf/pdf/app/ios/introduction.pdf` となります。
Markdownファイルのパスに含まれる `content` という名前のディレクトリは、出力パス構造からは除外されます。

## 注意事項

*   PDF生成時には、必ずVitePress開発サーバーが起動している必要があります。
*   コマンドに指定する開発サーバーのURLが間違っていると、PDFを正しく生成できません（404 PageNotFound となります）。
*   指定した出力先に同名のPDFが既に存在する場合、上書きされます。 