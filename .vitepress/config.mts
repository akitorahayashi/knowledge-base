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
    ['link', { rel: 'icon', type: 'image/png', href: '/image/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'apple-touch-icon', href: '/image/logo.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'Apple Ecosystem', link: '/docs/apple-ecosystem/' },
      { text: 'Flutter', link: '/docs/flutter/' },
      { text: 'Gemini Gem', link: '/docs/gemini-gem-prompt/' }
    ],

    sidebar: {
      '/docs/apple-ecosystem/': [
        {
          text: 'Apple Ecosystem開発',
          items: [
            { text: 'Apple Ecosystem トップ', link: '/docs/apple-ecosystem/index' },
            { text: '記事1', link: '/docs/apple-ecosystem/contents/1-apple-ecosystem-article' },
            { text: '記事2', link: '/docs/apple-ecosystem/contents/2-apple-ecosystem-article' },
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
      '/docs/gemini-gem-prompt/': [
        {
          text: 'Gemini Gem Prompts',
          items: [
            { text: 'トップ', link: '/docs/gemini-gem-prompt/index' },
            { text: 'Apple Ecosystem Topic Generator', link: '/docs/gemini-gem-prompt/contents/1-apple-ecosystem-topic-gen' },
            { text: 'Flutter Topic Generator', link: '/docs/gemini-gem-prompt/contents/2-flutter-topic-gen' },
            { text: 'Go Language Topic Generator', link: '/docs/gemini-gem-prompt/contents/3-go-topic-gen' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atrh95' }
    ],
    docFooter: { prev: false, next: false }
  }
})
