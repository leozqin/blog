# My Blog
This repo contains the source for my blog. If reading MDs on github is your thing, feel free to read my blog from here.

Otherwise find it at - https://leozqin.me/, and I publish a RSS feed at https://www.leozqin.me/index.xml`

# Development
Install nodejs 22 and do `npm install` then `npm run dev`.

On a system with Nix installed - `nix develop`.

On a system with `distrobox` and `podman` (ie, Fedora Silverblue) installed:

```
podman build . --file Containerfile --tag blog
distrobox create --name blog --image localhost/blog
distrobox enter blog
``` 
