---
title: "VitePressの主要コマンドまとめ"
description: "VitePressの基本的なコマンドとよく使うオプションをまとめました。"
date: "2025-07-18"
lastUpdated: "2025-07-18"
---

# VitePressの主要コマンドまとめ

VitePress を使用する際に利用するコマンドとオプションをまとめました。

🌟 基本コマンド
* vitepress dev [root]
    * 開発サーバーを起動
    * デフォルトは http://localhost:5173
* vitepress build [root]
    * 静的サイトをビルドして dist/ に出力
* vitepress serve [root]
    * ビルド後のサイトをローカルでプレビュー

🌟 よく使うオプション
dev
* --host
    * サーバーのホスト名（例：--host 0.0.0.0 で外部からアクセス可能）
* --port
    * ポート番号を指定（例：--port 4000）
* --open
    * サーバー起動時にブラウザを自動で開く
* --base <path>
    * サイトのベースパスを指定（デフォルトは /）
build
* --outDir <dir>
    * 出力先ディレクトリ（デフォルトは .vitepress/dist）
* --base <path>
    * サイトのベースパスを指定
* --clean
    * ビルド前に出力ディレクトリを削除
* --watch
    * ファイル変更を監視して自動ビルド
serve
* --port
    * プレビューサーバーのポート番号を指定
* --host
    * プレビューサーバーのホスト名を指定
* --open
    * 起動時にブラウザを開く

🌟 その他
* vitepress --help
    * 全コマンドとオプションのヘルプを表示
* vitepress dev --help
    * dev コマンドのヘルプ
* vitepress build --help
    * build コマンドのヘルプ
* vitepress serve --help
    * serve コマンドのヘルプ
