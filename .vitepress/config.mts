import { defineConfig } from 'vitepress'

// GitHub Pages で正しいパスになるよう BASE_URL を計算
const BASE_URL = process.env.GITHUB_ACTIONS === 'true' ? '/knowledge-base/' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_URL,
  title: "Knowledge Base",
  description: "モバイルアプリ開発のナレッジのまとめサイト",
  // ファビコンを設定
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/image/logo.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'iOS', link: '/docs/ios/' },
      { text: 'Flutter', link: '/docs/flutter/' }
    ],

    sidebar: {
      '/docs/ios/': [
        {
          text: 'iOS開発',
          items: [
            { text: 'iOS トップ', link: '/docs/ios/index' },
            { text: '記事1', link: '/docs/ios/contents/1-ios-article' },
            { text: '記事2', link: '/docs/ios/contents/2-ios-article' },
          ]
        },
      ],
      '/docs/flutter/': [
        {
          text: 'Flutter開発',
          items: [
            { text: 'Flutter トップ', link: '/docs/flutter/index' },
            { text: '記事1', link: '/docs/flutter/contents/1-flutter-article' },
            { text: '記事2', link: '/docs/flutter/contents/2-flutter-article' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atrh95' }
    ]
  }
})
