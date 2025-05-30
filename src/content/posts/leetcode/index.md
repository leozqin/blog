---
title: "Leetcode doesn't serve anybody well"
date: 2024-09-28
slug: leetcode-doesnt-serve-anybody-well
tags:
- tech
- capitalism
---
# Leetcode doesn't actually assess skill
I've been thinking a lot about the state of skills evaluation in the tech industry. Usually, when you apply for a job, you meet with a recruiter, then the hiring manager, then you do a technical screen, and then a panel screen. Sometimes the technical screen comes before the hiring manager screen (which is a bad idea - it's not a good use of time for the candidate, because mission/vision fit should be the most important thing to look for in the market).

In my opinion, a useful technical screen should tell you if a candidate is familiar with the programming language, capable of understanding and reasoning through code that others have written, and comfortable with common tooling and abstractions that they'll regularly encounter on the job.

The most common form of technical screen uses algorithm-focused brain-teaser type questions, which for the rest of this piece we'll refer to as "Leetcode-style questions". Some common such questions are fizz-buzz, reversing a string, finding unique substrings, or inverting a binary tree. There's usually some degree of scenario that the candidate has to interpret to identify the right algorithmic solution.

Leetcode-style questions, in that form, does only one of those things that we need it to - checking for familiarity with the programming language. It doesn't even do it well, though, because the optimal strategy for passing technical screens that use these questions is to "grind" the different problems, spend your initial time figuring out which specific problem most closely applies to the assignment, and then just implement that problem from memory. Essentially, the most efficient way to solve these problems is simply to study well and memorize solutions (which is itself VERY bad for reasons that I'll discuss later).

In addition, Leetcode-style questions do not measure the ability to understand or reason about code that others have written. At best, you start with a prompt and a few tests or scaffold code, and at worst, a completely blank page. This is very unrealistic - it's exeedingly rare to start a codebase from scratch, and it's exceedingly common to have to read (sometimes bad) code that others have written to understand why certain behaviors happen. This happens all the time, and Leetcode-style questions don't evaluate competency in that skill at all. It's also sometimes hard to engage with the code when it has no external meaning; programming is meant to solve problems, and "reverse this string" is not a problem... It's a solution! I'd rather test candidates to understand if they can successfully translate a problem into a solution that they implement in code.

Finally, Leetcode-style questions are completely divorced from *frameworks*. In a healthy codebase, you're almost never coding using primitives; there is always abstraction. I'd even go so far as to argue that the *essential function* of [software] engineers is to implement and maintain abstractions. So - evaluating someones skills in the absence of abstraction can't really tell you much about how they'll perform in a real-world (with abstractions) setting. The other reason why framework is important is that they're inherently fragile; frameworks are always built on a set of assumptions (aka, an environment) - the single most common reason (ok, except maybe unnecesary meetings) for lost engineering productivity is broken environments, so a good engineer should be able to understand and quickly fix a broken environment. A self-contained test that starts with a blank page and only uses primitives simply can't tell you that.

The other thing about frameworks is that they have substantial depth backed up by their history and context - a common antipattern that inexperienced developers fall into is rolling their own version of a feature that a framework can natively support (and does better) because they don't know it exists. Evaluating skill outside of framework means you push users to implement features using primitives, which encourages this anti-pattern. I would go so far as to argue that one of the most important features of a framework is infrastructure - sometimes the optimal way to implement a feature is actually to do it out-of-band (ie, in an independent environment). Doing a low-level implementation on a blank page makes it impossible to have these discussions, which happen *all the time* in the real world.

# Leetcode outcomes are inequitable
Because the optimal strategy for Leetcode-style questions is to memorize problem-solution pairs and then use pattern recognition to identify the problem underlying the question, candidates who are good at this strategy are inevitably well-educated, recently-educated, and neurotypical or cognitively able. This means that Leetcode-style questions are inherently biased against candidates from underrepresented groups who may not have had the same access to resources or the same opportunities to learn these specific skills.

A systemic bias towards well-educated candidates is unfair because access to education has not historically been equitable, and remains inequitable to this day. It may seem obvious, but the optimal strategy of memorization and pattern recognition is not necessarily an intuitive one - but rather, it's a rational strategy if you understand how technical screens work, and it is even *explicitly taught* in some computer science programs as a career skill (essentially - teaching to the test).

This obviously has a direct benefit for the student - but if you can't get access to a computer science program that has instructors that know this, then you're at a significant disadvantage. And, as a hiring manager, it means you're excluding talented candidates from underrepresented groups. If your organization values diversity and inclusion, then this is not ok (and if your organization has displaced those values in favor of "merit", please consider going elsewhere).

Similarly, a systemic bias towards recently-educated candidates means that you're inevitably excluding candidates who are older, or have families or other commitments that make it difficult to find time to memorize and practice all the different solutions. Unsurprisingly, this dimension intersects with candidates from backgrounds that historically have had poor or unequal access to education. These things are all connected, which is why its so important to get thing right at the top-of-funnel. There's also legal peril in relying on discriminatory practices on the basis of age - in particular for candidates over the age of 40 (who, in the US, constitute a protected class).

