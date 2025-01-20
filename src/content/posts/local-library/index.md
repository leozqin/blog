---
title: "If you don't want to support your local library, support mine instead!"
date: 2024-12-28
slug: local-library
tags:
- tech
- homelab
---
Welp, it's happened again - in a fit of pique, I've gone and built an app to solve a specific problem that I have.

This time, it's a super simple eBook library that operates by scanning your filesystem. Fittingly, it's called Local Library (but, don't let it prevent you from supporting [your local library!](https://www.careeronestop.org/LocalHelp/CommunityServices/find-libraries.aspx)).

Local Library scans your designated filesystem in a read-only manner for `epub` files, tries its best to extract and format the cover art, and presents a simple UI to browse and download those ebooks. That's it!

![The front page of Local Library, containing several cards that include the book's title and author and cover art](./library.jpg)

Local Library is MIT-licensed, [hosted on GitHub](https://github.com/leozqin/local-library) and supports deployment via Docker, Docker Compose, or directly via any Python 3.12 and NodeJS 22 environment. Docker Compose is the recommneded deployment method.

# Why this?
You'd think this is a solved problem - surely someone has already built a self-hostable eBook library?

And you'd be right! Calibre/Calibre-Web and Kavita both do largely this. But - as it turns out, I'm not smart enough to figure out how to make them work with my NAS setup, nor diligent enough to spend all the time making the metadata nice and neat. The thing is, both of Calibre and Kavita do a great job if you love to read *series*.

For example, Calibre's whole metadata management thing is all about making it easy to find all the books the belong to a series. And also, Kavita wants you to organize your filesystem by series. It makes a ton of sense if you're acquiring eBooks by buying series bundles, or something like that, but I prefer to read one-shots. Very rarely do I read the second book in a series, and in written books compared to graphic novels and manga, one-shots are the norm. I had also tried Komga at one point and reached the same conclusion. Of course, Kavita does support one-shots, but they are very much second-class citizens.

The other thing that that Local Library does is that it's built to operate in a read-only manner. The episode that triggered this fit of pique was that I was trying Calibre-Web Automated, and it **moved all of my ebooks into a location that it controlled during the ingestion process**.

I'm sure I pressed the wrong button somewhere, but that is an unreasonable default, and an unwarned side effect at that. Maybe everyone is just used to it because that's what Calibre does and always has done, but I've [recently been spending time tinkering with the storage architecture of my homelab](/posts/homelab_3), so maybe I'm just hypersensitive about it.

# Architecture
Local Library uses a Python backend and serves fully static, server-side rendered pages using Astro.js.

The total amount of Python is quite small - currently, just over 200 lines! I don't even bother to ship an installable Python package - the Docker image just starts the FastAPI app in uvicorn, that's it!

While there is a modest database backing the API (based on `tinydb`), the contents of that database is itself wholly dependent on the state of the filesystem, so I suppose you could say that Local-Library itself acts idempotently and statelessly but with a small metadata cache.

It's exceedingly rare for me to delete an eBook, so re-indexing by blowing away the db is a feasible alternative to doing CRUD; a testament to statelessness!

# Lessons Learned
## Server-side rendering is a thing
I've always kind of struggled to put a name to the browser interaction model that [Precis](https://github.com/leozqin/precis) uses. I've described it as "fully static", but that's not perfectly true, since the data can and does change quickly. But, it is true that all it does is serve HTML over the wire. I see now that I basically rolled my own server-side rendering framework for Precis.

Oops! But also, good to know.

## I like server-side rendering (and Astro does it well)
I don't have a ton of experience working in JavaScript (or, in the case of Local Library, TypeScript!), but one that I've never been great with is perceiving the boundary between client and server. I think that many JS frameworks encourage you to blur that boundary, either for performance reasons or because it's not actually that important.

For better or worse, I tend to write pretty spartan UIs, so it's never been too important to me have significant interactivity in the browser. This is a great fit for serverside rendering, and the approach that Astro takes (basically, [a modal one](https://docs.astro.build/en/guides/on-demand-rendering/#server-mode)) is easy to understand and manage to me.

## I finally get CORS now
The single most common thing that happens when I package webapps is that I eventually hit CORS (cross-origin resource sharing) issues. This obviously happens since I'm always developing in `localhost`, but the source domain is never `localhost` in a packaged and deployed webapp.

But, I never really understand that this is happening because code is running in the browser and trying to make a call to a resource that resides elsewhere (see above).

The way I dodged CORS with Precis was to implement server-side rendering, and I do the same thing in Local Library. In particular, SSR really helps because it lets you redirect server-server calls to the backend. In Local Library, Astro.js makes server-side inter-container calls to the Python-based FastAPI endpoint that a browser wouldn't do without setting a proper CORS policy.

One of the other side benefits of this pattern is that the app is responsive even while Python-based background processes run, which is not something that can be said of my homemade SSR implementation in Precis (boo Global Interpreter Locking!!).

## Astro.js ships with just enough quickstart
One of my experiences in building [`venmo-calculator`](https://github.com/leozqin/venmo-calculator) was that Vue.js shipped with a competent quickstart, but it was also very complex, and hard to understand which parts were safe to delete. On the other hand, the Astro.js quickstart was quite easy to understand. I was able to pretty safely delete large parts of it once I got the necessary bits started.

One of my TODOs for Precis is modernize the UI, and shipping a componentized UI using something like Astro.js is something that I want to try.