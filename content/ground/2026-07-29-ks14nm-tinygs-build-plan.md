---
layout: post
title: "KS14NM Build Plan: A Home-Built TinyGS Ground Station"
category: "Build Log"
date: 2026-07-29
satellite: ""
norad_id: ""
frequency: "433 MHz"
experiment_id: "KS14NM-EXP-002"
excerpt: "The build plan behind KS14NM: TinyGS architecture, hardware list, and the roadmap for a home-built satellite ground station in Junagadh."
cover_image: "/assets/img/posts/ks14nm-build-plan-cover.png"
keywords: "TinyGS build plan, DIY satellite ground station, ESP32 LoRa ground station"
---

## The hook

A whip antenna, an ESP32, and a LoRa radio the size of a matchbox — that's
the entire receive chain standing between a rooftop in Junagadh and a
satellite passing 500 km overhead. Before any of it goes on the roof, it
needs a plan.

## The problem

TinyGS makes the software side approachable, but a real station still comes
down to five open questions: what hardware, what signal path, what it
actually shows you once it's running, what to build first, and what "done"
even looks like for a station that's never finished growing. This post walks
through that plan, laid out before a single antenna goes up.

## How TinyGS works

The signal path is short by design. A satellite in low Earth orbit
transmits its downlink at 433 MHz; the antenna picks it up and hands it to
an SX1278-based LoRa module (a Ra-02 in this build), which demodulates the
spread-spectrum signal. From there, an ESP32 takes over station logic —
tracking the satellite's orbit with SGP4 propagation, timing the
uplink/downlink windows, and forwarding whatever gets decoded up to the
TinyGS cloud, where it's stored, processed, and turned into something
readable. During an active pass, packets typically arrive every few
seconds, so the whole chain — antenna to cloud — has to keep up in near
real time.

## What TinyGS enables

Stripped down to fundamentals, a single station gives you four things: it
**receives** signals, **decodes** telemetry, **visualizes** the resulting
data, and — because the whole stack is open source and extensible — it
lets you build on top of any of the other three. Decoding is the
load-bearing piece of that list: everything downstream, from the dashboard
to the pass history to the shared community map, depends on getting a
clean decode first. Get that wrong and nothing else in the chain matters.

## Hardware overview — the KS14NM build plan

The parts list for this build, and the reasoning behind each piece:

- **433 MHz whip antenna** — ground-plane mounted, for RF capture at the
  satellite downlink frequency.
- **SX1278 LoRa module (Ra-02)** — handles spread-spectrum demodulation at
  433 MHz; this is the component the rest of the decode chain depends on.
- **ESP32 dev board** — runs orbit tracking (SGP4), station logic, and the
  Wi-Fi uplink to TinyGS.
- **OLED display** — a local pass/status readout, so the station doesn't
  need a laptop tethered to it to know what it's doing.
- **microSD card** — logs raw packets locally, independent of whether the
  cloud uplink is working at that moment.
- **Power supply** — sized for continuous 24/7 operation, not just test
  passes.
- **Weatherproof enclosure** — the station lives on a rooftop, so this has
  to survive actual weather, not just a desk.

A few planning notes going into rev A, before any hardware gets mounted:

- **Measure the noise floor first**, before anything is permanently
  installed. A bad noise floor reading discovered *after* mounting is far
  more expensive to diagnose than one caught on the bench.
- **Optimize power draw** early. This station is meant to run continuously,
  which is a different design target than something that only needs to
  survive a single test pass.
- **Mount on the rooftop**, and when choosing exactly where, prioritize
  clear sky visibility over convenient cable runs. Cable loss is a solvable
  problem; blocked sky isn't.

## What the live dashboard will show

Once the station is actually receiving, TinyGS's dashboard is the payoff:
signal strength over time, an orbit track plotted on a world map, current
pass information, the uplink/downlink frequencies in use, and a ground
station card reading `KS14NM, Junagadh, India`. The two numbers worth
watching most closely during any given pass are SNR — higher is
better — and, more basically, whether the pass completes cleanly at all.
That second one sounds trivial, but it's the actual bar for a first
successful contact. None of this is live yet; it's the target the rest of
this build plan is aimed at.

## Key learning (so far)

The biggest design decision in this plan isn't the antenna choice or the
radio module — it's **sequencing**. Noise floor measurement and power
budgeting have to happen *before* the rooftop mount, not after, because
both are dramatically harder to retest once the hardware is sealed inside
a weatherproof enclosure three meters up. Deciding that order now, on
paper, is a lot cheaper than re-learning it after an install.

## The journey ahead

Roughly in order, here's where this build is headed:

1. **Build Logs** — hardware assembly, enclosure, mounting
2. **Antenna Tests** — gain, noise floor, feedline loss
3. **Telemetry Captures** — first decoded packets, dashboard validation
4. **Satellite Passes** — full pass reports once the station is live
5. **Failures & Fixes** — because something will need fixing, and that's
   worth documenting as thoroughly as the wins

The plan from here is simply to document everything, including the parts
that don't work the first time around.

## Close

A home-built TinyGS station: tracking, listening, decoding. The sky isn't
the limit — it's the start. First signal coming soon.
