---
title: 'The Nix Mania Has Taken Hold, I Fear'
date: 2024-11-02
slug: the-nix-mania-has-taken-hold-i-fear
tags:
- tech
- linux
- homelab
---
It started with virtualization, but I regret to announce that I am now running NixOS on bare metal.

Over the past week, I installed NixOS on one of my laptops, a Lenovo ThinkPad T14 Gen 2. It's relatively modern, so there was never a doubt that it could run NixOS. However, I decided to install it on the laptop (which was previously running PopOS) because I wanted to try a tiling window manager, and in particular Hyprland - running on the Wayland display server. Obviously, one impediment to running Hyprland on my VM is the fact that RDP support for Wayland is still a little spotty.

Anyway - the state of the union is as follows:

- I've set up a NixOS module for my own stuff and configured it to death
- I've set up `hyprland` on NixOS and configured it to death
- I've done the same to `rofi`, `hyprpaper`, `kitty`, and `waylock`
- I did all of this in a composable-ish way and am now syncing my configs to git
- I shipped Nix Flakes for my most commonly git repos

A few tidbits about each of the above...

# NixOS - Home Manager vs Modules vs Flakes
There's a number of different architectures for hooking your own Nix configs into the system configuration - Home Manager, as a Nix module, or as a Nix flake.

Of the three, I ended up going with a module because it was the most straightforward and slightly more composable than Flakes (more on that later), and also less arcane and more transferable than Home Manager.

By this, I mean that while Nix is its own language, Home Manager is very much its own language within that language. I found it a little hard to grasp when learning Nix at the same time, and this contributed in part to my decision to go a different way. However, another thing I considered is that the skills of configuring and orchestrating on Linux might be valuable in and of themselves, and putting all my time into a fairly niche configuration management solution might not be a good use of time.

Another way to think of that - there's a tradeoff between using Home Manager to fully codify all your configs and retaining the knowledge about how to configure these things on non-Nix platforms. I think, in a practical sense, it's unlikely that I'll be able to use Nix in a working environment (I wouldn't be caught dead working at Anduril, sorry not sorry). So, I think that it's useful to know how to configure things in a way that can be done imperatively (and not even that imperatively, since it's config files all the way down).

The arcanity is another thing; when I read how others implement Home Manager for config management, I can see that they're going to some lengths to make everything fit within Home Manager. Quite often, especially for less well-developed packages, I find people having to shove configs into an `extraConfig` block that gets rendered in-line into the config... basically, just writing the config as it would have been written, but within the framework.

It's a testament to Home Manager that doing this isn't weird or hard or bad, but also I think that it somewhat defeats the purpose.

When it comes to Flakes, I don't quite understand the value of modularizing all the components of a relatively uncomplex system. That is, I have maybe 10 or so big things for which I've created custom configurations, and then a lot of tools that I just use as they were meant to be used. So, at its most basic, I think, shipping a single flake for your entire setup is fine, but it's basically the same as shipping a module.

At least, this is my opinion at my current maturity level of working with flakes. I can see the value of shipping flakes for different applications (and did in fact do that with my personal projects), but for personal environment use - I don't quite see the value.

So, where I've ended up for the moment is using a module. I just edit the system level `configuration.nix` to source the module, then make all my changes in the module. I have a dotfiles folder that contains a bunch of config files and other assets, and everything is held together by command line arguments and environment variables. To some degree, this is how all software works.

There's a few things in particular that are meant to be installed from git - namely Rofi and Waybar themes. For these, I simply wrote shell scripts to clone the repositories and then pass their locations as command line arguments to the respective programs. For *maximum composability* I may in the future write a `Makefile` to orchestrate these different transactions.

# Shell Aliases and User Candy
I've grown quite fond of a few different customizations that I've added to my NixOS configuration.

- Typing out `sudo nixos-rebuild switch` just to rebuild my environment is a huge bummer - so, I alias-ed that to `reb` - much shorter!
- Similarly, before I had `wlogout` setup, typing out `systemctl suspend` was cramping my styl e - so, I alias-ed it to `sus`, which I just think is funny (tangentially, suspend and unsuspend is SUPER fast).
- I like using Starship as my shell prompt, and turning it on was quite easy.
- A cool feature of NixOS I didn't know about was that it does have font management built-in (not just in Home Manager), and I installed the whole NerdFonts package - a bit wasteful admittedly, but I like having all of the fonts ready to go, I think.
- I alias-ed `edit` to open my dotfiles directory in VSCode to make starting an editing workflow that much easier. I feel like I use it all the time.

