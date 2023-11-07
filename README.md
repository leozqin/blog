# My Blog
This repo contains the source for my blog.

You can find it http://blog.leo/ if you're on my network.

If you're reading this, then you're on my network.

Eventually, this blog will be hosted on Cloudflare pages.

# Setup
1. Clone the repo
2. Do `git submodule update --init --recursive` to hydrate the theme
3. Do `docker compose up -d` to serve a local version on `localhost:1313`
4. When you make changes, just do `docker compose up -d --build` and the local version should refresh