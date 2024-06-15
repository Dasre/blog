---
id: K8s
title: K8s
tags:
  - Kubernetes
last_update:
  date: 2024-04-01
---

## K8s

K8s是一種可以自動化部屬、擴展和管理容器的系統。

可以想像成傳統(VM) -> 容器(ex: Docker) -> 容器管理(K8s)。

在系統還是單體的狀況下或許單純使用Docker就可以解決實務狀況，但當你需要進行Server擴展時
，或是要進行Rolling Update之類的，就會較為麻煩。

在目前三大雲上，都有提共K8s的供能。但是否採用雲端供應商提共的K8s，或是自建K8s，都要考量到
所需花費的成本或是是否有人力進行維護。

## Yaml
