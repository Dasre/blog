---
id: docker images
---

# docker Images

## Use from docker hub

`https://hub.docker.com/`

一個 image 可以有多個 tag

不指定版號，會自動下載最新版
`docker pull nginx`

要下載指定 version image
`docker image nginx:1.11.9`

alpine 版本通常很小，alpine 本身小於 5MB。用於 linux 分散式系統？？？？。

docker hub -> The apt package system for container.

## docker image cache

- image layers
  old: `docker history nginx`
  new: `docker image history nginx`

  list history of the image layers.
  Every image starts from the very beginning with a blank layer known as scratch.

```
IMAGE          CREATED       CREATED BY                                      SIZE      COMMENT
c919045c4c2b   2 weeks ago   /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  STOPSIGNAL SIGQUIT           0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  EXPOSE 80                    0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  ENTRYPOINT ["/docker-entr…   0B
<missing>      2 weeks ago   /bin/sh -c #(nop) COPY file:09a214a3e07c919a…   4.61kB
<missing>      2 weeks ago   /bin/sh -c #(nop) COPY file:0fd5fca330dcd6a7…   1.04kB
<missing>      2 weeks ago   /bin/sh -c #(nop) COPY file:0b866ff3fc1ef5b0…   1.96kB
<missing>      2 weeks ago   /bin/sh -c #(nop) COPY file:65504f71f5855ca0…   1.2kB
<missing>      2 weeks ago   /bin/sh -c set -x     && addgroup --system -…   61.1MB
<missing>      2 weeks ago   /bin/sh -c #(nop)  ENV PKG_RELEASE=1~bullseye   0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  ENV NJS_VERSION=0.7.2        0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  ENV NGINX_VERSION=1.21.6     0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  LABEL maintainer=NGINX Do…   0B
<missing>      2 weeks ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      2 weeks ago   /bin/sh -c #(nop) ADD file:d48a85028743f16ed…   80.4MB
```

- union file system
- history and inspect commands
  old: `docker inspect nginx`
  new: `docker image inspcet nginx`
- copy on write

Images are made up of file system changes and metadata.
Each Layer is uniquely identified and only stored once on a host.
This saves storage space on host and transfer time on push/pull.
A container is just a single read/write layer on top of image.

## Image tagging and pushing to Docker hub

- Assign one or more tags to an image
  old: `docker tag <source_image>[:tag] <new_image>[:tag]`
  new: `docker image tag <source_image>[:tag] <new_image>[:tag]`

  `<user>/<repo>:<tag>`

  official Repositories => the live at the root namespace of the registry, so the don't need account name in front of repo name.

- Uploads changed layers to a image registry (default is hub)
  `docker image push <image>`

- Default to logging in Hub, but you can override by adding server url
  `docker login <server>`

  put in `.docker/config.json`

- Always logout from shared machines or servers when done, to protect your account
  `dcoker logout`

  - Image id 會決定倉庫上的 image 是否為同一個，若 tag 不同，仍然會視為同一 image.

## Building Image
