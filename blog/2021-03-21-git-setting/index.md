---
slug: git-setting
title: Git Setting
authors: [andy]
tags: [Learning]
---

# Git Config

Git config 是定義了 Git 環境的設定檔，這些檔案可以被存放在三個地方。

## Git Config 環境層級

1. System 層級的：`/etc/gitconfig/`

   用於針對所有用戶的設定

   可以透過以下指令來針對 system 層級做設定。

   ```=bash
   $ git config --system
   ```

2. 用戶層級的：`~/.gitconfig`

   用於針對個別使用者的設定

   可以透過以下指令針對用戶層級做設定。

   ```=bash
   $ git config --global
   ```

   個人是習慣 git 的相關設定會設置於用戶層級的，因此大多設定內容都在`~/.gitconfig`內。

3. 專案層級的：`/.git/config`

   個別專案設定的

   可以透過以下指令針對專案層級做設定。

   ```=bash
   $ git config
   ```

   大多如 remote 倉庫的位置等資訊都是設置在這個層級的。

在這三個層級裡，專案層級的東西會去覆蓋用戶層級的，而用戶層級的內容會去覆蓋 System 層級的。

Git 規格覆蓋的準則：`專案層級 > 使用者層級 > 系統層級`
