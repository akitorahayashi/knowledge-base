import { defineConfig } from 'vitepress'

// GitHub Pages で正しいパスになるよう BASE_URL を計算
const BASE_URL = process.env.GITHUB_ACTIONS === 'true' ? '/knowledge-base/' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'sources',
  base: BASE_URL,
  title: "Knowledge Base",
  description: "モバイルアプリ開発のナレッジのまとめサイト",
  ignoreDeadLinks: true,
  // ファビコンを設定
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/image/logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/knowledge-base/image/logo.png' }],
    ['link', { rel: 'manifest', href: '/knowledge-base/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'apple-touch-icon', href: '/knowledge-base/image/logo.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' }
    ],

    sidebar: {
      '/apple-ecosystem/': [
        {
          items: [
            { text: 'Apple Ecosystem トップ', link: '/apple-ecosystem/' },
            { text: '記事1', link: '/apple-ecosystem/contents/1-apple-ecosystem-article' },
            { text: '記事2', link: '/apple-ecosystem/contents/2-apple-ecosystem-article' },
          ]
        },
      ],
      '/python/': [
        {
          items: [
            { text: 'Python トップ', link: '/python/' },
            { text: '記事1', link: '/python/contents/1-python-article' },
          ]
        },
      ],
      '/gemini-gem-prompt/': [
        {
          items: [
            { text: 'トップ', link: '/gemini-gem-prompt/' },
            { text: 'Apple Ecosystem Topic Generator', link: '/gemini-gem-prompt/contents/1-apple-ecosystem-topic-gen' },
            { text: 'Flutter Topic Generator', link: '/gemini-gem-prompt/contents/2-flutter-topic-gen' },
            { text: 'Go Language Topic Generator', link: '/gemini-gem-prompt/contents/3-go-topic-gen' },
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
