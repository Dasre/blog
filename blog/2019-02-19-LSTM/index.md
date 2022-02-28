---
slug: LSTM
title: LSTM
authors: [andy]
tags: [DeepLearning]
---

LSTM 的 input 須為三維，其一些參數介紹

假設現在有 10000 筆測試資料

- epoch = 10 -> 訓練 10000 筆資料 10 次
- batch size = 100 -> 一次處理這 10000 筆資料的其中 100 筆，再來是另外 100 筆...
- timesteps = 5 -> 相當於用(Xn-4,Xn-3,Xn-2,Xn-1,Xn)預測 Xn+1 時刻的值。
- data_dim = 3 -> 等於特徵值有 3 個
