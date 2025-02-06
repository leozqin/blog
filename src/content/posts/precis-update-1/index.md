---
title: "Roadmap for Precis - Nov 2024"
date: 2024-11-09
slug: precis-roadmap-nov-2024
tags:
- tech
- llm
- foss
---
# A look back at feature releases
We've come a long way since I last wrote about [Precis](https://github.com/leozqin/precis) (my open-source AI-enabled RSS Reader).

A couple highlights of new features that we've introduced:
- [v0.3.3](https://github.com/leozqin/precis/releases/tag/v0.3.3): a hybrid LMDB storage handler that stores content in the filesystem to help keep the database size manageable, and a nix flake for developers.
- [v0.3.0](https://github.com/leozqin/precis/releases/tag/v0.3.0): the ability to fully delete feeds, including their feed entries and feed content, from the database.
- [v0.2.10](https://github.com/leozqin/precis/releases/tag/v0.2.10): a public API running on the same endpoints as the rest of Precis - simply pass a JSON accept header and you'll get JSON back instead of a HTML response
- [v0.2.9](https://github.com/leozqin/precis/releases/tag/v0.2.9): a basic suite of integration tests, and a page for "Recent Entries"
- [v0.2.8](https://github.com/leozqin/precis/releases/tag/v0.2.8): integration with Readability.js and improved build performance using a multi-stage Dockerfile and `uv` for python package management
- [v0.2.6](https://github.com/leozqin/precis/releases/tag/v0.2.6): word count, reading level, and estimated reading time on the Read page, and notification support for Jira and NTFY
- [v0.2.4](https://github.com/leozqin/precis/releases/tag/v0.2.4): a CLI for managing Precis deployment and configuration
- [v0.2.3](https://github.com/leozqin/precis/releases/tag/v0.2.3): scripts for creating and restoring backups (now in CLI)
- [v0.2.2](https://github.com/leozqin/precis/releases/tag/v0.2.2): the ability to change how often feeds refresh, and About page and healthcheck endpoint
- [v0.2.1](https://github.com/leozqin/precis/releases/tag/v0.2.1): OPML import and export

# My favorite features
Of all the features so far, I think my two favorite are:
- the Readability.js integration greatly increased the quality of content retrieval, and allowed support for images in entry content
- the integration test suite makes changes or additions to storage handlers trivial, and greatly reduces the risk of regressions. Plus, I got to write it in Golang.

Also - an honorable mention for the Jira notification handler; I had a brief moment of insanity/petulance where I felt that I wasn't reading enough, and turning reading into a Kanban was where I ended up. These days, I'm back to using the Slack handler, but I can't help but feel there's a specific type of workflow out there that needs a RSS-to-Jira bridge, and if you want Precis to do that, it can.

# Looking forward - Milestones and Roadmaps

You'll notice that we incremented the minor version of the project with the ability to delete feeds and feed content. The reason for this is that I considered the `v0.3.0` version to be a milestone in usability - the full set of CRUD operations are now supported, and I feel like others should now consider this project to be stable, but not mature.

It's always kind of been the case, but until we hit a point where a `v1.0.0` release is warranted, I'll be using the minor versions as milestones in concept. Broadly, here's how I've been thinking about the milestones:

- `v0.1.0`: Make It Work - basic functionality works, and Precis is relatively deployable.
- `v0.2.0`: Use Real Storage - tinydb is great, but we need something more sustainable - LMDB was the right option.
- `v0.3.0`: Production Hardening - make things run stably, and make the codebase less embarassing

Going forward (well, sort of - it's kind of always been this way), I'll be focusing each milestone on a set of features or architectural changes. As always, you can [see all the milestones here](https://github.com/leozqin/precis/milestones), and I reserve the right to change the order, priority, or focus of milestones as I see fit according to my interest or need. Seriously though, if you have opinions about the roadmap for Precis, let's talk! I've built what I consider to be the ideal RSS reader for myself, and I'd love to see how to make it better for others.

## `v0.4.0` - Digests
The `v0.4.0` milestone will be all about Digests. LLMs are first-class entities in Precis, and while summarization helps you read faster and with better comprehension, it doesn't help you figure out what's the most interesting and worth reading. The goal of the Digests feature is to surface the highest quality content, and let you decide which ones to read.

I imagine we'll need to take into account things like the word count and reading complexity (good thing we already generate that - we'll just need to save it!). We can then send you a notification that your daily digest is ready. The digest itself could something like - here's the headlines, word count, and complexity of these articles; pick the ones that are most likely to be interesting. To do this, we may need to have users give a few hints to the LLM about what they're interested in. I don't think I'm fully ready yet to implement a rating system to try and intuit user taste - but, who knows how I'll feel in a few months.

Alternatively, we could do a purer summary-of-summaries: here's all the summaries for all the recent articles (good thing we already have a convention for defining and accessing "recent" articles!), distill each one down to at most two sentences, and then show the distilled summary for the `n` (20??) most complex ones, along with a link.

I do also wonder if "complexity" really is the right ranking metric; personally, I love longform content and deep-dives, but perhaps others are interested in "high impact" content?

## `v0.5.0` and beyond
My tenative plan for `v0.5.0` right now is UI Modernization. Precis has a UI that looks like it was written by someone with no frontend experience, because it was. I don't think I'm at the point where I feel like I need to move away from the fully static architecture (digression - is this actually a static site? Usually, people use that mean that there's no backend to a site... but it would be more accurate to say that Precis has no frontend - we just return HTML templates. Anyway...), but I do think that maintenance could benefit from componentization.

I also think that some of the interactivity that we're faking using query parameters might be better served using a structured response. Especially things like redrives; if you stay on the page and reload it, you accidentally cause another redrive.

It's not realistic to plan too far past even `v0.4.0` - perhaps I'll implement "Milestone Candidates" in github so I don't forget my ideas, but here are some other big features that we could add:

1. Analytics and Reading History - a reasonable step if the complexity-based approach to content recommendation doesn't work well. I also think it would be incredibly funny to have super-thorough first-class support for Precis in something like Airbyte or Dagster, so that you could do... something?? with that data. Perhaps Precis has a use case as a data aggregator for loading into a vector DB like Milvius or Pinecone.
2. Relational Storage - I have no evidence that the LMDB Hybrid Storage Handler is incapable of scaling, but there's merit to the fact that relational storage is quite conventional. In addition, there's a few use cases already in Precis that would be benefit from indexing (the `/recent/` page, for example) and aggregation (serving the homepage requires a scan of the feed entry table to determine how many entries for each feed).
3. A CLI and/or TUI interface - kind of the opposite of "UI Modernization", but I think it could be fun to provide a way to browse Precis via the command line, either async via the existing CLI or synchronously via a Terminal User Interface (TUI).
4. Authentication and Multi-Tenancy - I've always run services strictly inside my home network's boundary and then access those services from outside using a VPN (Go Tailscale!!). But, I understand that others might want to serve Precis on the public internet, and so need authentication - although they could always just implement HTTP Basic Auth using their reverse proxy or similar. This being the case, authentication really means having a distinct user identity with separately managed content. Implementing users would also likely require some client-side javascript....