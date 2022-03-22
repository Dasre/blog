---
id: docker基本介紹
---

## 指令整理

- Run Container
  `docker container run -d --name nginx nginx`

- All Container
  new: `docker container ls -a`
  old: `docker ps -a`

- 移除 container
  new: `docker container rm <container_id>`
  old: `docker rm <container_id>`

new: `docker container rm -f <container_id>`

- 列出特定 container 目前所執行的 process
  new: `docker container top <container_id>`
  old:`docker top <container_id>`

- 列出所有執行的 processes
  `ps aux`

- show metadaa about the container(details of one container config)
  new: `docker container inspect <container_id>`
  old: `docker inspect <container_id>`

- show live performance data for all containers(performance stats for all containers)
  new: `docker container stats <container_id>`
  old: `docker stats <container_id>`

- start new container interactively（以交互方式啟動 container)
  `docker container run -it <container_id> sh(bash)`
  -t => pseudo-tty (simulates a real terminal, like what SSH does)
  -i => interactive（Keep session open to receive terminal input)
  bash shell => if run with -it, it will give you a terminal inside the running container
  `docker container start -ai <container_id>`
- run additional command in existing container（在現有的 container 加入附加指令）
  `docker container exec -it <container_id> sh`

* Small Linux system
  Alpine

## docker container run 做什麼

1. 在本地的 image cache 找是否有 image，若沒有
2. 在線上的 image repository 找是否有同名的 image (預設是 Docker Hub)
3. 若找到下載最新版（除非有指定版號）
4. 基於該 image 生成一 container，並準備執行
5. 在 docker enginer 的 private network 給予虛擬 IP
6. 根據 run 時的指令開啟外部環境與 container 對接的 port
7. 執行根據 image 的 Dockerfile 所定義的 CMD

## containers are not mini-vm's

1. They are just processes.
2. Limited to what resources they can access.
3. Exit when process stop.
