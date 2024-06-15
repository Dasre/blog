---
id: Pod
title: Pod
tags:
  - Kubernetes
last_update:
  date: 2024-06-13
---

## Rolling Updates

Rollout Command

```shell
kubectl rollout status deployment/xxx
```

```shell
kubectl rollout history deployment/xxx
```

## Deployment Strategy

1. Pod 全部下線，再全部上線 (Recreate)
2. 一個一個來，關一個開一個 (Rolling Update) -> 默認的更新方式
3. Blue/Green
   - 兩個 Deployment v1 blue, v2 green，假設 Service 預設連接 v1, 可以透過更改 Service 的 selector 指到 v2 的 replia set
4. Canary

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
    type: front-end
spec:
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
        - name: nginx-container
          image: nginx
  replicas: 3
  selector:
    matchLabels:
      type: front-end
```

image: nginx -> nginx:1.7.1

```shell
kubectl apply -f deployment-definition.yml

kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1
```

在更新的時候，會在起一個新的 Replica Set，當成功啟動一個 Pod 後，會在原本的 Replica Set 刪除一個，持續到達成要求的 Pod 數量

更新完成後，若發現新版本有問題

```shell
kubectl rollout undo deployment/mapp-deployment
```

## Summarize Commands

- Create

```shell
kubectl create -f deployment-definition.yml
```

- Get

```shell
kubectl get deployments
```

- Update

```shell
kubectl apply -f deployment-definition.yml
kubectl set image deployment/myapp-deployment nginx=nginx:1.9.1
```

- Status

```shell
kubectl rollout status deployment/myapp-deployment
kubectl rollout history deployment/myapp-deployment
```

- Rollback

```shell
kubectl rollout undo deployment/myapp-deployment
```

## Example of Updating a Deployment

- Creating a deployment, checking the rollout status and history:

```
master $ kubectl create deployment nginx --image=nginx:1.16
deployment.apps/nginx created

master $ kubectl rollout status deployment nginx
Waiting for deployment "nginx" rollout to finish: 0 of 1 updated replicas are available...
deployment "nginx" successfully rolled out

master $ kubectl rollout history deployment nginx
deployment.extensions/nginx
REVISION CHANGE-CAUSE
1     <none>
```

- Using the --revision flag
  使用 --revision 來查看各版本更動的紀錄

```
master $ kubectl rollout history deployment nginx --revision=1
deployment.extensions/nginx with revision #1

Pod Template:
 Labels:    app=nginx    pod-template-hash=6454457cdb
 Containers:  nginx:  Image:   nginx:1.16
  Port:    <none>
  Host Port: <none>
  Environment:    <none>
  Mounts:   <none>
 Volumes:   <none>
```

- Using the --record flag
  可以透過 --record 來注記每次更新的指令

```
master $ kubectl set image deployment nginx nginx=nginx:1.17 --record
deployment.extensions/nginx image updated
master $master $

master $ kubectl rollout history deployment nginx
deployment.extensions/nginx

REVISION CHANGE-CAUSE
1     <none>
2     kubectl set image deployment nginx nginx=nginx:1.17 --record=true
```

```
master $ kubectl edit deployments. nginx --record
deployment.extensions/nginx edited

master $ kubectl rollout history deployment nginx
REVISION CHANGE-CAUSE
1     <none>
2     kubectl set image deployment nginx nginx=nginx:1.17 --record=true
3     kubectl edit deployments. nginx --record=true



master $ kubectl rollout history deployment nginx --revision=3
deployment.extensions/nginx with revision #3

Pod Template: Labels:    app=nginx
    pod-template-hash=df6487dc Annotations: kubernetes.io/change-cause: kubectl edit deployments. nginx --record=true

 Containers:
  nginx:
  Image:   nginx:latest
  Port:    <none>
  Host Port: <none>
  Environment:    <none>
  Mounts:   <none>
 Volumes:   <none>

master $
```

- Undo a change:

```
revious revision:

controlplane $ kubectl rollout history deployment nginx
deployment.apps/nginx
REVISION  CHANGE-CAUSE
1         <none>
3         kubectl edit deployments.apps nginx --record=true
4         kubectl set image deployment nginx nginx=nginx:1.17 --record=true



controlplane $ kubectl rollout history deployment nginx --revision=3
deployment.apps/nginx with revision #3
Pod Template:
  Labels:       app=nginx
        pod-template-hash=787f54657b
  Annotations:  kubernetes.io/change-cause: kubectl edit deployments.apps nginx --record=true
  Containers:
   nginx:
    Image:      nginx:latest
    Port:      <none>
    Host Port:  <none>
    Environment: <none>
    Mounts:     <none>
  Volumes:

controlplane $ kubectl describe deployments. nginx | grep -i image:
    Image:        nginx:1.17

controlplane $ kubectl rollout history deployment nginx --revision=1
deployment.apps/nginx with revision #1
Pod Template:
  Labels:       app=nginx
        pod-template-hash=78449c65d4
  Containers:
   nginx:
    Image:      nginx:1.16
    Port:       <none>
    Host Port:  <none>
    Environment: <none>
    Mounts:     <none>
  Volumes:

controlplane $ kubectl rollout undo deployment nginx --to-revision=1
deployment.apps/nginx rolled back
```
