---
title: "Every Post on my Blog is born with an Evil Twin - AI Scraper Deterrence for Static Sites"
slug: evil-twin-ai-deterrence
date: 2025-02-01
tags:
- tech
---
Remember "Sabrina the Teenage Witch"? 

What a show; while unfortunately Melissa Joan Hart got weird and libertarian, one of my favorite arcs was in Season 3. After Sabrina finally receives her Witches' License at the end of Season 2, she learns that she can't actually make use of it until she learns her family secret, and she's handed a whiteboard filled with rebus-like puzzles that spell out said secret.

*Spoiler Alert* - the family secret is "every member of the Spellman family is born with a twin"... and one of those twins is evil! 

Sabrina, having cast her share of self-serving magic, is erroneously identified as the evil twin, and her counterpart (Katrina, from South Dakota) happily pushes her into a volcano... which was part of the test all along, because Katrina was actually the evil twin! (Keep reading, I swear this is going somewhere...)

Through the rest of the series, we meet Katrina a few more times, and she's pretty unambigiously terrible. We also meet Aunt Zelda's evil twin "Jezebelda", who apparently did the Bubonic Plague?

Anyway, while I'd like to have seen some nuance or redemption for the evil twins, that never really happened. However, maybe things do change, because the concept of an evil twin is actually quite useful for deterring "AI" scrapers from accessing my site. (see! I told you I would get there!).

## Evil Twins for Blog Posts
Every post on my blog is hosted on the `/posts/` path - but, if you try and view the same slug on the `bots` path, you'll be directed to the evil twin! 

For example, the evil twin for this post [can be found here](/bots/evil-twin-ai-deterrence).

What's going on here? When you view the evil twin for a blog post, what you're viewing is the entire corpus of all my blog posts, shuffled around to minimize intelligibility. Since the inception of the Astro-based version of this blog, I've shipped a `robots.txt` that [disallows access by common "AI"-related scrapers](/robots.txt). All bots are requested to ignore the `/bots/` path, and it's also filtered out from the sitemap.

So, if a robot finds itself looking at the evil twin for a post:
- It's presented with a juicy-looking block of largely incoherent text to suck down
- It has only itself to blame

## Why do this?
[As I've mentioned before](/posts/hops-my-final-llm-project), I've decided to stop work on LLM-based projects because the behavior of the industry at large is unethical, ghoulish, and fascistic.

We're also in somewhat of a golden age for [algorithmic sabotage](https://algorithmic-sabotage.github.io/asrg/about/) - in the past month, I've seen at least three different projects that seek to make life harder for LLM scrapers that don't respect the [Robots Exclusion Protocol](https://en.wikipedia.org/wiki/Robots.txt):

- [anubis - protect upstream resources from scrapers using proof-of-work](https://xeiaso.net/blog/2025/anubis/)
- [nepenthes - a tarpit intended to catch web crawlers](https://zadzmo.org/code/nepenthes/)
- [quixotic - markov chain-based approach for generating nonsense for LLM scrapers to consume](https://marcusb.org/hacks/quixotic.html)

`quixotic` is of particular interest to me, because it is designed to work with static sites! I did consider implementing it, but it uses a Rust executable and I would have had to change how my site is deployed to make it compatible.

Mixing up all my writing into an unintelligible mess is the next best thing, and the fact that I'm using Astro Content Collections to organize posts made it fairly easy to implement (aside - while I feel like node/js/ts has a reputation for being highly abstracted, why doesn't it have support for things like array shuffles or randomization in the standard library? python's `list.shuffle()` and `random.choice` are such useful primitives)

## Does it work?
I think that corpus randomization succeeds at obscuring the structure and meaning of any individual post, since I write about a fairly broad variety of topics. It does not, however (at least, from my tests with the free version of ChatGPT), obscure the tone or general mood of my writing. A more intentional approach to randomization that drops out or replaces words randomly may be more successful at this.

It's also pretty easy to identify an evil twin - they are notably larger than their good twins, hosted on an unambiguous path, and of course they are measurably incoherent by any competent NLU metric. So, if an unethical scraper got ahold of their contents, it would likely be discarded to minimize the likelihood of introducing incoherence into their LLMs.

And that's great, because the whole point of this exercise is to get the bot to avoid the content of those pages. Where this approach succeeds is wasting the time and resources of the scraper if they choose to ignore the `robots.txt` convention that has been around for 30+ years. If you'd rather slurp down my content and then measure it for coherence, that one's on you.

I invite any scraper who's wasted their compute resources scraping an evil twin to simply respect my `robots.txt` and/or get fucked.

## What next?
I've never really thought of myself as an artist, but it's hard to think of this as anything other than a form of performance art, and it feels good, so I'll probably do a few more similar projects.

The first thing that immediately comes to mind is naming and shaming any bots that scraped an evil twin page; I assume this data is available from Cloudflare somewhere, so we'll let this marinate a bit and check back.

I'm also interested if there's been any research or convention in embedding instructions inside hidden elements that frustrate agents that seek to use the contents of a webpage. However, I'm sensitive to the use of hidden elements to aid accessibility, so perhaps there's some nascent convention for increased semanticity that only benefits LLM operators that is a ripe target for sabotage.