import { defineConfig } from 'vitepress'

// GitHub Pages で正しいパスになるよう BASE_URL を計算
const BASE_URL = process.env.GITHUB_ACTIONS === 'true' ? '/knowledge-base-mobile/' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_URL,
  title: "My Blog",
  description: "プライベートブログ - モバイルアプリ開発の技術記録",
  // ファビコンを設定
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE_URL}image/logo.png` }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'iOS', link: '/docs/ios/' },
      { text: 'Flutter', link: '/docs/flutter/' },
      { text: 'React Native', link: '/docs/react-native/' },
      { text: 'About', link: '/docs/about/' }
    ],

    sidebar: {
      '/docs/ios/': [
        {
          text: 'iOS開発',
          items: [
            { text: 'iOS トップ', link: '/docs/ios/' }
          ]
        },
        {
          text: '🏗️ 基礎',
          collapsed: false,
          items: [
            { text: 'Swift基礎', link: '/docs/ios/basics/swift' },
            { text: 'Xcode使い方', link: '/docs/ios/basics/xcode' },
            { text: 'プロジェクト設定', link: '/docs/ios/basics/project-setup' },
          ]
        },
        {
          text: '🎨 UI開発',
          collapsed: false,
          items: [
            { text: 'UIKit', link: '/docs/ios/ui/uikit' },
            { text: 'SwiftUI', link: '/docs/ios/ui/swiftui' },
            { text: 'Auto Layout', link: '/docs/ios/ui/auto-layout' },
          ]
        },
        {
          text: '📦 その他',
          collapsed: false,
          items: [
            { text: 'ライブラリ・フレームワーク', link: '/docs/ios/others/libraries' },
            { text: 'デバッグ・テスト', link: '/docs/ios/others/debug-test' },
            { text: 'App Store申請', link: '/docs/ios/others/app-store' },
          ]
        }
      ],
      '/docs/flutter/': [
        {
          text: 'Flutter開発',
          items: [
            { text: 'Flutter トップ', link: '/docs/flutter/' }
          ]
        },
        {
          text: '🏗️ 基礎',
          collapsed: false,
          items: [
            { text: 'Dart基礎', link: '/docs/flutter/basics/dart' },
            { text: 'Flutter環境構築', link: '/docs/flutter/basics/setup' },
            { text: 'プロジェクト構成', link: '/docs/flutter/basics/project-structure' },
          ]
        },
        {
          text: '🎨 UI開発',
          collapsed: false,
          items: [
            { text: 'ウィジェット基礎', link: '/docs/flutter/ui/widgets' },
            { text: 'レイアウト', link: '/docs/flutter/ui/layout' },
            { text: 'テーマ・スタイル', link: '/docs/flutter/ui/themes' },
          ]
        },
        {
          text: '📦 その他',
          collapsed: false,
          items: [
            { text: '状態管理', link: '/docs/flutter/others/state-management' },
            { text: 'パッケージ管理', link: '/docs/flutter/others/packages' },
            { text: 'ビルド・デプロイ', link: '/docs/flutter/others/build-deploy' },
          ]
        }
      ],
      '/docs/react-native/': [
        {
          text: 'React Native開発',
          items: [
            { text: 'React Native トップ', link: '/docs/react-native/' }
          ]
        },
        {
          text: '🏗️ 基礎',
          collapsed: false,
          items: [
            { text: 'React Native基礎', link: '/docs/react-native/basics/fundamentals' },
            { text: '環境構築', link: '/docs/react-native/basics/setup' },
            { text: 'プロジェクト構成', link: '/docs/react-native/basics/project-structure' },
          ]
        },
        {
          text: '🎨 UI開発',
          collapsed: false,
          items: [
            { text: 'コンポーネント', link: '/docs/react-native/ui/components' },
            { text: 'スタイリング', link: '/docs/react-native/ui/styling' },
            { text: 'ナビゲーション', link: '/docs/react-native/ui/navigation' },
          ]
        },
        {
          text: '📦 その他',
          collapsed: false,
          items: [
            { text: 'ライブラリ・パッケージ', link: '/docs/react-native/others/libraries' },
            { text: 'デバッグ・テスト', link: '/docs/react-native/others/debug-test' },
            { text: 'ビルド・デプロイ', link: '/docs/react-native/others/build-deploy' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username' } // 適宜自分のGitHubアカウントに変更してください
    ]
  }
})
