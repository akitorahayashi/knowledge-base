import { defineConfig } from 'vitepress'

// GitHub Pages で正しいパスになるよう BASE_URL を計算
const BASE_URL = process.env.GITHUB_ACTIONS === 'true' ? '/knowledge-base/' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_URL,
  title: "Knowledge Base",
  description: "モバイルアプリ開発のナレッジのまとめサイト",
  ignoreDeadLinks: true,
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
    ],

    sidebar: {
      '/sources/apple-ecosystem/': [
        {
          text: 'Apple Ecosystem開発',
          items: [
            { text: 'Apple Ecosystem トップ', link: '/sources/apple-ecosystem/index' },
            { text: '記事1', link: '/sources/apple-ecosystem/contents/1-apple-ecosystem-article' },
            { text: '記事2', link: '/sources/apple-ecosystem/contents/2-apple-ecosystem-article' },
          ]
        },
      ],
      '/sources/flutter/': [
        {
          text: 'Flutter開発',
          items: [
            { text: 'Flutter トップ', link: '/sources/flutter/index' },
            { text: '記事1', link: '/sources/flutter/contents/1-flutter-article' },
            { text: '記事2', link: '/sources/flutter/contents/2-flutter-article' },
          ]
        },
      ],
      '/sources/python/': [
        {
          text: 'Python開発',
          items: [
            { text: 'Python トップ', link: '/sources/python/index' },
            { text: '記事1', link: '/sources/python/contents/1-python-article' },
          ]
        },
      ],
      '/sources/gemini-gem-prompt/': [
        {
          text: 'Gemini Gem Prompts',
          items: [
            { text: 'トップ', link: '/sources/gemini-gem-prompt/index' },
            { text: 'Apple Ecosystem Topic Generator', link: '/sources/gemini-gem-prompt/contents/1-apple-ecosystem-topic-gen' },
            { text: 'Flutter Topic Generator', link: '/sources/gemini-gem-prompt/contents/2-flutter-topic-gen' },
            { text: 'Go Language Topic Generator', link: '/sources/gemini-gem-prompt/contents/3-go-topic-gen' },
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
