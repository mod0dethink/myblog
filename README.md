# MyBlog

Markdownで書いたメモをビルド時にHTML化し、タグ/カテゴリ一覧と検索用インデックスを自動生成するただの個人用サイト、とてもBlogとは言えない

## セットアップ

```sh
npm install
```

## 開発

```sh
npm run dev
```

## ビルド

```sh
npm run build
```

## 記事の作り方

`src/content/posts/` にMarkdownを追加します。

```yaml
---
title: "記事タイトル"
date: "2024-11-02"
category: "programming"
tags: ["astro", "memo"]
summary: "短い要約"
draft: false
---
```
