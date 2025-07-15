## 概要

このパッケージは、VitePressの開発サーバーで表示されるMarkdownファイルを指定して、その内容をPDFとしてエクスポートします。

## 前提条件

1.  Node.jsとnpmがインストールされている必要があります。
2.  プロジェクトのルートで `npm install` を実行し、必要な依存パッケージをインストールしてください。

## 実行コマンド

VitePressサーバーが起動している状態で、プロジェクトのルートディレクトリから以下のコマンドを実行します。

```bash
chmod +x node_modules/.bin/export-pdf # 実行権限がない場合は付与
npx export-pdf --input <Markdownファイルのパス> --server <サーバーのURL>
```

### 引数の説明

*   **`<Markdownファイルのパス>`:**
    PDF化したいMarkdownファイルの、プロジェクトルートからの相対パスを指定します。
    例: `sources/app/ios/your-page.md`

*   **`<サーバーのURL>`:**
    起動しているVitePressサーバーのURLを指定します。

### コマンド実行例

Markdownファイル `sources/apple-ecosystem/contents/1-apple-ecosystem-article.md` を、サーバー `http://localhost:5173/` を使ってPDF化する場合:

```bash
npx export-pdf --input sources/apple-ecosystem/contents/1-apple-ecosystem-article.md --server http://localhost:5173/
```

## 出力先

生成されたPDFファイルは、すべて `packages/export-pdf/pdf/` ディレクトリに保存されます。

例: `sources/app/ios/introduction.md` → `packages/export-pdf/pdf/introduction.pdf`

元Markdownファイル名（拡張子のみ .pdf に変換）で保存されます。

## 注意事項

*   PDF生成時には、VitePressサーバーが起動している必要があります。
*   コマンドに指定する開発サーバーのURLが間違っていると、PDFを正しく生成できません（404 PageNotFound となります）。
*   指定した出力先に同名のPDFが既に存在する場合、上書きされます。 