---
title: How Many Murderers Will You Walk Past?
description: Maybe the only good thing that's happened to me from Facebook
date: 2015-06-21
slug: how-many-murderers-will-you-walk-past
tags:
- hall-of-fame
---
## A Note from the Future
This was far-and-away the most-read piece from the old site. It SEOs extremely well and my biggest regret about it is that comments were enabled. After the first twenty, I just stopped approving them... For this reason, the new site will not have comments.

## How Many Murderers Will You Walk Past? 
Yesterday, as I was browsing Facebook, I saw a picture stating that “The average person walks past a murder 36 times in their life.” Surely, this is an extraordinary claim, and extraordinary claims require extraordinary evidence. If there’s one thing that clickbait pictures from 9gag do not contain, it’s extraordinary evidence. So, let’s test their claim. How many murderers will an average person walk past in their life?

{{< figure src="9gag-murderers.jpg" title="The meme in question" >}}

First, let’s unpack that question:

- The scope of the question is murderers (let’s assume unique murderers, so if one of your coworkers were a murderer you would only count them once no matter how times you interacted)
- The scale of the question is average people, which means that we can use aggregated data and only have to worry about the population described in aggregate
- Walk past implies a very low level of interaction, but is inclusive of higher levels. That lady at the grocery store with whom you were competing for the last jar of your favorite peanut butter counts, but so does your mom.
- In their life indicates that the question is not iterative, and is limited only to the time frame in which the observer is alive.

Great, now let’s set some assumptions and examine if they are reasonable:

- You live in the United States – our crime rate is rather high, which may be a function of reporting, but the rate for murders is actually below the average for the world (but still higher than Europe, Asia, and Oceania). North and South America actually have the highest intentional homicide rate in the world. Let’s keep it simple.
- You can only walk past a murderer on the street if they got away with murder – Popular TV shows say that once two days has elapsed since the murder, it is unlikely to the solved. In reality, the truth is unlikely to be that easy, but there’s also very little data on the topic otherwise. We may have to give this one a pass.
- The average murderer only kills one person – Dr. Mike Aamodt at Radford University has compiled a dataset on the basic statistics of serial killers. It contains data on 3873 serial killers and 11,187 victims, or approximately 2.89 victims per serial killer. Such a low number brings into question the definition of serial killer, but it also tells us that this is a safe assumption.
- The average person walks past some number of people every day. This number is vague and contentious, so we’ll deal with it later.

And finally, let’s get our basic facts in order:

- The average lifespan in the US is 78.74 years
- The rate of murders in the US in 2013 was 4.5 murders per 100,000 people, or 14,196 estimated in total
- The population of the US in 2014 was estimated at 322,583,006 people
- One third of murders go unsolved

Out of 78.74 years, let’s say that the average person is ambulatory and social for 75 of them. That’s 75 years, or 27,375 days (not counting leap years) during which you might walk past a murderer.

One third of murders go unsolved, so 1.5 murders per 100,000 people go unsolved. Extending on the basis of our third assumption, that means that the rate of unapprehended murderer in the US is 1.5 per 100,000 people, or 4838 at any given time. That is 0.0015% of the population.

That just leaves the fourth assumption: how many people does one walk past every day? This depends to some degree on lifestyle. If you’re a trucker that only works night shifts, you probably have many-fold fewer interactions than does someone who works at an airport or a carnival, to give two examples. In any case, this number is contentious, so we’ll test it two different ways.

First, let’s try out a logarithmic scale distribution. Just from the previous example, it’s clear to me that some people have a lot more interactions than others. Let’s test the resultant range when we test a range that varies in a logarithmic fashion. If you meet 1 new person per day, you meet 27,375 new people throughout your entire life, of which 0.41 of them are likely to be unapprehended murderers. Of course, this means that if you meet 10 new people per day, you’ve met 4.1 murderers throughout your life, and if you meet 100 people new people per day, then you’ve met 41 murders throughout your life.

This is a very interesting result because it is actually quite close to what the picture told us. If you live in or around a city and walk somewhat frequently, it’s very conceivable that you could meet 100 new people per day. Of course, if you live in a small town, or in a city but you do not walk around a lot, 100 is less likely to be achievable. The power of the logarithmic scale is that you get a wide and diverse range without a lot of work.

Let’s try another approach to finding this number. I know that most people meet an average number of people per day, but that some meet an unusually large or small amount. Using a normal distribution, we can compute a “typical” number that the aggregated average of people might meet. Let’s pull forward the values from the logarithmic distribution and assign a quintile (or 20%) each for 1 and 100 new people per day, and the remaining three quintiles for 10 new people per day.

By calculating the distributed average, we find that (20% * 1) + (20% * 100) + (60% * 10) =  26.2 new people per day. This seems reasonable, so let’s finish the calculation.

At 26.2 new people per day, the average American meets 717,225 people throughout their lives, of which 10.76 are likely to be unapprehended murderers. Not bad. 9Gag calls their fact a fun fact because they didn’t kill you… but 10.76 murderers over 75 years really just means that they (and you) are so busy meeting people that any specific person is unlikely to be one of their victims.

Well, that was dark.