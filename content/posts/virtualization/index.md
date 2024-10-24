---
title: "Adventures in Virtualization"
date: 2024-10-22
tags:
- tech
- games
---
Over the past week, I've been playing around virtualization. Over the course of things, I've learned a lot about virtualization, and a little about myself, too.

Let's start on the setup. I install Proxmox VE on what's theoretically my gaming PC - a Lenovo Thinkstation P520 with a 6-core, 12-thread Intel Xeon W-2135 workstation CPU and 64gb of DDR4 ECC RAM. Typical of enterprise workstation hardware, it's a bit more powerful than your average PC and memory-dense, but less so than a rack-mounted generalist server. However, the power consumption and noise level is much more tolerable than rack-mounted hardware (aside - one day, I'd like to have a house that has a dedicated server room - just a long term goal to ponder). There's room to grow too, only about half the slots are filled and the maximum RAM spec for the P520 is 512gb.

I've recently gone through a process of upgrading my hardware out of 4th and 5th gen NUCs to prioritize a small number of 11th gen or higher nodes. To that end, I'm writing this on a Thinkstation P3 Tiny with an i5-13500 (the 65W package, which happens to be the most powerful one that is confirmed unaffected by the Intel corrosion/overvoltage issue) running 65gb of DDR5 on Ubuntu 24.04 (is it finally the year of Linux on the desktop? It is for me!).

Anyway, the reason I bring up the upgrade cycle is that it left with a large number of SSDs with no application in mind. I'd been dual-booting PopOS and Windows 11 on the Proxmox host, PopOS on a NVME drive and Windows from a 1TB SATA SSD, so I opted to boot Proxmox from the NVME drive. The balance of the drive could be used for Proxmox storage - ISOs, stuff like that. For LVM storage, I'm primarily using the existing SATA SSD, but I also installed a pair of 512GB SATA SSDs that had been part of my short-lived SSD NAS unit (oh, the brief window of time where I ran networked PVCs on Kubernetes - it was slooooooow).

# The First VM: NixOS
Being the year of Linux on the Desktop, my main goal for virtualization is to try out different Linux distros. NixOS immediately stuck to me due to its whole immutability deal. Essentially, rather than use a package manager to install programs, you modify config files that interface with the `nix` package manager. The same approach applies to system adminstration - if you need a user, put it in the config file. Manage group membership? Config file.

The first thing I learned about myself is that I love this approach, because I am a sicko for composability. It took less than 20 minutes to get a meaningful core loop going, and it was pretty easy to add packages for my most-used programs, such as `neovim`, `docker`, and `direnv`. The same could be said for services - enabling `sshd` and the like was dead simple once you knew where to add them in the config.

One thing, unexpectedly, that NixOS made very easy for me actually changing desktop environments. During install, I had chosen to use Budgie, since it was a desktop I hadn't used before. However, Budgie had recently changed to use Wayland as its display server, and one that was important to me when it came to virtualization is having a desktop environment to play around in, so I was very focused on making RDP (and ideally RDP, not VNC) work. However, for whatever reason, I couldn't quite figure out how to create a new budgie-desktop session for XRDP to grab, and so while I could get the XRDP server up and running, after auth it would just drop me into the terminal. I found a few links on the internet for people that had the same problem, and they all ended up either modifying XRDP configs directly (a no-no for NixOS) or switching to another desktop.

For better or for worse, that's what I ended up doing - I reconfigured NixOS to use the Cinnamon desktop environment with just a few lines of configuration, and suddenly xrdp worked just fine. The declarativeness really shines when doing something like this - usually when you install a new desktop environment there's a bit of a decision tree you follow to figure out what packages to install, and from where. However, thanks to the approach of NixOS and the strong community support, this was abstracted away nicely.

