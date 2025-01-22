---
title: Goodbye Hugo, Hello Astro!
slug: goodbye-hugo-hello-astro
date: 2025-01-21
---
To my one faithful repeat reader - your eyes do not deceive you, the blog has changed! Over the weekend, I successfully distracted myself from \*hand motions\* **all this** by rebuilding my blog!

This makes for three iterations of the blog now - first WordPress, then Hugo (served via Cloudflare Pages), and now Astro (still served via Cloudflare Pages). I'll now spend a bit talking about the changes I made, and what I learned along the way.

# From Hugo to Astro
The first time I rebuilt my blog, I was moving from a very bloated WordPress site that, if my memory serves, a pretty complex and custom block-based layout. My priorities were to find a format that heavily emphasized written word, and that I could hack on if need be. At the time, I was learning `golang`, and the fact that Hugo was written in that language made it a top choice.

I was also relatively unfamiliar with templating engines. We had just started using `dbt` at work, and I was pretty enchanted but what templating lets you achieve; so, since Hugo extends the `golang` template format, this seemed like a good way to kill two birds with one stone. I started out using a prebuilt theme - the `smol` theme ([which you can find here](https://github.com/colorchestra/smol)).

It was a very minimalist theme, but it really did some good things with minimalism, including minimizing package size. I eventually replaced this with my own theme - still very monochromatic, but with even fewer navigation elements (honestly, mostly because I didn't know how to do it). A few iterations came of this as well; I tried out a box-grid layout for the front page, and then I eventually ended up with a vertically stacked layout.

In the meantime, over the past year I've spent a lot of time doing web design, actually. In addition to the theme changes for my old Hugo theme, I also built [Precis](../go/precis), which server-side rendered HTML using Python and Jinja and Tailwind CSS and DaisyUI for CSS. So, I spent quite a bit of time thinking about how to build UIs, and how CSS works.

I also tried out using Vue.js + Vite for my [Venmo Calculator](https://github.com/leozqin/venmo-calculator) project (and vanilla CSS). I struggled a bit with Vue, the template language being heavily HTML-based, but I found that I sometimes wanted some syntactic sugar. I had had the same feeling when building Precis - Jinja HTML is kind of hard to read, and I'd like to find a more natural entree into componentizing. This all being said, I wouldn't be surprised if I did Vue wrong; I may yet revisit it in the future for a project that has more complicated client-side requirements.

Toward the end of the year, I built [Local Libary](https://github.com/leozqin/local-library). I chose Astro because I had heard good things about it, and I saw that it had just (ie, like a year ago) support for server-side rendering (SSR). Astro was the framework that really clicked for me; I had a great time building Local Library with it; and so I chose to use it for rebuilding my blog.

# Things I Learned
In no particular order, here are some things I learned while rebuilding this site:

- I really like [content collections](https://docs.astro.build/en/guides/content-collections/) - almost all my writing is in Markdown, and usually follows one of a few patterns; so, content collections make it really simple to abstract those patterns.
- I think I *finally* understand how flex layouts and inline vs block elements work in CSS. It took a LOT of experimentation with Tailwind, though.
- In the same way, after doing it enough I think I finally understand anonymous functions and method chaining in Javascript. Defining schemas using `zod` or Typescript was also enjoyable; I'm a strong believer in doing the same thing for Python using Pydantic.
- Astro and Tailwind fit together very well - Tailwind gets weird when you start having dozens of classes on a single element; but, the component-based mindset of Astro makes it obvious when to abstract. Plus, with scoped styles, you can add vanilla CSS for the things you don't want to manage in Tailwind.

Not all the things I learned were good, though - 
- I considered migrating my writing to use MDX format instead of vanilla Markdown (well, Github Flavored Markdown). But, I couldn't quite get it to work; with a "renderer not found for this file extension" error. My understanding is that this error actually means something in the content is subtly wrong, but it is discouraging that the error is misleading like that.
- Hugo has a reputation for being quite minimalist and fast; whereas contemporary Javascript has very much the opposite reputation. This is true! A simple install of my blog causes the installation of over 500 packages from the npm registry, and the build time for my blog is now 40-45 seconds where it used to be about 15 seconds. The site itself is still fully static, so it's quite speedy, but the build process is now much slower.

# New and Improved Features
Since porting the website, I've also introduced a few new features, or improved spins on existing ones:
- On the [home page](/), I show fewer recent blog posts, but instead use the space for cards that relate to my projects. This lets me spotlight them, link to their code and respective blog post, and highlight the technologies that I used to build them using badging.
- I've implemented a nice landing page for `go` links - using the meta refresh directive, if you git a go-link you'll see the page briefly before being redirected. I also intend to do a form of micro-blogging ([webrings](https://en.wikipedia.org/wiki/Webring), anyone?) by simply creating numerous go-links and making them searchable.
- In addition to blog posts, both projects and go links are managed using content collections!
- I'm taking a more principled approach to content ownership; before, the license status of my work was ambiguous, but I've decided that at the very least, all blog posts are now licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). I don't realistically believe that any of my ideas are monetizable (even by me), but I consider this license to be hostile to AI scrapers.
- To that end, I've also deployed a proper `robots.txt`, based on [nixcraft](https://www.cyberciti.biz/web-developer/block-openai-bard-bing-ai-crawler-bots-using-robots-txt-file/), which blocks common AI scraping bots. While the evidence suggests that such bots do not respect `robots.txt`, the combination of this and the licensing change are, I hope, enough to someday throw a wrench in the plans of crawlers. Perhaps, if I ever have the time and money, the wrench-thrower will be me!
- I've also addressed many of the accessibility issues from the old blog - namely, unsemantic use of HTML (because I didn't know better) and low-contrast/unmarked links.
- Finally, just for fun, I'm hand-writing pure CSS web badges! I fondly remember making of mess of badges in Geocities and/or Myspace and/or Xanga - I'm bringing the fun back; you can [check them out here](/badges) and download them as Astro components, if you're interested!