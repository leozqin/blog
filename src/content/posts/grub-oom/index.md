---
title: "Troubleshooting Grub Out of Memory (OOM) errors"
date: 2025-01-29
slug: grub-out-of-memory-linux
tags:
- tech
- linux
- tech-support
---
# TL;DR
If you have a HP laptop and you're getting Out of Memory errors when trying to start Grub, turn down the Video Memory BIOS setting to 128 MB or lower. Source: [Stack Overflow](https://askubuntu.com/a/1434876).

# Adventures in Live CDs

Buckle in, y'all - this is one of those blog posts that has actual information, not just my opinion or some personal recounting of an experience. Hopefully, the fine-tuned SEO excellence of my blog (in jest) will help to boost this information up to the top, to help others figure this out sooner than I did.

I spent a good part of this afternoon distro-hopping, as I am wont to do. I have an underutilized HP Zbook Firefly 14 G8. This is my designated distro-hopping laptop ([the Thinkpad being dedicated to NixOS](/posts/the-nix-mania-has-taken-hold-i-fear)). As of late, I've been running Ubuntu Oracular on it (mostly to try out Oracular, being the new thing).

However, I felt the time had come to try something new, and I was drawn again to try out Arch. Now, famously, I have [a history of being unsuccessful at running Arch](/posts/adventures-in-virtualization), so much so that [I reference it in my Mastodon profile](https://fedi.gremlin.work/@arch). Again, I gave EndeavourOS a shot - but this time I tried something new; I loaded the ISO onto a USB stick that had been flashed with Ventoy.

I was pretty excited to try Ventoy; on account of distro-hopping I quite regularly image over various USB keys. It would be much easier to simply drop the ISOs onto the key and let Ventoy take care of it. It was at this point that I realized the 32GB USB key I was using was actually USB 2.0.

# Disaster Strikes

Anyway, I digress - when I booted into Ventoy and chose the ISO I wanted to mount, I was suddenly greeted with this error:

```bash
error: ../../grub-core/kern/mm.c:376:out of memory.
Press any key to continue...
```

Pressing the key did in fact allow it to continue, but it quickly failed to mount the initramfs. So - the OOM error was legit. What's happening here?

I did some quick Googling and found a thread saying that Ventoy is usually fine, but it sometimes misbehaves, and it seems more likely to do so with Arch-based distributions. Fine, ok - I went back and imaged the USB stick directly with EndeavourOS. It was then successful at booting the Live Image and subsequently installing the OS.

# Yet another misadventure on Arch.
So, that's all well and good, it was Ventoy's fault, right? Well, not exactly... as has been my habit, I hit a showstopping issue with Arch - my root password got messed up somehow, and I ended up locking myself out of the PC.

I gave up on Arch (for today! Someday I'll make Arch work, someday!!) and shifted to [Ultramarine Linux](https://ultramarine-linux.org/) - a Fedora spin that prioritizes usability. I had previously tried it during my virtualization exploration and found it enjoyable. However, I find that I tend to use VMs by SSH more often than RDP, and Ultramarine in particular uses `zsh` with an autocomplete extension, which doesn't play nicely over SSH.

All the more reason to give it a shot on bare metal! I imaged the USB key, booted it up, and... got the same OOM error!

# The Root Cause
So, it had nothing to do with Ventoy! Back to Google... the main things I found about this error had to do with VRAM; apparently, setting the resolution of the bootloader smaller helped to resolve the issue for some people. 

But then - I found what I was looking for - a [Stack Overflow thread saying that there's a BIOS setting for VRAM](https://askubuntu.com/questions/1404415/ubuntu-22-04-live-usb-fails-reports-out-of-memory-with-no-details-even-after) that can be as high as 512MB, but is unnecessary to be that high.

**WE HAVE A WINNER!** 

Turning this setting down to 128MB allowed Ultramarine Linux to boot to the Live CD. It appears I also owe Ventoy an apology - it makes complete sense that its initramfs is probably a little too big for grub to boot, since it's doing quite a bit more than a typical initramfs. Good to know that I'll be able to give Ventoy another try now (this time with a USB 3.0 USB drive!).

I'm pretty sure that the BIOS VRAM setting only affects the VRAM allocated to initramfs and any software that needs to run off of it - so, it actually doesn't have any effect on graphics performance. Indeed, I can see post-boot that my integrated graphics card has allocated itself 256MB of RAM, out of 32GB available.
