---
title: "How Many Miles Will You Scroll?"
description: An early experiment in Fermi estimation
date: 2015-08-10
tldr: Part-way across the tri-state area
slug: how-many-miles-will-you-scroll
tags:
- hall-of-fame
---

## A note from the future
Wikipedia says that the term "doomscrolling" [originated in "the early 2020s"](https://en.wikipedia.org/wiki/Doomscrolling#:~:text=gained%20popularity%20in-,the%20early%202020s,-%5B1%5D%5B9) - which is accurate, but also an outrageous way to describe our current decade. I wonder if these numbers perhaps need a revision since I wrote this in 2015.

Notably - 2015 predates TikTok (but not musical.ly), which probably has an outsize effect on how these numbers look now.

## How Many Miles Will You Scroll?

It may seem hard to believe, but at one point in time, there was no scrolling on the internet. Instead, people used the page-up and page-down buttons to move through a body of text. Yes, that’s what they were for. Today, those buttons are just there to get in your way as you fumble for the number pad… if your keyboard has one at all. Indeed, the function of those two buttons have been handily deprecated by scrolling (except for clickbait websites, which insist you click through each page). Aside from allowing dense or lengthy content to remain remain, scrolling plays an important role in web design by allowing a variety of different screen resolutions to correctly render the same text. Can you imagine what it would be like if all web content were designed to the lowest common denominator?

That begs the question, though… just how much do we scroll? Let’s figure it out!

### Devices and Screen Size
Your typical person probably has two devices that they actively use to scroll: a smartphone and a mouse. Let’s focus on the smartphone for now. A typical smartphone these days has a screen with a diagonal length of between 4.3 and 5.5 inches. The typical aspect ratio is 16:9 (or really, 9:16, since the aspect ratio is traditionally denominated by the vertical aspect – it’s a ratio, though, it doesn’t matter!). Using the Pythagorean theorem, and given that the vertical length of the triangle formed by the diagonal is 1.77 times the horizontal width, we know that the vertical length of a smartphone screen ranges between 6.630 inches and 8.480 inches. For a one handed scroll that crosses 50% of the vertical real estate of the screen, each scroll uses between 3.315 and 4.240 inches of space.

### Content Consumption

> Another note from the future: The link to the Flurry blog post was dead when I migrated this, but I feel that it's important to mention that it was actually a link to their corporate tumblr. Remember when that was a thing?

According to this blog post by Flurry, a digital analytics company owned by Yahoo, the average user spends 2 hours and 57 minutes on their phone every day. Additionally, the [average American spends 102 minutes per month](https://qz.com/365293/it-took-a-decade-but-mobile-video-is-finally-exploding) (or 3.4 minutes per day in a 30 day month) watching video on their smartphone. So, we know that 2 hours and 54 minutes, or 174 minutes per day is spent on the smartphone doing non-video things. Finally, for the sake of safety, let’s apply the 80/20 rule and say that 80% of 174, or 139 minutes is spent actually reading content.

Research suggests that the [average college-educated person probably reads between 200-300 words per minute](https://www.scotthyoung.com/blog/2015/01/19/speed-reading-redo/) at full comprehension. If we assume that skimming allows you to read twice as that, but at reduced comprehension, that means you can read between 400 and 600 words per minute while skimming. Most content on the internet is not sufficiently engaging to grab your full attention, so let’s apply the 80/20 rule (in a [Pareto Principle](https://betterexplained.com/articles/understanding-the-pareto-principle-the-8020-rule/)-like fashion) to establish that, on a time averaged basis, the average smartphone user will be reading (250 * 20%) + (500 * 80%) = 450 words per minute.

### Converting Content to Size
This equates to 62,250 words per day of content that is consumed via smartphone. Designers often refer to [65 characters per line](http://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/) as the ideal for creating engaging content, given that [the average word length in English is 5.1 characters](https://www.wolframalpha.com/input/?i=average+english+word+length), we know that the average line contains around 12.75 words. So, the average user will consume roughly 4880 lines of textual content every day. Finally, let’s apply the 80/20 rule yet again and assume that 20% of the physical space that a user consumes over smartphone is whitespace or graphics. So, accounting for whitespace and graphics, the average user will consume 6103 lines of content per day.

Nominally, a “point” in terms of font size refers to a fixed unit of 1/72 inches. This may vary depending on device size and personal settings, but let’s say that it holds true here. 14 point font, therefore is 14/72 inches, or just shy of 1/5 inches tall. At 1.5x line spacing, this means 21/72 vertical inches per line, or 0.28 inches per line. Dividing this by the vertical length of smartphones screens, we get a line capacity of between 23.678 lines per screen (for 4.3 inch devices) and 30.29 lines per screen (for 5.5 inch screens).

> Another note from the future: remember the term "phablet"?

### Bringing it all together
With this knowledge in hand, we can finally calculate how far you scroll every day. If we assume that every scroll completely replaces the text on the page, we find that the typical smartphone user will scroll between 201.48 and 257.75 times per day. Using our one handed scroll lengths, this equates to 854.44 inches for a 4.3 inch screen, or 890.54 inches for a 5.5 inch screen. It’s interesting that the numbers are roughly the same. Converting that to feet, we get between 71.20 and 74.21 feet per day.

To put that in perspective, [with the cab attached, semi-trailers are between 70 and 80 feet long](https://truckersreport.wordpress.com/2013/09/09/20-insane-but-true-things-about-18-wheelers/), and the [Megalodon shark (which definitely doesn’t exist anymore) peaked at about 59 ft long](https://en.wikipedia.org/wiki/Megalodon). Taking the mean of the two figures, this means you scroll 5.03 miles per year. If you’ve just turned 25 years old and you got your first smartphone when you were 11 years old (which is not unrealistic), that means you’ve scrolled 70 miles, which is represented by the radius of which is represented in the map below. You’ve dragged your finger a distance equal to that from the center of New York City to New Haven, CT as the crow flies!
