---
title: "About This Blog"
slug: about-this-blog
date: 2025-01-30
---
This blog is the third iteration of my blog. The first one was a WordPress site hosted on GoDaddy using a version of PHP that was many versions too old, a super heavy theme, and an extremely complex block based layout generator.

The second iteration was static site generated by [Hugo](https://gohugo.io/). I wrote a custom theme for it, and it was deployed on Cloudflare pages. Very fast and reliable, but I eventually outgrew it; wanting to do more customization and tweaks.

The latest version of this site is also a static site, but now generated by [Astro.js](https://astro.build/).

This blog is served by [Cloudflare Pages](https://developers.cloudflare.com/pages/), using [their built-in Astro integration](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/). 

I use their integration with GitHub, where they subscribe to the `main` branch of a dedicated blog repository. So, when I push to `main`, Cloudflare will react by pulling down my changes and re-building and re-deploying the site. In practice, this takes less than a minute, sometimes less than 30 seconds.

If you want to explore the source code of this blog you can [find it here](https://github.com/leozqin/blog).