# Hyprland and Friends
One of the main drivers of my interest in NixOS on bare metal is to try out Hyprland, a tiling Wayland compositor. I think that it's a particularly good fit for laptop hardware, since its relatively lightweight compared to GNOME or Plasma, I rarely find myself using multiple monitors with laptops, and being able to incorporate more keyboard-centric workflows is rational since touchpads are a bit less precise than standalone mice.

The thing that really impressed about Hyprland was the quality of the documentation. I've been living in Nix-world the past week, and the documentation there is alright, but can be kind of hard to parse and navigate. However, the Hyprland documentation is great, and the same can be said of most of the different tools within the ecosystem.

In addition to Hyprland, I'm using Rofi as an application menu, Waybar as the status bar, Hyprpaper for wallpaper management, Kitty as a terminal emulator, Waylock for lock screen, and WLogout for logout.

Ironically, it seems like NixOS is the second most common operating system to run Hyprland (at least judging from the search results), and the most common one is Arch. Perhaps another encounter with Arch is in my future - if it turns out that centralizing things in configs is a good fit with Arch's own design philosophy.

# Reproducibility and Config Management
The current state of reproducibility and config management for my NixOS/Hyprland setup is that everything is stored in a git repository that lives in `.dotfiles`. There are a number of different config files and other assets (wallpapers, etc...) in thta directory, as well as install scripts for the specific things that are meant to install via git cloning (mostly themes and colors).

So, I imagine the procedure for bootstrapping an entirely new machine might be something as follows:
1. Start a nix-shell with the github CLI (`gh`)
2. Use `gh` to clone the repo locally into the home directory
3. Source the `home.nix` module in the system nix config
4. Source the `hyprland.conf` module in the hyprland default config and remove a few unnecessary configs from the default config.
5. Rebuild everything and restart!

I think that sourcing the `home.nix` in the system nix config is kind of unavoidable, it's a result of choosing to deploy my environment as a module. As I mentioned before though, I do think a flake would be interchangeable.

It is the case that this instruction set means that hyprland is not perfectly reproducible - as far as I can tell, there is environment variable or other way to pass a configuration path on startup. But, I could be wrong, and will continue looking.

A brief digression - I don't typically use the github CLI (why bother when regular git is right there?). But, I gave it a try for this project, and was pretty impressed. Pretty early on in the lifecycle of a new VM or bare metal machine, I have to generate a SSH key, and the `gh` cli makes that process very easy - as part of basic authentication!

The other nice thing I'll say about the `gh` CLI is that it is very well-designed and structured - it uses a very intuitive subject-verb-predicate(s) syntax that reminds me of the GCP CLI. For example, to clone a repo, simply do `gh repo clone <name or path>` - if its one of your projects, you can provide only the name. Creating a new repo is similarly easy - `gh repo create`, and you can add things like a `--private` flag or an option to add a README.

The `gh` CLI is definitely something I'll consider using in the future, especially if I work somwhere that uses GitHub.

# Flakes for Dev Envs
My secondary project, after getting everything set up and tweaked for maximum visual effect, is to try and use NixOS for development.

This is an application where shipping a Nix Flake does make sense to me, and in fact I did endup shipping Nix flakes for both precis and my blog. I can then simply assume the shell using `nix develop` and have all my dependencies right there.

The Flake for my blog is super simple, so getting it working was pretty drama-free. I did encounter a few issues, however, when writing a Flake for Precis:

- Operating under a container metaphor, I was planning to install Precis into the system python, but this actually violates NixOS immutability rules, because the system python is symlinked from the Nix store. So, as it turns out, using virtualenvs is still the right solution - a dev shell is for humans, and humans should use virtualenv
- Playwright requires Chromium, and wants to install it as part of a bootstrapping step, but that step relies on `apt-get`, so it doesn't work with NixOS. There is, however, a separate `playwright-driver` package that has the browsers built-in that solves for this issue.
- VSCode doesn't quite play nice when you're in a Nix shell that also has a venv installed. I tried using direnv to assume the shell and it caused a recursive assuming of the shell (I think because I had a post hook running a source of the venv). I also encountered graphical glitches in starship when using the VSCode built-in terminal. This issue seems fixable, but for now I'm just using a separate window that has a terminal alongside VSCode.

All in all, its been quite fun to try out Flakes. I plan to try and implement a suite of unit tests for Precis using the NixOS environment. Stay tuned for how that works!
