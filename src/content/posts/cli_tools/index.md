---
title: "Command Line Tools that I Like"
date: 2024-07-09
slug: command-line-tools-i-like
tags:
- tech
---
It occured to me the other day that now that the application model for modern computing has largely shifted to the web, and therefore browsers, I find that I often don't know what to call the silly, just-for-fun one-off projects that I build sometimes.

Take, for example, [venmo-calculator](https://github.com/leozqin/venmo-calculator) - Is this an app? It is a program? It's technically a compiled golang executable for the backend and a static html+js website that's compiled in the sense that vue turned a vue component into javascript, but that javascript is itself interpreted?

And yet, when I think of an app, I think of a mobile app - `venmo-calculator` isn't such an app, although it could be, if I shipped a PWA manifest. At the same time, something like Windows or MacOS is hard to describe as an app - but MS Paint or the snipping tool, despite not being targeted to mobile, could be described as apps? I could go on about this topic, and I might do that later...

# And yet, I know it when I see it
There is, however, one category of programs/executables/applications/apps that I can clearly delineate - [in the words of Potter Stewart - I know it when I see it](https://en.wikipedia.org/wiki/I_know_it_when_I_see_it) - command line tooling. The purpose of this post (surprise!) is to discuss the different command line tools that I use frequently, and why I like them.

- `rg`: [ripgrep](https://github.com/BurntSushi/ripgrep) is a `grep`-like search tool that is extremely fast. Part of the magic is that it happens to be written in Rust, and also respects `.gitignore` files (you can optionally turn this off, of course). I picked up this tool at Spokeo because a pretty common task we had to do was find a particular row in a very large CSV file that was malformed, to fix it. A few also used [Silver Searcher](https://github.com/ggreer/the_silver_searcher) (`ag`) - but in benchmarks `rg` was slightly faster, and these days `ag` is not as actively maintained.
- `nvim`: [neovim](https://github.com/neovim/neovim) is a fork of `vim` that's easier to work with when it comes to plugins and other tweakables. Also, uses python for programmability, which is nice.
- `direnv`: [direnv](https://direnv.net/) lets you manage your environment at the directory level using `.envrc` files, and you can direct those files to inherit from other files, too. It's not just environment variables - just like `.bashrc` it executes whatever is in the `.envrc` file, so you can use it to run prescripts or other tooling.

Quite a few of my favorite tools happen to programming language version managers - whenever I initialize a new system, I always start with these instead of directly installing programming languages

- `nvm`: [Node Version Manager](https://github.com/nvm-sh/nvm) - for `node.js`
- `pyenv`: [pyenv](https://github.com/pyenv/pyenv) - for `python`
- `gvm`: [gvm](https://github.com/andrewkroh/gvm) - for `golang`
- `g`: [g](https://github.com/voidint/g) - also for `golang`. I slightly prefer `g` since its less verbose, and also does a good job of dealing with self-dependencies (in newer versions of `golang` you actually need `golang` to compile)

I also use a few different meta-installers for tools that use language-centric installers:
- `pipx`: [pipx](https://github.com/pypa/pipx) is an installer for python tools that provisions an isolated environment for each tool - no more dependency conflicts just because of your tooling! This has become my tool of choice for installing python-based linters and dev tooling such as `pre-commit` and `sqlfluff`
- `uv`: [uv](https://github.com/astral-sh/uv) is a package installer and resolver written in Rust that is super fast. It's meant to be a drop-in replacement for `pip` - I can attest that it's faster, but I don't always remember to use it. Also, it's a resolver and not a runtime environment, so complex projects benefit the most from the speed, whereas libraries that have long and unoptimized install scripts don't really benefit (I'm looking at you, `tensorflow`).

Python-related stuff:
- `bpython` - [bpython](https://bpython-interpreter.org/) is a fancy auto-complete and syntax highlighting layer on top of the standard Python IDLE. I don't often use the python interpreter directly much anymore (much more common at Spokeo, these days I like to use the Jupyter integration in VSCode), but I try to use `bpython` if I have to (and if I can remember).
- `polars` - [polars](https://github.com/pola-rs/polars) is a python API to a vectorized data processing engine written in Rust - so it is FAST! It is also, in my opinion, more ergonomic than `pandas` - and it doesn't have heavy baggage of broad usage, yet. I do think that the baggage of `pandas` is due to its lineage in `R`, though.

Other terminal-related tooling:
- [starship](https://github.com/starship/starship) - a very fast and customizable prompt for most shell environments
- [warp](https://www.warp.dev/) - my preferred terminal app for mac and linux (on windows, I actually like Windows Terminal). I don't find the AI features very useful, except for autocomplete. ⚠️ - warp is closed source, unfortunately.
- [monaspace](https://github.com/githubnext/monaspace) - a font family designed by Github that I find pleasing to use in VSCode. There's also [a version that's had Nerd Font glyphs patched into it](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Monaspace)
