---
id: docker container
---

- docker container run -p 80:80 --name webhost -d nginx
  -p => --publish: Remember publishing ports is always in `HOST:CONTAINE` format.
- docker container port webhost(Quick port check)

- docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
  --format => A common option for formattiong the output of commands using `Go templates`

- docker network ls(show networks)
- docker network inspect(inspect a network)
- docker network create --drive(create a network)
- docker network connect(Attach a network to container)
- docker network disconnect(Detach a network from container)

- DNS
  - Containere

- Containers are usually immutable and ephemeral
  - immutable infrastructure: only re-deploy containers, never change
  - this is ideal scenario, but what about databases, or unique data ?
  - docker gives us features to ensure these separation of concerns
  - this is known as persistent data
  - two ways: volumes and bind mounts
  - volumes: make special location outside of container UFS
  - bind mounts: link container path to host path

