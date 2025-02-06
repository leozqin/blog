---
title: "Quality is Safety"
date: 2024-12-15
tags:
- tech
- capitalism
---
# Squirrel Burgers
There's a stomach churning parable among people who think a lot about agile as a software development orthodoxy that is commonly attributed to Ken Schwaber (I pulled this particular telling from [this post on Scrum.org](https://www.scrum.org/forum/scrum-forum/33241/quality-over-quantity-squirrel-burgers)).

> "A man walks into Fat Burger and orders a Double Fatburger, fries, and a drink.

> Man only has $3.15 but the total comes to $7.15. The manager tells him he’s going to remove something from his order.  But the man insisted to have it all.

> The manager doesn’t want to lose the customer so he walks out and finds a dead squirrel off the street.  He makes the burger by cooking the squirrel and putting it on a bun and hands it over to the man."

The moral of the story, understandably, is that compromising on quality leads to outcomes that make nobody happy. It's a well-understood principle in software that we should never compromise on quality in getting things out the door faster - rather, compromise on scope or functionality, or bite the bullet and compromise on the timeline. And yet - I feel that we compromise on quality in the name of shipping faster all the time in the modern software enterprise. 

Oftentimes, the ideological thrust of doing so is to achieve the white whale "minimum viable product" - the notion that shipping anything at all is good, because the feedback you get is valuable, and will help you ship something better the next time. I don't disagree with this approach in theory, but I think that its too easy to fall into romanticization of the fast-moving startups of the 2010s - the "move fast and break things" era.

The thing is, moving fast and breaking things means you have to contend with the consequences of breaking things, and some broken things are harder to fix than others. A dead link on the homepage? Fine. [One dead pedestrian](https://www.reuters.com/business/autos-transportation/how-gms-cruise-robotaxi-tech-failures-led-it-drag-pedestrian-20-feet-2024-01-26/) or [six dead cancer patients](https://en.wikipedia.org/wiki/Therac-25)? Unacceptable, ghastly, and in some cases, criminal.

And that's the reason why the Squirrelburger story matters - when we compromise on quality to meet a business deadline (or worse, a deadline we put on ourselves as we try to mimic the aesthetic of startups from an era gone by, in search of outcomes that ultimately had very little to do with execution), what we often trade for functionality is safety, because functionality drives revenue, and safety does not. The metaphor makes the tradeoff literal - when you compromise on safety and hand your customer a squirrel burger, they're going to get sick and die.

# The Iron Ring
Recently, someone at work said that I have an almost religious approach when it comes to advocating for quality. Given that I don't even approach religion with any degree of religiosity, I felt a little bit taken aback by this remark - but, I think that they're right, and I want to talk a little bit about how I came to feel this way.

Those of you who know me know that I often refer to software engineering as "fake engineering". This a tongue-in-cheek reference to the fact the term "engineer" is one that we've sort of appropriated from the world of professional engineering as it relates to the built environment. In other words, "real engineers" are civil, structural, environmental, and geotechnical engineers and the like. In these "real engineering" fields, the link between quality and safety doesn't require a tortured food safety metaphor to make clear. 

If you cut corners on the design or construction of a bridge, at some point the bridge will collapse and you'll be found out. And so, the process of "real engineering" involves an awful lot of collaboration, review, guidelines, and regulations before you put shovels in the ground. This kind of care paid up front pays off in the long run when the bridge doesn't collapse. 

In Canada, when you receive your accreditation as a professional engineer, the tradition is to take an oath called [the Ritual of the Calling of an Engineer](https://en.wikipedia.org/wiki/Ritual_of_the_Calling_of_an_Engineer), after which you're presented with an [Iron Ring](https://en.wikipedia.org/wiki/Iron_Ring) - apocryphally, the first of such rings were made from the beams of a collapsed bridge. It's meant to be a symbol that engineering is a functional profession, but also an ethical one. The daily disturbance of wearing the ring is meant to remind you of the stakes of what you're building, and the importance of being forthwright in your work with such stakes at hand.

Admittedly, this is a pretty dour worldview - but it lives on in the licensing and continuing education requirements for professional engineers. In many countries (Canada included), by law, only licensed professional engineers may call themselves as such. And so, there do exist "real engineers" in the eyes of the law.

# The Stakes are Real
The skeptic (or worse, libertarian) reading this may react - "Leo, what does this matter for us software engineers? We're not dealing with the same level of stakes, the only thing that matters is shipping something that users like" (the libertarian may even replace "shipping something that users like" with "delivering shareholder value" 💩💩💩).

The thing is - we *do* often deal with these kinds of stakes. Here's just a few recent examples:
- [Between 1999 and 2015, more than 900 British postmasters were falsely convicted of theft and fraud on the basis of buggy software produced by Fujitsu, including 236 who were incarcerated](https://en.wikipedia.org/wiki/British_Post_Office_scandal)
- [Over a period of two months in 2022, Cigna doctors denied over 300,000 requests for payments using an algorithm, spending and average of 1.2 seconds on each case](https://www.propublica.org/article/cigna-pxdx-medical-health-insurance-rejection-claims)
- [Over 100 million Americans had their data compromised in the Change Healthcare data breach](https://www.cybersecuritydive.com/news/change-healthcare-data-breach-exposure/731009/)

Does the no-doubt immense amount of user delight and shareholder value that Fujitsu, Cigna, and Change Healthcare delivered justify these outcomes? Absolutely not; each of these episodes represent ethical failures that happen when we de-prioritize quality.

As we all know, we live in a society. 

What may be less evident is that a society is not just a group of individuals, but also the institutions and organizations that those individuals belong to, affiliate with, and participate in. In order to confront and prevent ethical failures, we must hold not just individuals, but also those institutes and organizations accountable. Functionally, this means creating rules and norms (sorry, libertarians) (Margaret Anne Pierce refers to these as ["personal, informal, and formal codes" [of ethics]](https://link.springer.com/article/10.1007/BF00380363)). It's honestly kind of aborrhent that we've come this far without any such thing coming into existence and finding at least partial consensus.

So - what is out there?
- Undeniably late, the W3C has recently released (Dec 2024) a statement on [Ethical Web Principles](https://www.w3.org/TR/ethical-web-principles/).
- The Association for Computing Machinery (ACM) has had, for some time, a [Code of Ethics and Professional Conduct](https://www.acm.org/code-of-ethics)
- The IEEE has [something similar](https://www.ieee.org/about/corporate/governance/p7-8.html)
- The League of Professional Systems Administrators [has one too](https://lopsa.org/CodeofEthics)

I encourage you to try and create your own formal systems for personal ethics, and, if needed, raise hell to get your own organizations and institutions to adopt one, or simply consider ethics in their decision-making processes.
