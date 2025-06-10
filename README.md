# モバイルアプリ開発ブログ

VitePressを使用したモバイルアプリ開発技術ブログです。iOS、Flutter、React Nativeの開発記録を整理・公開するためのシステムです。

## ディレクトリ構成

```
.vitepress/     
│   └── config.mts¥
docs/
├── ios/
├── flutter/
├── react-native/
└── about/
```

*   各プラットフォーム (`ios`, `flutter`, `react-native`) ディレクトリ内には、さらにサブカテゴリを示すディレクトリが配置されます。
*   各サブカテゴリディレクトリ内には、個別の記事 (`.md` ファイル) を格納します。

## ブログ記事管理

### 基本的な記事投稿の流れ

1.  **Markdown ファイル (.md):**
    *   適切なプラットフォームのサブカテゴリディレクトリ内に記事本体を作成・編集します。
    *   プラットフォームのインデックスファイル （例：`ios/index.md`） を編集し、新しい記事へのリンクや説明を追加します。
2.  **設定ファイル (.vitepress/config.mts):**
    *   `themeConfig.nav`: サイト上部のナビゲーションメニューを編集します。
    *   `themeConfig.sidebar`: サイドバーのメニュー構造を編集します。記事を追加・削除した際は、ここも更新してください。

### 既存サブカテゴリへの記事追加

既存のサブカテゴリ （例：`docs/ios/basics/`、`docs/flutter/ui/` など） に新しい記事を追加する手順です。

1.  **Markdown ファイル作成:**
    *   対象サブカテゴリディレクトリに新しい `.md` ファイルを作成します （例：`docs/ios/basics/new-feature.md`）。
2.  **プラットフォーム index ファイルを更新:**
    *   対象プラットフォームのインデックスファイル （例：`docs/ios/index.md`） を開き、新しい記事へのリンクと説明を追記します。
        ```markdown
        ### 🏗️ 基礎
        - [Swift基礎](./basics/swift.md)
        - [新機能について](./basics/new-feature.md)
        ```
3.  **サイドバー設定更新 （.vitepress/config.mts）:**
    *   必要に応じて、`config.mts` の `themeConfig.sidebar` 内の該当プラットフォームの対象サブカテゴリの `items` 配列に、新しい記事へのリンクを追加します。
        ```typescript
        // 例：iOSの場合
        {
          text: '🏗️ 基礎',
          collapsed: false,
          items: [
            { text: 'Swift基礎', link: '/docs/ios/basics/swift' },
            { text: '新機能について', link: '/docs/ios/basics/new-feature' }
          ]
        },
        ```

### 新しいサブカテゴリの追加

既存のプラットフォーム （例：`docs/ios/`） 内に新しいサブカテゴリ （例：`advanced`） を追加する手順です。

1.  **ディレクトリを作成:**
    *   `docs/ios/advanced/` ディレクトリを作成します。
2.  **記事作成:**
    *   `docs/ios/advanced/` 内に記事 `.md` ファイルを作成します。
3.  **プラットフォーム Index 更新:**
    *   `docs/ios/index.md` を開き、該当セクションに新しいサブカテゴリとその記事へのリンクを追加します。
        ```markdown
        ### 🚀 上級者向け
        高度なiOS開発技術
        
        - [パフォーマンス最適化](./advanced/performance.md)
        ```
4.  **サイドバー設定更新 （.vitepress/config.mts）:**
    *   `themeConfig.sidebar` 内の `/docs/ios/` キーに、新しいサブカテゴリのグループを追加します。
        ```typescript
        {
          text: '🚀 上級者向け',
          collapsed: false,
          items: [
            { text: 'パフォーマンス最適化', link: '/docs/ios/advanced/performance' },
          ]
        },
        ```

## 利用可能なスクリプト

プロジェクトディレクトリで、以下のコマンドを実行できます。

| コマンド  | 説明   |
| --------------- | --------------------------- |
| `npm run docs:dev`      | 開発モードでブログサイトを起動します。ファイルの変更はリアルタイムに反映されます。 |
| `npm run docs:build`    | 本番環境用にブログサイトをビルドし、`.vitepress/dist` フォルダに出力し、最適化された静的ファイルが生成され、デプロイ可能な状態になります。 |
| `npm run docs:preview` | ビルドされた本番用サイトをローカルでプレビューし、デプロイ前に最終確認を行います。 |
| `npm run docs:export-pdf` | サイト全体のブログ記事を単一のPDFファイルとしてプロジェクトルートにエクスポートします。 |