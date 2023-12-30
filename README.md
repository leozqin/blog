# My Blog
This repo contains the source for my blog.

You can find it http://blog.leo/ if you're on my network.

# Setup - Docker
1. Clone the repo
2. Do `git submodule update --init --recursive` to hydrate the theme
3. Do `docker compose up -d` to serve a local version on `localhost:1313`
4. When you make changes, just do `docker compose up -d --build` and the local version should refresh

# Setup - Brew
1. Clone the repo
2. Do `git submodule update --init --recursive` to hydrate the theme
3. Install the Hugo executable by doing `brew install hugo`
4. Start the dev server by doing `hugo server --config local`