The last thing to mention - I had originally configured the two 512gb SATA SSDs in a ZFS mirror, and encountered extreme IO waiting about 2/3 of the way through the install. As it turns out, there is not much performance benefit to ZFS when doing mirroring (in fact, once you run out of cache space it's net negative to performance). I might add a third disk and set up a RAIDZ1 and try it again, though.

# Windows 10
I had previously been running Windows 11 on my gaming PC, and I had found it competent - easy enough to tweak away the silly parts (like the search bar, or start menu in the center). But, as of late, Microsoft has become more aggressive about pushing people to use OneDrive, making it the default storage destination for documents. This is, frankly, insane and solely in the service of some product manager's OKRs. So, when I decided to build out a Windows VM, it was obvious to use Windows 10.

Switching around operating systems for my laptops, I've recently had a lot of experience with installing Windows 11 on things, so I was pleasantly surprised at how much simpler the Windows 10 installer was.

My main goal(s) for the Windows 10 VM are PCI-E Passthrough and game streaming using Sunshine. The former was fairly straightforward to accomplish - there's numerous guides on Reddit for setting up PCI-E passthrough, although nothing offical from Proxmox... I think that is an area where the documentation could improve.

The experience of setting up RDP on NixOS at this point was very helpful for achieving this goal too - I had already spent the time to ponder the costs and benefits of RDP vs VNC protocols, and I was familiar with their different eccentricities. The mental model that worked well for me was to think about VNC essentially as a stream of screenshots that get compressed and sent over the network (I suppose you could say the same about any form of video, actually). 

I encountered two (and a half, you'll see) wrinkles getting game streaming to work - the first was that I needed to have a display plugged into the video card, which seems odd until you remember that Sunshine is VNC-like in how it operates, so it needs a "display" that is bound to the GPU that you're passing through. Simple enough, apparently this kind of thing is quite normal to do for crypto-miners so there are numerous very inexpensive options for HDMI stubs out there. 

The second wrinkle that I encountered was that an RDP connection would mess up the display state and prevent Sunshine from streaming the right screen. This one I chalk up more to eccentricity on the part of Sunshine than an issue with how RDP works, but it was easy-ish to just use VNC for most of my Windows stuff instead (although, admittedly the quality of using VNC is not as good as RDP - if I ever have an ongoing need to use the windows VM for non-gaming things I may set up a separate one to use RDP on).

So, remember the second-and-a-half wrinkle? The deal with that one is that it's weirdly hard to identify a standalone VNC server for Windows that is also FOSS and modern. RealVNC works extremely well, but their salespeople are also all over me, which I do not appreciate. The other thing I noticed is that many VNC solutions want to host a centralized server for authentication and registration; this is fine, but I don't really need that since I'll only be accessing these over my LAN (at worst, I'd use Tailscale for ingress). I ended using TightVNC and it works fine with Reminna (on Ubuntu).

Speaking of Sunshine - quite impressed, it worked very well! The streaming quality was quite good, and I can really crank the settings because the main client I use and the windows VM have physical network continuity (some sections of my network are connected via mesh WiFi, which is still reasonably fast compared to the internet). I was able to play a few games like Civilation V and Backyard Baseball 97.

# EndeavourOS (EOS)
Unfortunately, this one was a false start - I wanted to try a distro based on Arch, as well as one that used KDE, and EOS was known for being more user-friendly. Of course, Arch has a reputation being not at all user-friendly, and I encountered that almost immediately. The main problem was that I wanted to set up RDP, and KRDP seemed to be the right way to do it, but the EOS version I was using had recently transitioned its display server to Wayland - and KRDP <> Wayland didn't quite work like I expected.

I also definitely did encounter the famed not-very-user-friendliness of Arch; since I was trying to KRDP to work, when trying to install different packages, it would often fail for seemingly no reason, and without a useful error message. It clicked to me when I read somewhere that `yay` was very particular the casing of your inputs. That is, when it asks for user input, it'll usually display something `proceed with operation? (Y/n)` - and if you didn't actually put an uppercase Y then it would fail. I've definitely seen cased option choices before that I just disregard and provide uncased input, and it's always worked. I think my impression of Arch is that it heavily prioritizes properness, and accepting a lowercase `y` when you specified an uppercase `Y` is certainly not proper.... but isn't there some place to compromise on this one? I've always understood the reason why for the `Y/n` convention was simply to provide visual distinction between the two options, not to be taken literally.

The other thing I found curious about the Arch community is that about 50% of them suggested using an AUR helper like `yay`, which was built into EOS, but the other 50% were of the opinion that using AUR helpers just caused more problems than they're worth. It's an odd place to be, but the less than 25% success rate that I had with installing AUR packages using `yay` leads me to believe that they might be onto something.

If the interfaces were less meaninglessly picky and the error messages more useful, I like to think that I could have made EOS stick.

# Ultramarine Linux
After EOS, I wanted to try another Linux variant, and I ended up trying Ultramarine Linux, which is based on Fedora. Having worked extensively with EC2 I already had some familiarity with Fedora and the `yum` package manager, and I was excited because Fedora is known for stability.

I ended up choosing Ultramarine because it had a built-in XFCE desktop option (again, trying to find diversity in distro and desktop), and it also shipped with the `starship` terminal shell prompt and `zsh` as the default shell - I have used `starship` before and I like it. I don't have any particular affinity towards `zsh` other than using it basically interchangeably with bash in Mac environments, but I like that it was a little different. Perhaps the next distro I try will be one that defaults to `fish`!

The install went smooth, and XFCE uses X11, so all I had to do was set up XRDP, which I've done numerous times at this point. Easy and smooth!

# Honorable Mention: MacOS
I didn't virtualize this one (although I hear that you can), but one of the implications of the Year of Linux on the Desktop is moving my Mac Mini (2018) into a semi-retired state. Macs have built-in VNC support, so I opted to go that direction - however, because of how VNC worked, I didn't have much control over the resolution of the default display that it generated. And, the default display was quite small - like the Proxmox node, the Mac Mini is physically networked to my Ubuntu client, so we can really crank the bandwidth.

The best solution ended up being to use Better Display to create a virtual display. I had already been using Better Display for some other things, so I went ahead and purchased the pro version (a one-time purchase, rare and uncomplicated in this day and age...). Being a virtual display (and because VNC doesn't support dynamic resolution unlike RDP), I opted to set up my Mac Mini with a display that would be exactly half the width of my 21:9 widescreen, equivalent to 10.5:9 or 21:18 aspect ratio. I've always been lightly (heavily) nostalgic for the 4:3 displays of yesteryear, so this was a great aspect ratio.

# Next Up
I have a variety of things that I eventually want to do with virtualization - eventually, I'd like to move my main docker host into a virtualized environment, instead of the massively overprovisioned bare metal that it's currently running on. Or, perhaps that machine will become the virtualization node and I'll keep running docker on bare metal (probably Ubuntu, if I had to do it again, it's currently running on Debian).

I definitely want to keep on trying out new linux distros, it's nice to be able to have a variety at hand; if any readers know of a distro that defaults `fish` shell and uses KDE, let me know! Especially if that KDE already has RDP built-in.

I also want to learn more about bootstrapping and initialization - the obvious next thing to try once you have a virtualized environment is to build a dev environment, and I'd love to be able to distribute SSH keys and stuff automatically.