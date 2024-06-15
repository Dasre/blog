---
id: Service
title: Service
tags:
  - Kubernetes
last_update:
  date: 2024-06-14
---

## Service

K8s 的 Server 支持應用程式內部的溝通和外部各種組件之間的溝通，它可以將應用程式與其他應用程式連接在一起。

## Service Types

### NodePort

- 可以將 Node 的 Port 與服務的 Port 去做映射
  - TargetPort: Service 去映射的內部服務其啟動的 Port
  - Port: Service 去與內部服務接的 Port
  - NodePort: Node 去對外開放的 Port (Range: 30000 - 32767)

```yaml
# service-definition.yml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service

spec:
  type: NodePort
  ports:
    - targetPort: 80
      port: 80
      nodePort: 30008
  selector:
    app: myapp
    type: front-end
```

```yaml
# pod-definition.yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

port 如果不提供，會與 targetPort 相同
nodePort 如果不提供，會隨機提供 30000-32767 的 port 出去

若本身有許多服務是起 80 Port，可以透過 selector 指定到正確的服務

### ClusterIP

假設前端的 Pod 有三個，後端的 Pod 也有三個，這些 Pod 都有一個 IP 且都是浮動的。如何讓前端可以統一有一個目標去向後端做請求，就可以使用 ClusterIP。

```yaml
#service-definition.yml
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  type: ClusterIP
  ports:
    - targetPort: 80
      port: 80
  selector:
    app: myapp
    type: back-end
```

```yaml
#pod-definition.yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: back-end
spec:
  containers:
    - name: nginx-controller
      image: nginx
```

### LoadBalancer

---

## Ingress Networking

Ingress 協助用戶使用單個外部可訪問的 URL 來訪問內部應用程式，並透過 URL 路徑的配置來路由到集群中的不同服務，同時實現 SSL 安全。

Ingress 可以視為 K8s 集群中的第七層負載平衡器，但 Ingress 同樣需要使用 LoadBalancer or NodePort 將 Port 暴露出來讓外部可以訪問。

## Ingress Controller

Ingress Controller，K8s 默認是沒有此東西

- GCE
- Nginx
- HAPROXY
- Istio

```yaml
# Deployment
apiVersion: extensions/v1veta1
kind: Deployment
metadata:
  name: nginx-ingress-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      name: nginx-ingress
  template:
    metadata:
      labels:
        name: nginx-ingress
    spec:
      containers:
        - name: nginx-ingress-controller
          image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
      args:
        - /nginx-ingress-controller
        - --configmap=$(POD_NAMESPACE)/nginx-configuration
      env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
      ports:
        - name: http
          containerPort: 80
        - name: https:
          containerPort: 443
```

```yaml
# ConfigMap
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
```

```yaml
# Service
apiVersion: v1
Kind: Service
metadata:
  name: nginx-ingress
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
      name: http
    - port: 443
      targetPort: 443
      protocol: TCP
      name: https
  selector:
    name: nginx-ingress
```

```yaml
# Auth
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nginx-ingress-serviceaccount
```

## Ingress Resources

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear
spec:
  backend:
    serviceName: wewar-service
    servicePort: 80
```

Domain Rules

- www.my-online-store.com
  - /wear
  - /watch
- www.wear.my-online-store.com
  - /
  - /returns
- www.watch.my-online-store.com
  - /
  - /movies
- others
  - www.listen.my-online-store.com
  - www.eat.my-online-store.com

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear-watch
spec:
  rules:
    - http:
        paths:
          - path: /wear
            backend:
              serviceName: wear-service
              servicePort: 80
          - path: /watch
            backend:
              serviceName: watch-service
              servicePort: 80
```

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear-watch
spec:
  rules:
    - host: wear.my-online-store.com
      http:
        paths:
          - backend:
              serviceName: wear-service
              servicePort: 80
    - host: watch.my-online-store.com
      http:
        paths:
          - backend:
              serviceName: watch-service
              servicePort: 80
```
