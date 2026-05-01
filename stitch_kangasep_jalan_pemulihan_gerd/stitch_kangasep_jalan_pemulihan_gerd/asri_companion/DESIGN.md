---
name: Asri Companion
colors:
  surface: '#fafaf5'
  surface-dim: '#dadad6'
  surface-bright: '#fafaf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ef'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e4'
  surface-container-highest: '#e2e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#006860'
  on-tertiary: '#ffffff'
  tertiary-container: '#248279'
  on-tertiary-container: '#f3fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#9cf2e8'
  tertiary-fixed-dim: '#80d5cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504a'
  background: '#fafaf5'
  on-background: '#1a1c19'
  surface-variant: '#e2e3de'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  section-gap: 40px
  touch-target-min: 48px
---

# Design System: Asri Companion

## Brand & Style

The design system is rooted in the concept of *Lambung Tenang* (Serenity) and the supportive presence of a *Kakak* (Elder Sibling). It serves Indonesian Muslim adults navigating the physical discomfort of GERD and the emotional weight of anxiety. The brand personality is deeply empathetic, patient, and culturally resonant, eschewing the sterile nature of traditional medical apps for a "digital sanctuary" feel.

The visual style is a fusion of **Modern Minimalism** and **Tactile Softness**. It prioritizes a reduction in cognitive load by maintaining high whitespace and a maximum of two focal points per screen. To honor the cultural context, the design system integrates subtle, non-distracting arabesque patterns as low-contrast background textures and uses geometric crescent shapes as decorative framing elements. The interaction model is intentional and slow, fostering a sense of safety and steady healing.

## Colors

The palette is designed to lower the heart rate and soothe the digestive system.

- **Primary Teal (#0D9488):** Represents health and spiritual balance. Used for primary actions and steady-state indicators.
- **Primary Dark (#0F766E):** Reserved for headings and sophisticated accents. This replaces red for all "high-attention" states to avoid triggering anxiety.
- **Warm Amber (#F59E0B):** A "glow" color used sparingly to highlight progress, hope, and morning reflections.
- **Soft Cream (#FAFAF5):** The primary canvas color, chosen to reduce screen glare and provide a more organic, paper-like feel than pure white.
- **Surface White (#FFFFFF):** Used exclusively for elevated cards to create clear separation from the background.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, open counters and modern Indonesian heritage. The type scale is intentionally large to accommodate users who may be experiencing blurred vision or dizziness during anxiety or GERD flare-ups.

Line height is set to a generous 1.6 for body text to ensure maximum readability and a "breathing" layout. Headings use the Primary Dark tone to establish a clear, authoritative yet gentle hierarchy. All text blocks are capped at a comfortable reading width to prevent eye fatigue.

## Layout & Spacing

The layout follows a **fluid grid** model with significant emphasis on safe margins. A standard 24px horizontal padding is applied to all mobile screens to ensure content feels "tucked in" and secure.

Spacing follows an 8px rhythmic scale. However, sections are separated by "Generous Air" (40px+) to ensure no more than two focal points are visible at once, preventing the user from feeling overwhelmed. Touch targets are strictly maintained at a minimum of 48x48px to accommodate users who may have tremors or decreased motor precision during a health episode.

## Elevation & Depth

Visual hierarchy is conveyed through **Tonal Layers** and **Ambient Shadows**. Instead of traditional harsh shadows, this design system uses soft, diffused shadows tinted with the Primary Dark teal (at 5-8% opacity) to create a sense of "resting" on the soft cream background.

Surface levels:

1. **Level 0 (Background):** Soft Cream #FAFAF5.
2. **Level 1 (Standard Card):** White #FFFFFF with a 4px blur shadow.
3. **Level 2 (Featured/Active Card):** White #FFFFFF with a 12px blur shadow and a subtle 1px border in a lighter tint of the Primary Teal.

Backgrounds may occasionally feature a "Watermark" depth—a very low-contrast arabesque pattern that appears to be embossed into the background rather than sitting on top.

## Shapes

The shape language is strictly **anti-sharp**. Rounded corners are used to evoke a sense of safety, comfort, and "halus" (finesse).

- **Standard Elements (Buttons, Inputs):** 16px radius.
- **Primary Cards & Containers:** 24px radius.
- **Crescent Accents:** Used as decorative masks for imagery or as subtle corner flourishes to reinforce the Muslim context.
- **Progress Indicators:** Soft, rounded caps on all bars—no squared-off edges.

## Components

### Buttons

Primary buttons are solid Primary Teal with white text and 16px corners. Secondary buttons use a light teal ghost style with a 1px border. No "Danger" red buttons exist; instead, use Primary Dark or neutral grays for destructive actions to maintain a calm environment.

### Cards

Cards are the primary vessel for information. Featured cards (e.g., "Prayer Times" or "Current Symptom Log") use a 24px radius and may feature a subtle Warm Amber accent on the left vertical edge to indicate "Hope/Action."

### Input Fields

Inputs use the Soft Cream background with a slightly darker stroke. The focus state is a 2px Primary Teal border. Labels always sit above the field in a 14px semi-bold weight for clarity.

### The 'Kakak' Floating Prompt

A specialized component: a small, rounded avatar or icon (the "Kakak" figure) that appears with a speech bubble for empathetic check-ins. It uses soft transitions and appears in a fixed position that doesn't obstruct content.

### Feedback & Animations

All transitions use a 300ms `ease-in-out` curve. There is a total ban on bouncing, shaking, or rapid flashing. Success states are indicated by a gentle "fill" of Teal or a soft pulse of the Warm Amber.
