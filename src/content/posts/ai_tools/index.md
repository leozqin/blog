---
title: "A Registry and Proxy Server for Agentic Tool Calling"
date: 2024-10-08
tags:
- tech
- llm
- foss
---
This post is about an idea that's been rattling around in my head lately.

I find that it helps my creative process to write about partially formed ideas. That way, I can flesh them out and see if there's anything there. So - how about this one?

# The Main Thought

What if, instead of having LLM-based agents call tools directly, you instead provided them a registry of tools that they could use? They could then determine which tool(s) would be the most appropriate to use for the task at hand and then access those tools on demand.

I think one benefit of this arrangement is that you can then eject other unnecessary tools from the model context. Let the model decide which tool(s) are most likely to achieve the request, then get those tools and decide which ones to start with.

To break the solution down further, I think what this entails is:

1. A way to register and de-register tools.
2. A way to search for and return useful descriptions of tools.
3. A way to return the full definition of selected tools
4. A way to invoke a selected tool with a request generated by the agent, or return the necessary scaffolding for the agent to make the request on its own.

I think that one interesting wrinkle might be to support proxying the request to the tool via the registry server, or a worker thereof. This would prevent you from having to give the agent direct access to the credentials used to authenticate with the tool. This also lets you provide a single point of access for tool-based utilities and treat it like a bastion - secure the heck out of this one service, but let agents run in userspace.

At its most basic, one way to provide scaffolding to allow an agent to complete a request might simply be to specify required headers when registering an instance of a tool (yes - tools should be instanced, if you imagine the most common tool is a REST-like api, that API is going to change versions and endpoint names, etc... if we're going to create a registry, we should support that). Those headers can then be included in the request, either by proxying, or returned in the request when an agent requests to "hydrate" the tool.

# Other Thoughts
- There's a pretty intuitive SDK pattern that we could implement too - the Python SDK could simply return a `langchain` tool when requested. The registry and proxy server can also be thought of as a tool - it's a meta-tool, one that provides other tools!
- One interesting capability that this pattern enables is for the scope of tools available to agents to change over time - and it could even include other agents! They'd simply have to expose themselves using a REST-like API, and then register themselves as tools
- One capability that this pattern would need is the ability to annotate or extend existing OpenAPI specs. Perhaps a layer on top of them, maintained as `yml`, to enhance whatever is included in the basic spec. Having spelled this out, that sounds like a less important capability, since you can always just modify the spec files themselves.
- We should support the ability to have composable configurations though - most tools don't change that much, so it's easier to manage them in configuration. When the server starts, we can simply make sure that all of them exist in the database in the right form.
- Some degree of structured persistent storage is necessary - that is the most sustainable way to conduct searches. I think that a true search capability is necessary. We should index things like descriptions, and also allow registrants to tag their tools.
- We should have the ability to ingest OpenAPI specs to register tools. Each route should essentially become a tool. If configured, we should be able to ignore certain routes.
- Because agents have some knowledge of their state, having a wide variety of slightly overlapping tools allows agents to try one tool, but then another if that one fails.

# What Should We Name It?
Naming is always the hardest part of starting a new project...

Already taken (so we won't use it):
- Toolbase
- Metatool
- Gadgetbase
- Gizmobase
- Multitool
- Gadgethub
- Gizmohub
- Toolhub

Not taken (or not confusingly so):
- Tool Registry and Proxy? (TRP) - ie, TRP server, TRP service? (pronounced "trap" - as in "it's a trap!")
- Agentic Registry of Tools (ART) 
- Shebang (as in "the whole shebang", but also a reference to [the character sequence](https://en.wikipedia.org/wiki/Shebang_(Unix)))
- Laridae (the family of gulls, which are known to use tools)
