---
title: "Precis - an AI enabled RSS reader"
slug: precis-an-ai-enabled-rss-reader
date: 2024-05-21
tags:
- tech
---
Precis (properly Précis, pronounced "pray-see") is a extensibility-oriented RSS reader that can use LLMs to summarize and synthesize information from numerous different sources, with an emphasis on timely delivery of information via notifications. 

Get it [here](https://github.com/leozqin/precis).

# Technical Details
Precis is a FastAPI monolith that serves fully static pages styled by Tailwind CSS using DaisyUI components. It uses some query-parameter and redirect chicanery to fake interactivity. We'll probably add actual interactivity at some point.

Inherent to the architecture of Precis is extensibility - almost all key components in the framework can be substituted for others.

For storage backends, we support `tinydb` and `lmdb` - both of them are embedded databases, but with wildly varied scale; tinydb is literally a json file, and lmdb is a memory-mapped database that supports concurrent reads. We use Pydantic models and an enumerated transactions pattern to support extensibility - if you can implement about 20 transactions that give and get Pydantic models, you can add support for your own database of choice.

For summarization, we support Ollama and the OpenAI API with a functional default prompt. Extensibility is as simple as implementing a single `summarize` method.

For notifications, we support `matrix` and `slack`. Again, extensibility is as simple as implementing a single `send_notification` method.

Finally, for content retrieval, we support `requests` and `playwright`. `requests` is extremely lightweight and fast; however it sometimes fails to retrieve content that is obscured by javascript. `playwright` resolves client-side scripts, so it is somewhat more successful with complex websites. Adding additional content retrieval handlers can be done by implementing a single `get_content` method.

# Why Precis
Here's why Precis is a good idea:

1. RSS is universal
2. The quality of algorithmic curation has declined over time
3. You should have control over the pace at which you consume content
4. Generative AI helps to scale our media consumption while maintaining quality

A note - the answer to the literal question of "why is this project named Precis" comes from the French word précis, which means "a summary or abstract of a text or speech". 

This word left an impression on me in college, as I was once tasked with writing a précis of [Michael Doyle's "Kant, Liberal Legacies, and Foreign Affairs"](https://web.archive.org/web/20140216082244/http://www.politics.ubc.ca/fileadmin/user_upload/poli_sci/Faculty/price/Debating_the_Democratic_Peace__Doyle.pdf). Having no idea what the term meant and foolishly forgetting the Google exists, I simply looked at the term and intuited that it meant "summary" or "precise ideas", and luckily got it more or less right.

The spirit of "more or less right" lives on in Precis' implementation of LLM-driven summarization.

## RSS is Universal
For as long as I've been able to remember, an RSS reader has been part of my media consumption strategy. There have always been sites and writers that I want to follow, and RSS is the universal open standard for content syndication. I always encourage people who want to learn more about technology to start with implementing a RSS reader habit in their lives, because it really helps you to understand how technology works.

In fact, the first-order reason for why I started work on Precis was that I was having trouble finding an RSS reader that I loved, and had some interest in trying out web development, having had extensive experience with deploying dockerized applications.

Anyway, here's a list of RSS reader products that I tried before:

1. Google Reader - the original, may she rest in peace.
2. Feedly - quite usable and nice, but not worth $7.99 a month (and so instead I spent low-thousands worth of dollars on server and workstation equipment to make my own)
3. FreshRSS - lovely and highly usable, but a little antiquated looking
4. Miniflux - delightfully lightweight; its notification integration and reading mode are inspiration for Precis
5. [ssddanbrown/rss](https://github.com/ssddanbrown/rss) - I liked it because it was quite modern looking, and allowed you to manage feeds as config files and set categories. The category hierarchy concept is influential in Precis, and early versions of Precis also required you to manage feeds as config. In later versions I've moved away from that approach in favor of UI, but I may introduce it again as a side feature.

## Algorithmic Curation is Bad Now
I think that the tech industry had a serious moment of hubris thinking uncritically about the second-and-third order effects of broadly implementing algorithmic curation. If you measure the success of content in terms of engagement and time spent on your platform, it's inevitable that you're going to produce a high volume of poorly-considered ragebait and a tarpit-like user experience.

In short, even conscientious algorithms have to deal with the pressure of demonstrating not just growth in the userbase, but growth in the growth of the userbase, or even growth in the growth in the growth of the userbase, just to have a sustainable product.

The only way out is to opt out; Precis (RSS readers broadly) allow you to pick your own set of high quality, trusted sources and manage that list as sources become more and less trustworthy.

## Control Over Consumption
Perhaps the worst possible thing that can happen to an algorithmic feed is that it runs out of stuff. The need to always keep showing you new stuff means that after a while, especially if you're terminally online like me, you being to scrape the bottom of the barrel.

What if, instead, you just walked outside and touched grass? With Precis (and again, RSS readers broadly), you can refresh the page and sometimes nothing new shows up, and that is totally fine.

Seriously though - in Precis we take the idea further. Notification handlers allow you to route feeds to different destinations - if you want to get a push notification for all of your tech news, but you don't need to keep super-up-to-date with sports, you can create a channel for each, and then mute the sports channel.

In short - people should be able to consume content on their own terms.

## Scaling Media Consumption
Did you ever have that a friend that was annoyingly informed about almost everything? I posit that we need more of those people; the world is complex and hard to understand, and the ability to continuously turn data into information is a valuable skill for understanding how the world works. And yet - it is undeniable that between the internet, social networks, and globalization in general there is more news than ever.

By using summarization, we can help users to prioritize the articles that they spend their time reading. Using Precis, you can skim the TL;DR to see if an article is worth reading. If it is, you can read the article without leaving the app.
