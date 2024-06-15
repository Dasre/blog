---
id: Job
title: Job and CronJob
tags:
  - Kubernetes
last_update:
  date: 2024-06-13
---

## Types of Workloads

- Web
- Send Email
- Math
- ...

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: math-pod
spec:
  containres:
    - name: math-add
      image: ubuntu
      command: ["expr", "3", "+", "2"]
  restartPolicy: Always
```

kubectl create -f pod-definition.yaml
像在這種單次執行完就會結束的功能，k8s 會持續重新跑這個 pod，直到設定的閥值。
這是因為 K8s 希望你的應用程式一直存在，會根據 Pod 的 restartPolicy 來看如何執行。（默認是 Always）

可以將 restartPolicy 改成 Never，這樣 K8s 就不會重新執行

## Replica Set vs Jobs

Replica Set 是確保指定數量的 Pod 始終保持運行狀態。Job 是運行一組單元來完成指定任務。

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: math-add-job
spec:
  completions: 3
  template:
    spec:
      containres:
        - name: math-add
          image: ubuntu
          command: ["expr", "3", "+", "2"]
      restartPolicy: Never
```

kubectl create -f job-definition.yaml

kubectl get jobs

kubectl get pods

Output the job:
kubectl logs <job_name>

kubectl delete job math-add-job

completions -> job 成功次數
一般來說會是第一個 job 跑完，才創建第二個
假設 Job 中間失敗
Completed -> Error -> Completed -> Error -> Error -> Completed
根據上面的例子，總共跑 6 個 pod 才會完成任務

## Parallelism

並行處理

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: math-add-job
spec:
  completions: 3
  parallelism: 3
  template:
    spec:
      containres:
        - name: math-add
          image: ubuntu
          command: ["expr", "3", "+", "2"]
      restartPolicy: Never
```

首先會先創立 3 個 pod，在根據成功的次數來判斷是否需要新的 Pod，並一次一個來創立 Pod

## CronJobs

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: mreporting-cron-job
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      completions: 3
      parallelism: 3
      template:
        spec:
          containers:
            - name: reporting-tool
              image: reporting-tool
          restartPolicy: Never
```

kubectl create -f cron-job-definition.yaml
