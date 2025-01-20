---
title: "How Many Cups Does Starbucks Use in a Day?"
description: An early experiment in Fermi estimation
date: 2015-09-14
tldr: A lot! Also, did bring-your-own cup die with covid?
slug: how-many-cups-does-starbucks-use-in-a-day
tags:
- hall-of-fame
---
## A Note From the Future
The first thing I bought with the money I earned from my first Adult Job (tm) was a sage green Klean Kanteen vacuum insulated coffee cup. I bought it at Powell's on my lunch break about three days into the job, because the product manager who sat across from me had one of her own (in... purple, I think?). 

Back in the day, Starbucks would give you 10 cents off your order if you brought your own cup. Every time I went to the Starbucks referenced in this piece, I would bring that cup. To this day, I still use it.

## How Many Cups Does Starbucks Use in a Day?
Like many people across the world, I like to start my day by drinking several cups of roasted bean broth filled with psychoactive compounds. Given that I’m not cool enough to do peyote, I’m talking, of course, about coffee. Living in Portland, there are countless places to get great coffee at nearly any time of the day, but none of those places also happen to be in the same building where I work. So, I find myself at Starbucks more often than not, and perhaps more often than I would like. Being the stickler for efficiency that I am, as I walk out of the store within two minutes of entering with my (surprisingly ok) blonde roast drip coffee, I find myself wondering “just how many cups does Starbucks use every day?”. As there are about two weeks left in their fiscal year, let’s take a look.

> Future me again: since publication, Starbucks re-did their investor portal, so the link to their 10K has broken.

This, no doubt is a vexing question to Starbucks management; they pay for each and every cup, including those that they don’t use. Fortunately for them, they have detailed store-by-store data on cup usage; enough, probably, to use time-series analysis to project future demand. Unfortunately for me, I don’t have that kind of data. However, as a publicly traded company, I do have their financial statements and supplementary data. Fortunately for me, that’s enough data to use Fermi estimation to derive that information.

### Setting the Stage
When we say “Starbucks”, do we mean “a typical Starbucks store”, “every Starbucks in the US”, or “every Starbucks in the world”? Luckily for us, their 10-K filing for 2014 not only includes worldwide results but breaks them down into individual segments. Let’s start with every Starbucks in the world, and then break it down further.

Next, because we are interested in the number of cups that are used, that must mean we are specifically interested in their sales of prepared drinks. Ready-to-consume beverages don’t count, and neither does food, coffee accessories, or [music](https://www.theatlantic.com/entertainment/archive/2015/02/starbuckss-failed-music-revolution/385937/).

According to their 10-k filing, the net revenue as a result of operations for company-operated stores and licensed stores, together, totaled $14,566,500,000 worldwide, or $14.567 Billion. They also have a (not insignificant) separate category for revenue from business services, but I will not count those since the spirit of the question concerns physical store locations. In the same filing, they also divulge that in the 52 week period ending Sept 28, 2014, 73% of sales were attributable to beverages. This is actually down 1 percentage point year over year for the past two years.

Given this, we can calculate that the revenue as a result of retail operations attributable to beverages is $10.634 Billion

### Calculating the average ticket
Here’s where it gets tricky. There is little to no data about the average ticket size in Starbucks stores. Doubtless, they consider that proprietary and strategic data. This being the case, we’ll have to guess. Fastfoodmenuprices.com contains a nicely formatted table of the Starbucks drinks, sorted by size and price. I’ll grab this and use it to determine the average ticket size. The thing to remember here is that the size of the drink co-varies with the price, so we really only need to consider one of them. If we assume that consumers are price sensitive, then it makes sense that the least expensive items will command the most sales a proportion of the total.

That is, on a macro scale, the sales of an item as a proportion of the total will be inversely related to its price. One way to calculate this relationship to identify the proportion of any one menu item’s price to that of the highest item (producing value equalling one for the highest priced item), and then taking the inverse of that value. By then calculating the ratio of the inverses you can identify the percentage of sales attributable to the any given item such that lower priced items have higher sales totals.

Drink|Size|Price|Rank in Price|Proportion|Inverse|% total
---|---|---|---|---|---|---
Freshly Brewed Coffee|Tall|$1.75|1|0.294117647|3.4|2.49%
Teavana® Shaken Iced Tea|Tall|$1.75|2|0.294117647|3.4|2.49%
Freshly Brewed Coffee|Grande|$2.10|3|0.352941176|2.833333333|2.07%
Iced Coffee (with or without Milk)|Tall|$2.25|4|0.378151261|2.644444444|1.93%
Teavana® Shaken Iced Tea|Grande|$2.25|5|0.378151261|2.644444444|1.93%
Freshly Brewed Coffee|Venti|$2.35|6|0.394957983|2.531914894|1.85%
Teavana® Shaken Iced Black Tea Lemonade|Tall|$2.45|7|0.411764706|2.428571429|1.78%
Iced Coffee (with or without Milk)|Grande|$2.65|8|0.445378151|2.245283019|1.64%
Teavana® Shaken Iced Tea|Venti|$2.65|9|0.445378151|2.245283019|1.64%

With this calculation, we can then take the weighted average of each drink permutation using its %total and calculate, nominally, the cost of the average drink at Starbucks. Do the math, and you get $3.61. Interestingly enough, because the variation of the price range is so low and there are so many individual products, the individual contribution to the average ticket of any given drink is identical to at least 13 significant digits. Certainly an oddity, but $3.61 definitely feels right.

### Bringing it all together
Now that we know the average ticket for each drink, we can calculate how many drinks Starbucks stores across the world made (assuming they share pricing with the United States; I’m not sure I’ll get better data for this). Given revenue of $10.634 Billion and an average drink cost of $3.61, I calculate that Starbucks stores made 2,945,706,371 drinks between September 27, 2013 and September 28, 2014. In words, that is 2.946 Billion drinks.

> Future me: Impressive that after 6 years Amazon links with all kinds of weird parameters still don't 404.

If 1% of customers who buy drinks bring their own reusable containers (for a $0.10 discount), this implies that the number of cups used in Starbucks stores is 2.916 Billion. As a side note, I wonder if this 1% is accurate. If it is the case, then Starbucks is leaving $29,457,063.71 of revenue on the table every year. That’s nothing to sneeze at, even if you’re Starbucks, as I am pretty sure that that does not approach their wholesale price for cups (see [this Amazon listing](http://www.amazon.com/OF12BI-0041-Single-Sided-Paper-Capacity-Bistro/dp/B005IP06PG/ref=sr_1_1?s=hpc&ie=UTF8&qid=1442290243&sr=1-1&refinements=p_n_feature_keywords_five_browse-bin%3A6146546011) to illustrate how cheap cups can be for consumers).

> Future me, again: Did I write this entire piece before finding out that Starbucks has their own number on their site? Maybe.

This, in turn, brings up all kinds of questions about per-store utilization, or daily totals. But that’s an endeavor for another day. For now, we know that in their last annual reporting period, Starbucks likely used between 2.916 and 2.946 billion cups at their stores, or an average of 8,070,428 per day. Interestingly, Starbucks’ own website states that they “account for approximately 4 billion cups globally each year“. I wonder where such a sizable difference comes in. The sheer scale of the difference implies that the difference cannot be explained by methodological error alone, especially since that number should include the population of cups that are diverted to the use of reusable containers.
