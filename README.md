## 概要

VitePressを使用した開発技術ブログです

## 利用可能なコマンド

| コマンド | 説明 |
| --- | --- |
| `npx vitepress dev` | 開発モードでブログサイトを起動します。ファイルの変更はリアルタイムに反映されます。 |
| `npx vitepress build` | 本番環境用にブログサイトをビルドし、`.vitepress/dist` フォルダに出力し、最適化された静적ファイルが生成され、デプロイ可能な状態になります。 |
| `npx vitepress preview`| ビルドされた本番用サイトをローカルでプレビューし、デプロイ前に最終確認を行います。 |
| `npx export-pdf --input <Markdownファイルのパス> --server <サーバーのURL>` | 指定したMarkdownファイルをPDFとしてエクスポートします。 |

## コンテンツの追加・削除方法

### カテゴリの追加

新しいカテゴリ（例：`react`）を追加する場合は、**必ず以下の順序で**手順を実行してください：

#### ステップ1: ディレクトリ構造の作成
```bash
mkdir -p sources/react/contents
```

#### ステップ2: カテゴリトップページの作成
`sources/react/index.md` というファイルを新規作成し、**以下の形式を参考に、実際のカテゴリ名と内容に合わせて**記述してください：
```yaml
---
layout: home
title: React Knowledge Base  # ← 実際のカテゴリ名に変更

features:
  - title: React Hooks  # ← 実際の記事タイトルに変更
    details: React Hooksの使い方とベストプラクティス  # ← 実際の記事説明に変更
    link: /react/contents/1-react-hooks  # ← 実際のファイルパスに変更
  - title: State Management  # ← 実際の記事タイトルに変更
    details: ReduxやContext APIを使った状態管理  # ← 実際の記事説明に変更
    link: /react/contents/2-state-management  # ← 実際のファイルパスに変更
---
```

#### ステップ3: メインページ（sources/index.md）の更新
`sources/index.md`ファイルを開き、`features:`セクション内の**最後に**以下を追加：
```yaml
  - icon: ⚛️
    title: React
    details: ReactとNext.jsを使ったWebアプリ開発
    link: /react/
```

**⚠️ 注意**: `features:`セクションの既存項目の後に追加し、インデントを必ず合わせてください。

#### ステップ4: サイドバー設定の更新
`.vitepress/config.mts`ファイルを開き、`sidebar:`オブジェクト内の**最後に**以下を追加：
```typescript
      '/sources/react/': [
        {
          text: 'React開発',
          items: [
            { text: 'React トップ', link: '/sources/react/index' },
            { text: 'React Hooks', link: '/sources/react/contents/1-react-hooks' },
            { text: 'State Management', link: '/sources/react/contents/2-state-management' },
          ]
        },
      ],
```

### 記事の追加

既存カテゴリ（例：`react`）に新しい記事（例：`3-testing`）を追加する場合：

#### ステップ1: 記事ファイルの作成
`sources/react/contents/3-testing.md` というファイルを新規作成し、以下の形式で記述：
```markdown
# React Testing

この記事ではReactコンポーネントのテスト方法について説明します。

## Jest と React Testing Library

[記事の内容]
```

#### ステップ2: カテゴリトップページの更新
`sources/react/index.md`の`features:`セクション内に以下を追加：
```yaml
  - title: Testing
    details: JestとReact Testing Libraryを使ったテスト
    link: /react/contents/3-testing
```

#### ステップ3: サイドバーの更新
`.vitepress/config.mts`の該当カテゴリのsidebarセクション内の`items:`配列に以下を追加：
```typescript
            { text: 'Testing', link: '/sources/react/contents/3-testing' },
```

### カテゴリの削除

カテゴリ（例：`react`）を削除する場合は、**必ず以下の順序で**実行してください：

#### ステップ1: ディレクトリの削除
```bash
rm -rf sources/react
```

#### ステップ2: メインページ（sources/index.md）の更新
`sources/index.md`の`features:`セクションから該当のカテゴリ項目を削除：
```yaml
# 以下の項目を削除
  - icon: ⚛️
    title: React
    details: ReactとNext.jsを使ったWebアプリ開発
    link: /react/
```

#### ステップ3: サイドバー設定の更新
`.vitepress/config.mts`からサイドバーの項目を削除します。

```typescript
      '/sources/react/': [    # この全体を削除
        {
          text: 'React開発',
          items: [
            { text: 'React トップ', link: '/sources/react/index' },
            { text: 'React Hooks', link: '/sources/react/contents/1-react-hooks' },
            { text: 'State Management', link: '/sources/react/contents/2-state-management' },
          ]
        },
      ],
```

### 記事の削除

記事（例：`sources/react/contents/3-testing.md`）を削除する場合：

#### ステップ1: ファイルの削除
```bash
rm sources/react/contents/3-testing.md
```

#### ステップ2: カテゴリトップページの更新
`sources/react/index.md`の`features:`セクションから該当の記事項目を削除：
```yaml
# 以下の項目を削除
  - title: Testing
    details: JestとReact Testing Libraryを使ったテスト
    link: /react/contents/3-testing
```

#### ステップ3: サイドバーの更新
`.vitepress/config.mts`の該当カテゴリのsidebarセクションから該当の記事項目を削除：
```typescript
            { text: 'Testing', link: '/sources/react/contents/3-testing' },  # この行を削除
```

### 重要な注意事項

1. **ファイル名の命名規則**: 記事ファイルは必ず `[連番]-[記事名].md` の形式で命名
2. **リンクの一貫性**: 全ての参照（index.md、config.mts）で同じパスを使用
3. **インデント**: YAMLファイルでは**スペース2文字**のインデントを必ず使用
4. **カンマの管理**: config.mtsの配列項目では、最後の項目以外にカンマを付ける
5. **変更後の確認**: `npm run docs:dev`でローカルサーバーを起動し、変更が正しく反映されているか確認

### トラブルシューティング

#### リンクが404になる場合
- ファイルパスが正しいか確認
- `index.md`、`config.mts`のリンクが一致しているか確認

#### サイドバーが表示されない場合
- `config.mts`のsidebarセクションの構文が正しいか確認
- 対象ページのパスがsidebarのキーと一致しているか確認

#### ビルドエラーが発生する場合
- YAML構文エラー（インデント、コロン、ダッシュ）を確認
- TypeScript構文エラー（カンマ、ブラケット）を確認
