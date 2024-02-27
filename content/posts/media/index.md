---
title: "Two Potential Architectures for Automating My Media Diet"
date: 2024-02-26
slug: automating-media-diet
tags:
- tech
---

One thing that's very important to me is maintaining a healthy media diet. While I'm not averse to recommendation algorithms, I find that they optimize for engagement and on-platform time, as is required to produce unending *growth* in ad revenue. As a result, I find that such algorithms sacrifice quality for quantity, or outrage impact, or speed. At its extreme, in the case of the conservative control of mainstream media, this disregard for quality manifests as disregard for *truth*. Basically, whatever the reasoning, the thing that we lose is quality. So - as someone who deeply values quality, I find that I seek ways to make my own algorithm. This post is about two potential ways to automate the way that I consume written journalistic media - and I plan to eventually implement one of them. Think of this as an architecture document for this component of my home network.

# The Vision
What I'd like to be able to do is:

1. Configure RSS feeds for high quality news and commentary sources
2. As each RSS feeds yields new, unread items, make a decision about quality of its contents
3. If the content is high quality, use a locally-running LLM to summarize it, and send a digest and link to a chat channel for me to read
4. If I want to learn more about the topic after reading it, the ability to retrieve additional links about the same topic, which are also high quality.

# Components
## LLM Serving
I plan to to use [Ollama](https://ollama.com/) to serve models. It supports a broad variety of models, and is compatible with LangChain (which we'll get into later). To start, I plan to use `openhermes:v2.5` (based on Mistral-7b) as the main model, but using Ollama allows me to change the model fairly painlessly. I'll deploy Ollama using this [docker-compose template](https://github.com/valiantlynx/ollama-docker/blob/main/docker-compose-ollama-gpu.yaml) - in testing, using a GTX 1070 on fairly ancient hardware I was able to get 20-30 tokens per second of output, which should be adequate for this use case. Faster processors and better memory bandwidth will also help.

## API Layer
I plan to write an API to encapsulate common LLM transactions (such as `summarize` or `search`) using LangChain and FastAPI. Namely, I'll implement some basic retrieval-augmented generation (RAG) use cases.

- the `summarize` endpoint will take a URL, retrieve its contents, and use the Ollama endpoint to summarize it. Experimentally, `openhermes:v2.5` does well enough with larger contexts, which you can set when you make the call to Ollama.
- the `search` endpoint will take a search query, retrieve the top ten results using my local SearxNG instance (a meta-search engine that looks at numerous different search engines), and yield a summary of the snippets.

In time, I may extend or write a variant of the `search` endpoint that fans out to call the `summarize` endpoint on each search result for increased summary depth. I would then use a map-reduce pattern to summarize those summaries and return links that provided novel or important information to the summaries.

I'll *probably* use `uvicorn` as the ASGI server for this, since it's built-in with FastAPI, and deploy the API using docker-compose.

## Quality Measurement
I'll also need to figure out how to measure the quality of a given webpage. The reasoning here is that even high-quality sources sometimes produce low-quality content. The Verge, for instance - often has posts that highlight discounts that they monetize using affiliate links. I'm not philosophically opposed to this as a business practice, as long as editorial remains independent, and the products that they highlight are actually of high quality. Slippery slope, though...

A few approaches I might try (likely, it'll be more than one of these):
1. Using a LLM (with json-mode)? to determine if the content is low-quality.
2. Looking for hrefs that match a regex for common affiliate links - I could hook into the community maintained lists used by `pihole` and `pfblocker-ng` (which I use, personally) - if too many links are blockable, consider it low quality.
3. Some kind of NLP approach for measuring writing quality, such as authoritative tone or syntatic complexity?

## Chat Delivery
I have a non-federated Matrix homeserver that I use for consuming event streams. It uses the `dendrite` variant of Matrix, which is written in Go.

\<digression\>

One of the things that I am lucky to be good at is one-shot information retention. 

As a result, consuming information by reading/text chat has always worked very well for me, and I rarely find benefit in taking notes. I am very interested in exploring the contours of this - in particular, the nature of text chat as event stream that is compatible with retention means it ought to be possible to accumulate a personal knowledge base. 

I may experiment with some kind of indexed storage for chats that have been delivered - the Matrix homeserver database is not the ideal place to access this kind of stuff.

\<\\digression>

## Workflow Management
One thing my homenet has never had is a centralized, standardized way to schedule and monitor workflows. I've never really had a pressing need, as my existing RSS workflows are done using RSS-specific applications - formerly [freshrss](https://github.com/FreshRSS/FreshRSS) and currently [maubot-rss](https://github.com/maubot/rss). I also have the ability to run workflows on a cron schedule (or webhook) using the `drone` ci platform.

However, I think I'd rather not use drone for this - I'm wary of abusing CI compute beyond its design scope (aka the jenkins-server-that-does-everything approach).

So, I think the two approaches I'd like to consider are...

### Treat Events as Data Using Dagster
I'm quite familiar (and fond of) Dagster because I use it (specifically Dagster Cloud Serverless) at work, and I think that I could fit this workflow into Dagster concepts:

1. An asset for each RSS feed, created using a config-hydrate pattern
2. A fan-in asset downstream of those assets which invoke the API layer to do various LLM transactions
3. A downstream asset that invokes a Matrix resource to send a message to a dedicated chat channel
4. An io manager for that message asset that handles outputs by writing them to an indexable data store

If we're committed to having maximum fun, we could also release the Matrix resource to the Dagster community, surely someone out there may have a need of it....

### Implement a No-Code Event Bus using ActivePieces or n8n
The other very common pattern for LLM applications is to use a no-code workflow management system such as Zapier to handle the business logic of collecting feed items. There's numerous "entrepeneurs" out there that will sell you a course on how to create and manage these automations. Sort of a shady business, but I can't deny the concept is sound, and would require a platform that supports one or more of the following components:

1. An integration for RSS feeds
2. An integration for HTTP requests (to call the LLM API)
3. An integration with Matrix
4. An integration with some kind of indexable storage

Of the two options I've identified, it seems that ActivePieces is newer and pretty slick-looking, whereas n8n is "low-code automation for technical people" (it me), and seems to have a very strong and usable abstraction on top of ANY http request.

### Pros and Cons/To-Dos
First off, it's become clear that I do NOT have a technology in mind for indexable storage. I should look into that. This TODO alone justifies writing this piece to me... I didn't realize I didn't know that.

1. I like Dagster as a framework, and coding is fun
2. Buuuuuut... I've never tried a no-code framework before, and that could also be fun
3. I might have other use cases for a no-code framework... but the same could be said of Dagster
4. This is a minor (like... 5%) misuse of Dagster as a framework

**Be it resolved** - I'll try a No-Code Framework first, and see how it goes. I am reasonably confident that I could make Dagster work. 

I'm thinking n8n...