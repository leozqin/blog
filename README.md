# My Blog
This repo contains the source for my blog. If reading MDs on github is your thing, feel free to read my blog from here.

Otherwise find it at - https://leozqin.me/, and I publish a RSS feed at https://www.leozqin.me/index.xml

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