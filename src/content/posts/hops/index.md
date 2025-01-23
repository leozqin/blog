---
title: My final LLM project is for the little guys
slug: hops-my-final-llm-project
date: 2025-01-22
---
This is a story in two parts - the first is about my latest project, HOPS, but the second is about how I won't be doing any substantial work on LLM-related ideas for the forseeable future.

# HOPS
HOPS stands for Heterogeneous Ollama Proxy Server. It is a load-balancing reverse proxy that transparently forwards requests conforming to the Ollama API to any number of Ollama host instances. Behind the scenes, it queries each downstream host for the list of models that it supports, and distributes requests to a host that supports the requested model.

HOPS allows you to spin up a fleet of Ollama instances that use diverse hardware (whatever you have lying around, basically), and as long as you ensure that model X will safely run on instance Y, HOPS will make sure that the right machines get a piece of the action. 

The benefit of using HOPS is that you can horizontally scale your inference capacity beyond one node without compromising on model selection. In other words, model selection isn't contrained by the weakest machine in the cluster. At the same time, being able to address a single entry point for inference makes management easier.

HOPS is written for compatibility with Ollama version `0.5.4`, but given that the Ollama API is pretty slowly changing, a wide variety of versions are probably compatible.

The following Ollama REST endpoints are currently implemented in HOPS (with some caveats below):

1. `POST /api/generate` (single response and streaming)
2. `POST /api/chat` (single response and streaming)
3. `POST /api/embed`
4. `GET /api/tags` - returns the superset of models available across all known hosts
5. `POST /api/show` - returns the first instance of the specified model that the cluster supports

Models are identified by their full tag name, so please ensure to use those in your requests, and when loading models to downstream Ollama instances.

The configuration for HOPS is composable; you simply create a `hosts.yml` that maps the hosts available, their hostname, and any additional headers you want to pass (via `httpx`) to each host. Therefore, HOPS is compatible with other proxies that commonly implement authentication for Ollama.

For a high-availability configuration, consider deploying a set of uniformly configured HOPS servers behind its own load balancer.

During development, I tested HOPS for compatibility with OpenWebUI, the Ollama Python SDK, and Continue.dev (which in particular was a little finicky, but hard to tell if it's HOPS's doing or the detail for how Continue has implemented the model prompt).

HOPS is MIT Licensed and supports deployment with Docker Compose, or a Python virtualenv. [Find it on my Github](https://github.com/leozqin/hops).

# Why I'm done with LLMs
The intuition behind HOPS is to enable horizontal scaling of LLM inference capacity for operators that have only modest hardware. There are many of us out there, I believe - anyone with a reasonably modern GPU can run Ollama, and suppose networks of such operators federated behind a HOPS server - you could build clusters of Ollama instances with substantial throughput for small-to-medium sized models. This is probably most economical for utility models; small models that do a specific thing.

And yet - I'm left feeling uneasy about this project. I've internalized my resolution to [judge technology for its potential to harm](/posts/resolutions-for-a-freer-2025), and when it comes to LLMs, I have no choice but to conclude that they are too harmful to spend any more time working on. And so, I won't.

There's many reasons for this, obviously, but first and foremost, I think, is the cynical, craven, desperate, and reckless way that so-called "AI" companies are getting in bed with facsists simply for the opportunity to do business with the government using our tax dollars. Simply put, it's a scam.

As someone who's worked with this technology, I simply don't believe that LLMs currently are or will ever be capable of delivering on their promises with any quality. And, if you're familiar with my writing, you'll know that I believe [quality is the most important thing that we have to offer](/posts/quality_is_safety). This is because the promises are simply too big - in their current state, LLMs can probably do a great job of auto-correct, or summarization, or editing/rewriting. But, even a full-stack LLM approach incorporating RAG and chains of thought simply can't replicate the thought process of a skilled knowledge worker, or an artisan, or a teacher.

And yet, the insidious thing about the promises being made about LLMs are that they will, and there's no appetite or ability to test that they're actually doing what they say they will. Fascists have never been good with critical thinking, of course, so there's simply no accountability to outcomes. We're being sold a product that doesn't work, and being asked to center it in our lives uncritically. Even Sam Altman has come out and moved the goal posts for what constitutes "AGI", from something that is useful to something that is profitable. And, with the assistance of this fascist government, is going to get us to pay for it.

Even if the product doesn't work, it won't stop them from laying off the workers and raising the rents, because the goal was never to make our lives easier - it was to make the people expendable. Any further development in LLMs is antithetical to my strongly held beliefs about quality, so I'm out. Fuck that, fuck this, and if you're reading this, Sam/Elon/Larry/et al... fuck you.
