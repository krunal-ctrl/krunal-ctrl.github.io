/**
 * Named spring presets, mirroring the Apple "Designing Fluid Interfaces" damping/response
 * table via Motion's bounce/duration spring API (bounce 0 == damping 1.0, critically damped).
 */

export const SPRING_UI = { type: 'spring', bounce: 0, duration: 0.4 } as const;

export const SPRING_MOMENTUM = { type: 'spring', bounce: 0.2, duration: 0.4 } as const;
