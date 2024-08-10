---
title: "Business Intelligence Should be Composable"
date: 2024-08-09
tags:
- tech
---
This past weekend, I had the opportunity to try Streamlit - the previously buzzy, now acquired by Snowflake framework for building dashboards and simple (or not so simple) data applications.

In short, I had a great time, and it's gotten me thinking about the state of business intelligence (BI) applications, and why many engineers (myself included) find working with and integrating BI applications into the software data stack to be frustrating and unenjoyable. The reason, I think, is that we simply can not hold BI applications to the same standards of composability and replicability as we do our own code, and it really shows when you look at the medium-term outcomes for most BI deployments (more on that later).

# What is Composability?
As [Wikipedia](https://en.wikipedia.org/wiki/Composability) puts it, "a highly composable system provides components that can be selected and assembled in various combinations to satisfy specific user requirements". Where I think that BI applications fail to meet this definition is the ability to provide components that can be readily selected.

Instead, most major BI applications are monoliths, both architecturally and in how they are implemented - you can't pick and choose the features you want because the entire thing is the feature. The value you get out of BI is the BI, and that's it.

I think that this manifests, however, in a few specific anti-patterns, which I'll discuss in detail below. I'm going to pick on Tableau a lot, because that's the one that I have the most experience with, but I have seen no evidence to the contrary that its competitors are any less guilty of these anti-patterns. And of course, I want to be clear that these are anti-patterns, so it is possible to avoid them and still use these tools correctly (don't worry, reader - you're one of the select few doing it right, I'm sure).

# BI tools let you hide business logic behind business logic
The metaphorical Ahab's whale of the BI application layer is its role as a "source of truth" - in other words, the BI tool wants to be the single place where all the metrics live; if you need to know the revenue from the last year, go here. If you need to calculate the total cost per acquisition, go there. However - for most BI applications, the place where the truth actually lives is the database. As is generally the case, you spend a lot of time refining metric calculations, chasing down edge cases, etc... in order to provide a clean and usable base for information?

Why then, allow the BI application to take all that work and throw it away by providing the interface to make "adjustments" or "patches" to make the data more coherent? Thinking of the data stack as an application, a user-safe application has well defined boundaries within which actors have responsibility and power. Another metaphor - suppose you went to a Michelin starred restaurant and started making substitutions to their menu to suit your needs!

Pragmatically (and with sincerity and seriousness, now) - the reason that most high impact data transformation happens within the database is because you're already doing a bunch of other transformations at the same time. The database is meant for transformations, so let it do them! The BI layer should be responsible for display and nothing else. The fact that BI tools allow (and sometimes even encourage) data transformation is nothing more than shipping footguns to trigger-happy users.

# BI tool buyers tend to talk down to their users
There's something naive and imperialistic about the notion that BI tools must have graphical interfaces - the idea that their class of users can't be expected to write code, or that it's "too hard" to teach them. 

Give me a break - we all seek to work with engaged and excited stakeholders, and I posit that the logical endpoint of a properly engaged and meaningfully excited stakeholder is to write code of at least moderate quality, and it is our duty as engineers to provide the platform, tooling, and education to enable them to do this quickly and while making minimal and inexpensive mistakes.

I know this sounds extreme and crazy, but haven't you ever found something that your BI tool just can't do? As a reasonably technical user you probably found it pretty quickly! Some time in the next three weeks to six months, your "non-technical" user will also hit that barrier, simply by way of their own learning process! Again, the properly engaged and meaningfully excited stakeholder is one that is ready to learn, and by putting this restrictive interface in front of them is simply a waste of time. At some point, they'll find the thing that they need code to do, so **we should just start them from that point**.

But Leo, you're probably wondering, how will they learn if we just throw them into the deep end? Well, first we'll teach them, as we would have been doing anyway, but also - have you ever been able to make a Tableau dashboard with copious amounts of Google, trial and error, and copy/pasting? They're going to do it anyway, so we might as well start them with the tool that has the higher (arguably, infinite) ceiling.

The same imperialistic attitude can be found when talking about "data products" - lets say you have a group of users that wants to explore the data and try to come up with their own conclusions, how do you enable them to do that? All too often, I hear talk about "data playgrounds" or "sandboxes", or pre-built Tableau dashboards that users can download and modify to do their own exploration.

What if, instead, we just gave them access to the same database that Tableau was going to talk to? Sure, they'd have to learn SQL, but as I described above, in three weeks to six months they were going to arrive in a place where they need to learn SQL, anyway. The notion that users shouldn't have to read documentation, do joins, or learn how the data structure actually works is nonsense becaues it leads to dissatisfied users that eventually outgrow their sandbox.

