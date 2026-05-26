---
name: Neo-Tokyo Cyber-Anime
colors:
  surface: '#1f0e13'
  surface-dim: '#1f0e13'
  surface-bright: '#493338'
  surface-container-lowest: '#19090d'
  surface-container-low: '#28161b'
  surface-container: '#2d1a1f'
  surface-container-high: '#382529'
  surface-container-highest: '#442f34'
  on-surface: '#fbdae0'
  on-surface-variant: '#e5bcc4'
  inverse-surface: '#fbdae0'
  inverse-on-surface: '#3f2b2f'
  outline: '#ac878f'
  outline-variant: '#5c3f45'
  surface-tint: '#ffb1c3'
  primary: '#ffb1c3'
  on-primary: '#66002c'
  primary-container: '#ff4b89'
  on-primary-container: '#590026'
  inverse-primary: '#bb0058'
  secondary: '#dcfdff'
  on-secondary: '#00373a'
  secondary-container: '#00f1fd'
  on-secondary-container: '#006a6f'
  tertiary: '#64df6e'
  on-tertiary: '#00390d'
  tertiary-container: '#22a63e'
  on-tertiary-container: '#00320a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#ffb1c3'
  on-primary-fixed: '#3f0019'
  on-primary-fixed-variant: '#8f0041'
  secondary-fixed: '#6ff6ff'
  secondary-fixed-dim: '#00dce6'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#80fc87'
  tertiary-fixed-dim: '#64df6e'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005317'
  background: '#1f0e13'
  on-background: '#fbdae0'
  surface-variant: '#442f34'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-display:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style
This design system embodies the high-energy, technical precision of modern sci-fi anime. It targets a tech-savvy audience that appreciates an "engineered" aesthetic, blending the grit of a futuristic sprawl with the vibrant, glowing energy of neon-drenched nightscapes.

The design style is a hybrid of **Cyberpunk Minimalism** and **High-Contrast Digitalism**. It utilizes sharp geometric layouts, data-heavy overlays, and luminous visual feedback to create a UI that feels like a functional heads-up display (HUD). The emotional response should be one of "controlled chaos"—urgent, powerful, and cutting-edge.

## Colors
The palette is rooted in a deep, atmospheric midnight purple to provide maximum contrast for neon accents. 

- **Primary (Neon Pink):** Used for critical interactions and brand-heavy elements.
- **Secondary (Electric Cyan):** Reserved for technical data, secondary actions, and progress indicators.
- **Accent (Anime Red):** Used sparingly for destructive actions, warnings, or high-priority alerts to evoke a classic sci-fi urgency.
- **Surface & Surface-Bright:** These define the "chassis" of the interface, creating subtle depth without breaking the dark-mode immersion.

## Typography
We utilize **Geist** exclusively to maintain a technical, developer-centric feel. 

Headlines should be bold, condensed, and set in uppercase to mimic industrial signage and digital telemetry. The `label-mono` style is used for metadata and small technical descriptors. Body text remains clean and spacious to ensure legibility against the dark, high-contrast background. All typographic elements should feel "typeset" by a machine.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a max-width wrapper but utilizes a rigid 4px baseline grid to maintain an "engineered" alignment.

- **Grid:** A 12-column system is used for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** Spacing between technical modules should be tight (16px - 24px) to simulate a dense information environment, while larger sections use generous margins (64px+) to prevent visual fatigue.
- **Overlays:** Use subtle 1px borders to define regions rather than relying on large gaps, emphasizing the "panel-based" construction of the UI.

## Elevation & Depth
Depth is created through **Luminous Layers** rather than traditional shadows.

1.  **Base Layer:** The Deep Midnight Purple (`#0d0221`) background.
2.  **Panel Layer:** Surface-Bright (`#1a0b3c`) with a 1px border in a slightly lighter purple or dimmed cyan.
3.  **Active Layer:** Elements that sit "above" the UI do not use soft shadows; instead, they use thin, high-contrast outlines and "Glow Drops"—a semi-transparent neon outer glow (`box-shadow: 0 0 15px rgba(255, 0, 122, 0.4)`).
4.  **Visual Texture:** Incorporate a subtle scanline overlay (0.03 opacity) across the entire viewport to ground the digital aesthetic.

## Shapes
The shape language is primarily **Sharp & Geometric**. 

While a base radius of 4px is used to ensure the UI feels modern and polished, specific elements like primary buttons or "data chips" should feature 45-degree clipped corners (chamfers) to lean into the mecha/tech aesthetic. Containers should feel like solid slabs or digital modules.

## Components
- **Buttons:** Primary buttons use the Neon Pink background with white text and a matching pink glow. Secondary buttons use a 1px Electric Cyan border and a subtle "hover-fill" effect.
- **Input Fields:** Dark backgrounds with a 1px border. On focus, the border turns Electric Cyan, and a small technical label (e.g., "SYS_INPUT_01") appears in the corner in the `label-mono` style.
- **Cards:** Use Surface-Bright with a top-accent border of 2px in Primary or Secondary colors. Backgrounds may feature a subtle dot-grid pattern.
- **Chips/Status:** Small, pill-shaped or rectangular indicators with high-saturation backgrounds. Use "Blinking" animations for active "LIVE" or "REC" statuses.
- **Progress Bars:** Segmented bars rather than smooth fills to emphasize the "mechanical" nature of the system.
- **Icons:** Use 1.5px stroke weight linework. When active, icons should gain a subtle glow matching their functional color.