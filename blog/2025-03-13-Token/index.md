---
slug: design-token
title: design token
authors: [andy]
tags: ["雜記"]
---

# 前言

近期因為公司專案部份功能進行重構，再加上之前公司的專案內並沒有定義 Desgin Guide，前端在實做各元件時都是直接照設計稿上的樣式去填值，也因此常常遇到要改一個顏色需要全盤修改與盤點，非常耗時。因此在這次要進行重構時，與設計討論要將 Design Token 概念導入。

由於目前公司設計稿是使用 Figma 來設計，因此我們是用 Tokens Studio for Figma 這個在 Figma 上的 Plugin。

## Figma

在 Figma 上使用 Tokens Studio for Figma，整體上要設定並不困難，同時又可以與如 Github 之類的 remote repository 連動，對於要讓設計給完後同步給前端來說很方便。較須注意注意的我覺得是命名方式。

## To RD

在如何將 Token 轉換成 RD 程式上的邏輯，我覺得是較麻煩的部份。我們是使用 Style Dictinoary 和 sd-transforms 這兩個套件來完成。由於我們的專案是使用目前最新的 Tailwind 4.0，目前在相關的 formatter 上面是沒有找到，因此選擇自己完成 formatter。

在 formatter 轉換邏輯上，就需要了解 Token Studio 上的命名模式了，除非要自己做大量的 mapping，不然好的命名方式對於在將 token 轉成 RD 程式上的邏輯會是比較輕鬆的。

## 結論

目前自己公司在 token 的使用上事先針對 web 端來使用，但在 android 和 iOS 同樣可以使用此方法，這也是後續可以在嘗試的地方。
