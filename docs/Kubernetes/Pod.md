---
id: Pod
title: Pod
tags:
  - Kubernetes
last_update:
  date: 2024-03-31
---

## 什麼是Pod

Pod是k8s裡面最小的單位，可以裝一個或多個container。

而container就是我們常見的容器，ex: docker, CRI-O

## Create Pod
常見的建立Pod方式是透過yaml檔 or kubectl指令建立。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

`kubectl `