This is not to say that we should let users roam the worst parts of the data stack of course. There is a place to "hide sins" and that is inside intermediate transformations under the "access layer". The highest quality layer of data is intuitively the one that you use to calculate your metrics, and that is the same layer where users should be allowed to roam free.

The last thing I'll say about this is somewhat cynical. It's a true statement that developers are paid more, on average, than non-developers. There is to no small degree an intention on the part of BI tool buyers to maintain that hierarchy - "BI Analysts" operate the tools, whereas "Analytics Engineers" build the tables. Because the median time-to-exceed-the-boundaries-of-the-sandbox is rather short, there approaches a 100% chance that a "BI Analyst" will encounter something that can only be done in code, and if they are told to hand off that problem to someone else, they lack the chance to grow. By putting such strong walls around your people, you are needless gatekeeping them from learning a valuable skill.

# BI tools are pets and not cattle
The notion of "pets vs cattle" comes from the [practice of containerization](https://www.hava.io/blog/cattle-vs-pets-devops-explained) - the idea is that pets are precious and must be preserved and tended to, whereas cattle are commodities, replaceable and largely replicable. The idea of nurturing your pet cat makes a ton of sense, of course - but why should you treat your BI tool just as tenderly as you do a pet? 

The optimal performance envelope of your BI application changes over time - as people come up with ever complex ways to use your tooling, naturally the requirements will change. You should be able to tear down the whole thing and make a new one that better suits your needs without losing anything of value. Even better - you should be able to make two and use one for testing so you don't accidentally break prod.

Indeed - almost all BI tools treat themselves as pets, but we actually want the ability to do somewhat unthinkable things to them in the name of testing and quality. So, we should treat them as cattle instead, but the number one thing holding us back is the absolute inability of BI tools to support any kind of distributed version control.

The word "distributed" is important here - of course, most BI tools do support the ability to roll back changes that don't work well or cause problems. However - almost no such tools let you make your own local copy to mess with and make sure that things work as you expect. By adopting a view of BI as code, we can use simple version control tools to make the prod deployment less important - more like cattle, less like a pet.

So, what would a BI tool that's intuitively compatible with source control look like? Namely, one that operates largely off of code - the reason being that the structure of a sane application should mimic its interface, and the only rational way to meet this condition is that the application is readable in source control.

That brings us back tor Streamlit - the problem that it solves is precisely the ability to design a graphical application using code that mimics the same structure. The pattern of defining the entire application in Python is tremendously useful because in Python you can do exactly what you need to do. Simply put, the ceiling is higher.

That's not to say, however, that users will never find something that Streamlit can't do. However, because of the depth that you can achieve using Python, it is infinitely more likely that when a user finds something Streamlit can't do, that's because it should be a more complicated application, the kind that you'd want your engineers to maintain. 

The beauty of BI as code is that it provides you a way to monitor when users are doing so much that you should begin to consider spending product engineering time on it, because it is of enough importance and complexity to adopt into your own product.

# Other BI Tools that I find intriguing
So, obviously I just spent a lot of time essentially compare-and-contrast-ing Tableau and Streamlit. But, there are other tools that I find compelling outside of the two. Namely, [Evidence](https://github.com/evidence-dev/evidence) and [Rill](https://github.com/rilldata/rill).

Evidence approaches BI as a documentation problem, in my opinion. Put another way, rather than highly graphic and interactive displays, which sound great in theory but are rarely used to any depth, in my experience, Evidence lets you use JAMStack-like tooling to write narratives, and SQL to pull and aggregate data. Like most JAMStack sites, the end result is actually a static site, so performance is great. I think it's a realistic approach to the actual degree of interactivity that most dashboards need, which is to say "modest".

Rill takes a "Coding-in-YAML" approach to BI. It encourages users to build their own "semantic layers" (a fantastical notion that is rarely achieved, but that's a rant for another day) and provides an in-memory DB (based on DuckDB, which is great) to serve reasonably useful and interactive applications.

Both Evidence and Rill have a "look", which I think is unavoidable given their more constrained and pragmatic approach. This might rub some BI practitioners the wrong way, given that Tableau provides you pretty broad control over how things get rendered. However - if you find yourself in this boat, consider - was it ever important that things looked a certain way, or was it just important that things looked both "nice" and "consistent"? I posit that nice and consistent is just fine.