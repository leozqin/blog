---
title: "An adventure in sensor configuration with the nct6683 eSIO"
description: So you want to get sensor data in your P-series Thinkstation?
date: 2024-03-08
tags:
- homelab
- tech
---

Most of the posts on this blog are my opinion. The same can be said of most posts on most blogs. Sometimes, however, I like to write a blog post that does the other thing for which we use the internet: conveying and sharing information. This is one of those blogs (but not [the only one](../all-about-the-senecadata-nuc5i5mybe/))

# Homelab 2.0
Historically, my homelab has been a series of NUCs scattered around my house, connected to nodes in my mesh wifi network. It works fine, but this is obviously a pretty complex setup, and wifi backhaul is not ideal. Plus, I wanted to [do more ai things](../automating-media-diet/), so I needed some more powerful hardware, including at least one unit that was capable of accepting a GPU.

Enter the Lenovo ThinkStation P720 - my first choice for the project. Why? First, it's been my experience that enterprise workstation hardware can be excellent bang for the buck - they often have server hardware inside, and are delightfully overbuilt. In addition, I was quite familiar with the P-series, using a P520 (the smaller version) for my gaming PC.

In the depths of eBay, I found a SKU that worked for me - 2x Intel Xeon Gold 6148, 256 GB of DDR4 ECC RAM, 1TB of NVME SSD storage, and a 900W power supply for all of my GPU needs. I initially paired it with my MSI GTX 1070, but the card was too tall to allow the case to close (this is a known issue with this card), so I ended up shelling out for a Zotac RTX 3060 - undeniably an upgrade, and a pretty good value!

All this being, I was pretty excited to take delivery. I unpacked it, installed a graphics card, plugged it, and... was blown away (no pun intended) by how loud it was. It seemed to me that every fan was running full bore, and wouldn't ramp down, even when the machine was in an idle state with minimal workload.

# Troubleshooting

This being the case, I got in touch with the seller and started diagnosing through subtraction - was there any particular fan that was going crazy? I took out the case fans - still loud. I took out the RAM fans - still loud. I bought a set of Noctua NA-FC1 PWM fan controllers and ramped down the CPU fans... the PSU fan was cranking away! So, something was systemically wrong and, although this was my intuition from the start, this was somewhat difficult to explain to the seller without any sensor readings, and when it come to diagnostics, the Lenovo diagnostic suite was not very adept at testing fan control.

So, what about those sensor readings?

Well, from the Mystery NUCs I had garnered some experience with diagnosing fan control and thermals problems; I knew that the tool of choice for viewing sensor state is `lm-sensors`. However, when I looked into `lm-sensors`, I could see only what I already knew - that the CPU temps were outrageously low for the perceived duty cycle of the fans. From the specs of the individual fans, I could tell that they *were* designed for PWM control, but whatever controlled the fans was freaking out.

That brought me down the road of software updates - namely the BIOS and eSIO chips, the latter of which is in charge for a variety of system functions, including fan control. Since I was deploying Debian, I ended up doing a  EFI shell upgrade for these two components; the BIOS version I was on was so old that Linux capsule updates weren't supported! And yet, after upgrading, the fans remained loud.

From some Googling (Lenovo's own consumer documentation was not very good), I found that the eSIO chip was a Nuvoton NCT6683-compatible unit, which has been around for quite some time, but is also [notably opaque and proprietary in its specification](https://docs.kernel.org/hwmon/nct6683.html), and this made writing to it too risky to support in the Linux kernel. Bummer - userspace fan control wouldn't be an option.

I did, however, manage to get Linux to actually read data from the chip. To do this, I had to:
1. force the kernel module to load by adding a config file to `etc/modprobe.d/` - `echo "options nct6683 force=1" >> /etc/modprobe.d/sensors.conf`
2. set `GRUB_CMDLINE_LINUX="acpi_enforce_resources=lax"` in `etc/default/grub`

The combination of these two changes allowed me to finally get some meaningful data from `lm-sensors` about fan state - and this helped me to ultimately figure out what what was going on! Do you see something unusual in the thermal sensor readings here?

```
Thermistor 7:    +25.0°C  (low  =  +0.0°C)
                          (high =  +0.0°C, hyst =  +0.0°C)
                          (crit =  +0.0°C)  sensor = thermistor
Thermistor 5:    +25.5°C  (low  =  +0.0°C)
                          (high =  +0.0°C, hyst =  +0.0°C)
                          (crit =  +0.0°C)  sensor = thermistor
Thermistor 6:    +23.0°C  (low  =  +0.0°C)
                          (high =  +0.0°C, hyst =  +0.0°C)
                          (crit =  +0.0°C)  sensor = thermistor
Diode 2 (curr): +120.5°C  (low  =  +0.0°C)
                          (high =  +0.0°C, hyst =  +0.0°C)
                          (crit =  +0.0°C)  sensor = thermal diode
```

Yeah - `Diode 2` is running SUPER hot. So hot, in fact, that it can't possibly be returning an accurate reading given the other temperatures. 

And this was, in fact the case - on the advice of the perennially helpful [Lenovo Community Forums](https://forums.lenovo.com/t5/ThinkStation-Workstations/P720-Loud-high-fan-speeds-mystery-diode-sensor/m-p/5295398) I found that the ambient air sensor was present, but unplugged and tucked into its housing during the build process, and they never plugged it back! I plugged in back in, and problem solved!

# Things I Learned
What an ordeal. Sometimes, all a girl wants is 2 CPUS with 40 cores and 80 threads of compute and has to deal with hardware sensors. I'm also pretty sure I threw out my back moving the behemoth of a case around my house. Glad it's all over. This is the part where we memorialize learnings for future readers and search engines (remember how this blog was supposedly about sharing and conveying information?)

In my Lenovo ThinkStation P720 with BIOS version S04KT69A and SIO version S04FW2039:

1. Fans 1 and 2 are the CPU1 and CPU2 fans, respectively
2. Fan 5 is the front case fan
3. Fan 7 is the rear case fan
4. Fans 6 and 9 are the DIMM fans, but I'm not sure which banks they correspond to
5. Fan 8 is likely the PSU fan, and it is capable of taking direction from the SIO chip via the blade-like connection from the PSU to the motherboard
6. Fan 3 and Fan 4 correspond to two additional fan headers that are not part of the stock configuration - their header names imply that they're meant for cooling flex bay components, but there is no obvious place to mount them inside the case. However - if you did need to expand the cooling capacity that is a place to start.

And of course, you have to do the kernel chicanery mentioned above to get sensor data from the SIO chip to show up in the first place.
