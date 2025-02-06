---
title: "The HHKB Studio, a month on"
date: 2024-07-21
slug: hhkb-studio-pt-2
tags:
- tech
- gear
- review
---
I've had the [HHKB Studio](../hhkb_studio/) for about a month now. I've been using it as the main keyboard for my Mac Mini, which I primarily use for coding personal projects, such as this website. Indeed, over the course of the month I used the keyboard to build the first iteration of the backend for [venmo-calculator](https://github.com/leozqin/venmo-calculator/tree/main) as well as the redesign of the theme for my blog (more details on that coming soon). Some takeaways and learnings of mine...

# Trackpoints don't make sense anymore
I hate to say it, but I didn't really enjoy the trackpoint experience of the HHKB Studio, and its caused me to re-evaluate my relationship with trackpoints on my other devices. Indeed, I now find the touchpad to be more enjoyable for laptops, and prefer either a standard or thumb-ball mouse for desktop experiences. 

The most likely reason for this change, I think, is simply that touchpads and mice have gotten better. Especially pre-Windows 8.1, touchpads were not very good. Driver problems were very common, and your mileage largely depended on who made your touchpad.

However - in Windows 8.1 Microsoft implemented the [Precision Touchpad](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/touchpad-implementation-guide) device type. Notably, unlike previous touchpads, the Precision Touchpad protocol allowed touchpad devices to communicate directly with Windows. This legacy lives on today, as pretty much all touchpads supported by Windows are implemented using this protocol.

The main expection to this pattern is Bluetooth touchpads - and I've tried a few different instances of these, and none of them are very good. Unfortunately, it is apparent that the processing needed to produce high quality inputs from touchpads is higher than what the Bluetooth radio protocol can support.

All of this is to say (or perhaps, provide excuse) that about three weeks ago, I gave up on the Trackpoint of the HHKB and started using a Logitech MX Master 3S. It's a very attractive device, with soft touch material and silenced click sound, but still good tactility.

# Pick the switches you want to use
The major departure of the HHKB Studio, of course, is that it uses hotswappable Cherry MX-style switches instead of the Topre membrane-based switches that the HHKB is known for. I was lukewarm on the default linear switches from the start, but I found that my enjoyment of the HHKB Studio really grew when I swapped them out for Gamakay Mars tactile switches. I picked them because they had similar actuation property as the Cherry MX Clears, which I have historically preferred.

However - of course, the beauty of having broad, uncomplicated hotswap support is that you can choose the switch that works for you. We've come a very long way from the early days of mechanical keyboards where only a few different types of switches were available. Indeed - there are numerous switch choices.

One last thing to mention about switches is that I was very concerned whether the Gamakay switches would be able to clear the bottom part of the trackpoint stick. The default switches appear to be specially designed not to interfere with the trackpoint stick (as are the G,H, and B keycaps in QWERTY layout). However, this ended up not being a problem for the Gamakay switches. They have a slightly wide lip where the switch locks in to the plate than do the stock switches, so your mileage may vary with other switches, but I can say that Gamakay switches (at least, their planet line), ought to fit.

# Was it worth it?
All this being said, do I think that the HHKB Studio is worth it if you're not a psycho for the Trackpoint?

Probably not - if you're looking for a HHKB layout keyboard that can support hotswappable switches, the Tokyo60 is right there. As previously stated, I also don't find the Touch Zones to be very useful, and I think that Tokyo60 fills the same niche for a lower price point, and broader keyswitch compatibility since it doesn't have to make room for the trackpoint.

If there is one thing going to the HHKB Studio, the software that PFU produces for configuring keymaps and layers is pretty good. But - surely similar software exists for QMK? And also, I don't find myself modifying the keymap very often.

The one differentiator, I think, that the HHKB Studio can provide compared to the Tokyo60 is that it is wireless. Albeit, wireless powered by no fewer than 4 AAA batteries. To some degree, I appreciate the fact that the battery will never wear down the way that lithium ions tend to, but the duty cycle for keyboards is way different than the same for laptops. So - perhaps the tradeoff is worth it.

All in all, I think I would generalize my feelings about the keyboard as "it's a competent keyboard, but its quirks make it hard to justify the price, and its inbuilt oddities (trackpoint, touch zones, etc..) aren't quite fun enough to overcome that".