The nature of the optimal strategy for solving Leetcode-style questions is also significantly disadvantaging for people with learning disabilities or neurodiversity. Because the ability to learn and memorize new things quickly is essential for success in Leetcode-style questions, this is a significant barrier for people with dyslexia, dyspraxia, and other learning disabilities. Similarly, testing systems that a include a time limit can be difficult for candidates with ADHD, and pair-coding exercises that focus on memorization performance can be difficult for candidates with social anxiety. Fair and useful assessments of skill *must* make accomodations for these conditions.

# So, what's the solution?
I believe that Leetcode-style questions are fundamentally flawed as a tool for evaluating technical skills. But - there's an easy and obvious alternative for assessing skills - free and open source software (FOSS)!

I think that the ideal exercise for measuring technical skill is to work on a real-world software project, and FOSS is the most accessible and well-documented way to do so. Through the course of working on a FOSS project, you'll inevitably do all three things that I believe a technical screen should do:

- First (and obviously), the ability to write meaningfully useful code will show itself in the final product
- Second, the candidate will need to understand and reason about code that others have written in order to fix bugs or contribute to the project
- Finally, every good FOSS project includes documentation about setting up tooling and environment in order to develop on the project, so this demonstrates comfort and familiarity with language-specific frameworks

I want to talk about the last point a bit - because nobody really thinks about environment maintenance and troubleshooting as a skill, but it definitely is, and it's crucial to being productive as a [software] engineer. I've literally never had a technical screen ask me to demonstrate that I know how to use `git`, or manage language versions, or use a toolchain to build projects - and yet, I've met plenty of developers who struggle with that. I think it's a skill that can only be taught by doing, but the only version of it that you can learn in a classroom is "how to follow instructions". Software environment frameworks have achieved such a level of complexity that they require *critical thinking* to troubleshoot and repair (I'm not entirely convinced that this is a good thing, but it is what it is).

So, using this framework, I think that we can create a reasonable, sustainable, and just set of expectations for technical screens. First, find a FOSS project that is well-documented and a mature development toolchain. I think that you can then tailor the challenge depending on the level that you're hiring at:

1. Junior level - install the library, and use this library in a small script, explain what it does, and why it provides a useful abstraction. Don't worry about the environment, toolchain, or packaging.
2. Mid-level - build a development environment for the project and make a small code change that improves quality or function. Explain why this change improves quality or function. Don't worry about contributing it back to the project.
3. Senior-level - take on a "Good First Issue" for the project, and explain your rationale for implementing the solution the way you did. If you're feeling ambitious, try to contribute it back to the project.
4. Staff+ - take on a less obvious or more difficult issue for the project (or one that improves the toolchain or development process), and explain the rationale for your approach. Consider contributing your solution back to the project.

Realistically, I wouldn't put any premium on actually contributing the change back to the project, but it's more of a nice-to-have (and a win-win for the larger community). I also think it's prudent to compromise on the choice of project - most large or busy FOSS projects may not appreciate a stream of low quality proposals that never go anywhere (justifiably so). But, smaller, less projects are more likely to be receptive to contributions (and also more likely to have low hanging fruit that can be solved quickly enough in such an impermanent context).

I also think that one practical step you can take to make this work is to have candidates set up their environment before the interview and ask for some proof that they were able to execute the full toolchain before moving onto the next step. This could be a set of logs that show them successfully building the project, or a screenshot of the binary (in the case of an compiled language) or webapp running in their local environment.

# My offer to you
I believe that Leetcode-style questions are fundamentally flawed as a tool for evaluating technical skills, and I think that working with FOSS is a much better way to assess skills, so I am going to put my money where my mouth is, in this regard.

**First** - as a hiring manager in general, you may use [Precis](https://github.com/leozqin/precis) as the basis for a technical screen in the spirit of what I have described, and I will correspond with you [by email](/contact) about the structure of the exercise if you desire. I will also give sincere consideration to any PRs you create to contribute changes back to the project. 

*Optionally*, if the code associated with the pair-coding session makes it into the main branch, I will include a shout-out for both the original developer and either you or your organization (or both) in the merge request and release notes. If you want this, please mention this post in the Pull Request, or [send me an email](/contact) with a heads up that the PR is coming.

**Second** - as a hiring manager in general, I will correspond with you [by email](/contact) to help you design a technical screen based on the principles I have outlined in this document, even if Precis is not suitable for your needs.

**Finally** - as a prospective hiring manager for MYSELF, I will use the principles I have outlined in this document to facilitate a technical screen for my own hiring process, which will contain the following steps (subject to your feedback, of course):

1. An architecture review that includes explanations of how the project works, what technologies it uses, and the tradeoffs inherent to those decisions
2. A pair-coding session where I pick (with your feedback) an issue in the Precis backlog and implement as much of it as I can in the time available (this step is eligible for the optional shoutout)

Let's face it - in their current form, technical screens are neither engaging nor useful (and are more gatekeeping than anything) but they don't have to be that way. We just have to think critically about what purpose they're meant to serve, and work outward from that point. With few exceptions, modern tech companies are built on the back of free and open source software, and I think that this is one of the ways that we can address historical inequities and actually hire better talent at the same time as starting the flywheel to keep FOSS sustainable indefinitely (from which we all benefit).
