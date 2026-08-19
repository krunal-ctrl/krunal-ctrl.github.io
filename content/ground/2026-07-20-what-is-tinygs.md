---
layout: post
title: "What Is TinyGS? A DIY Satellite Ground Station Explainer"
category: "Orbit & RF Explainer"
date: 2026-07-20
satellite: ""
norad_id: ""
frequency: "433 MHz"
experiment_id: "KS14NM-EXP-001"
excerpt: "TinyGS explained: what it is, how the global ground station network works, and why it's the easiest entry point into satellite RF."
cover_image: "/assets/img/posts/what-is-tinygs-cover.png"
keywords: "what is tinyGS, satellite ground station, DIY ground station"
---

## The hook

A $15 ESP32 board and a whip antenna is enough to start receiving telemetry
from satellites in low Earth orbit. That's the whole pitch behind **TinyGS**.

## The problem

Building a ground station from scratch means solving antenna design, SDR
signal chains, decoding protocols, and orbit prediction all at once — a wall
most beginners bounce off before they hear a single beep from orbit.

## What TinyGS actually is

TinyGS is an open-source, crowdsourced network of low-cost satellite ground
stations. Each station is a small microcontroller (ESP32 or similar) paired
with a LoRa-capable radio module, running firmware that:

- Tracks satellite passes using onboard orbit propagation (SGP4)
- Tunes to known satellite downlink frequencies automatically
- Decodes telemetry and forwards it to a shared community dashboard

Anyone running a station contributes to a global map of satellite coverage —
your receiver in the backyard becomes one node in a distributed antenna
array spanning the planet.

## Hardware overview

Minimum viable station:

- ESP32 dev board (Heltec, TTGO, or similar with SX127x/SX126x LoRa chip)
- 433 MHz antenna (a simple quarter-wave whip works to start)
- USB power
- Wi-Fi for uplink to the TinyGS dashboard

## Signal path

```
Satellite (433 MHz downlink)
   -> Antenna
   -> LoRa radio module (SX127x)
   -> ESP32 (TinyGS firmware, SGP4 tracking)
   -> Wi-Fi
   -> TinyGS dashboard (community-wide)
```

## Build & config

Flashing TinyGS firmware is a browser-based process — no local toolchain
required for the first flash. Configuration covers station location
(lat/lon/elevation), Wi-Fi credentials, and which satellites to prioritize.

## Result

First successful decode: a beacon packet from a NOAA-class satellite,
visible on the dashboard within minutes of flashing.

## Key learning

Station **location accuracy matters more than antenna gain** at this stage —
a few hundred meters of lat/lon error throws off Doppler correction on
low-pass satellites enough to miss weak signals entirely.

## What's next

Next up: the physical ground station setup — mounting, grounding, and cable
runs, once that build is documented.
