---
title: Turning a ReMarkable 2 into a competent eReader
slug: remarkable-2-ereader
date: 2025-03-16
tags:
- tech
- books
- linux
---
I've always had an inconsistent pace when it comes to reading. When I started playing around tablet hardware, it occurred to me quite quickly that the main thing that I would be doing with them in reading. But yet, I found that motivation and excitement for reading came in fits and starts. I'd take long breaks without reading, but then quickly read numerous books, typically when I travelled.

As of late, however, I've been able to settle into a steadier reading cadence. One thing that has helped is that I've recently acquired a ReMarkable 2 (RM2) - an e-ink tablet. While by no means should I solely credit a device with helping to find a groove in reading (indeed, I'd wager that my exit from social media and the resultant (yet rare in this day and age) boredom plays the biggest role), I do find that getting it setup correctly took a little bit doing.

This year's year-end roundup of my favorite books will likely be one for the ages, but this piece is actually about how I setup the ReMarkable 2 to serve as an eReader, when it very much was not designed to do that.

# Ingress and Egress
The path of least resistance for getting files onto the device is to use their cloud service. Barring that (and I eagerly barred it), there's also a web application that you can access when plugged into the device that lets you upload and manage files.

This web app is... not good. There is no visual feedback at all to let you know when an upload has finished, except for the page reloading. The upload speed is itself VERY slow, and often times out when you're uploading multiple files. Indeed, the web app must be running single-threaded, because when you're uploading a file, the whole interface locks up, eventually times out, and then refuses to reload. Sometimes, it also leaks JSON responses from the app into the browser. So, there's definitely a security dimension to this application that is very concerning, except for the fact that it only runs when you're physically connected to the device. If you can achieve physical access to the device, then all bets are off, I suppose.

# The Software
The default software of the RM2, called Xochitl, is (from reading around online) a GTK app that can directly manipulate the framebuffer, but also happens to lock out others from using the framebuffer at the same time.

It also, for our purposes, happens to be designed with notetaking in mind, and is NOT very usable for simple reading purposes. The main problem is that you have very little control over gesture detection and what those gestures do. In particular, for reading, you have to do a veeeeeery long swipe to get it to advance pages, which is not particularly ergonomic when you're holding the device in one hand and/or advancing pages very quickly.

It's also clear that it does some kind of ePub to PDF conversion under the surface. Reflowing the text after changing something like the line spacing takes 15-30 seconds, and this makes it quite difficult to make iterative changes as you dial the interface into something that's usable for you.

# Luckily, it's Linux
Did I mention that the RM2 runs Linux? This simple fact is the saving grace of the device, because when things run Linux, someone out there is hacking it to make things work better.

The web app for file management is jank? Just `scp` your files onto the device. Xochitl isn't all that good reading? No problem, just install something else! I'll spend the rest of this piece discussing what I ended up installing, and what I had to do to make it work.

# ReMarkable EBook Reader Hacking 101
- All the good software you need can be found in [Toltec](https://toltec-dev.org/).
- To install Toltec you'll need to downgrade your software version to `3.3.2.1666` or earlier.
- Figure out how to ssh into the device, and provision it with your public key so you don't have to type the password all the time
- [Follow these instructions to downgrade your device version](https://github.com/Jayy001/codexctl/issues/95#issuecomment-2305529048)
- Then, [install Toltec](https://toltec-dev.org/#install-toltec)
- Next, install a launcher - I like draft because I found it a little more intuitive than Remux
- Finally install one or more reader programs:
    - [Plato](https://github.com/LinusCDE/plato) looks really nice and is very lightweight, but it has less control over the reading experience than I prefer - namely I prefer to have rather wide line spacing (1.70 or higher), and it only goes to 1.20.
    - [KOReader](https://github.com/koreader/koreader) is a little blocky, but it has the formatting niceties that I look for, and also has some moderately sophisticated library management features, which I appreciate.