---
phase: ui-restyle
slug: clean-2d-medical-wellness
status: approved
shadcn_initialized: false
preset: none
created: 2026-05-01
---

# Lambung Tenang — UI Design Contract

## "Clean 2D Digital Vector" Medical-Wellness Aesthetic

> Visual and interaction contract for the full Lambung Tenang UI restyle.
> Reference visual: Kang Asep bio/linktree page (circular logo, stacked rounded cards, chevron arrows, deep teal CTA).
> All decisions below are LOCKED — implementers must not deviate.

---

## Design System

| Property | Value |
| :--- | :--- |
| Tool | none (Tailwind CSS v4 only) |
| Preset | clean-2d-medical-wellness |
| Component library | none (custom components) |
| Icon library | Material Symbols Outlined (already installed) |
| Font | Plus Jakarta Sans (already loaded via @theme) |
| Motion | framer-motion (already installed — use sparingly) |

---

## Visual Direction

**Aesthetic:** Clean 2D digital vector — flat, readable, calm. No gradients on main cards.
**Reference:** The Kang Asep linktree page (screenshot provided by user):

- Circular brand logo at top center
- Stacked vertical cards with icon-left + chevron-right layout
- Primary CTA card: solid `#0D5C4A` teal fill, white text
- Secondary cards: white bg, `border-slate-100`, subtle shadow
- Badge ("MOST POPULAR"): amber pill, uppercase, small

**Mood:** Medical-grade cleanliness + Islamic warmth. Think "clinic that smells like jasmine."

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
| :--- | :--- | :--- |
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing |
| lg | 24px | Section padding / card padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level top padding |

**Card vertical rhythm:** `space-y-4` (16px) between all cards in a list.
**Container:** `max-w-md mx-auto px-6` — enforced on EVERY screen.

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height | Class |
| :--- | :--- | :--- | :--- | :--- |
| Display | 28px / text-3xl | 800 / font-extrabold | 1.2 | Hero headings |
| Heading H1 | 22px / text-2xl | 700 / font-bold | 1.3 | Screen titles |
| Heading H2 | 18px / text-xl | 700 / font-bold | 1.4 | Card headings |
| Heading H3 | 15px / text-[15px] | 700 / font-bold | 1.4 | Sub-section labels |
| Body | 16px / text-base | 500 / font-medium | 1.6 | Prose content |
| Label | 14px / text-sm | 600 / font-semibold | 1.5 | Button text, nav labels |
| Caption | 11px / text-[11px] | 700 / font-bold | 1.4 | Overline, metadata |
| Micro | 10px / text-[10px] | 800 / font-black | 1.2 | Badges, uppercase tags |

**Overline style (section labels):** `text-[10px] font-black uppercase tracking-[0.2em] text-primary/60`
**Font stack:** `'Plus Jakarta Sans', -apple-system, 'Segoe UI', sans-serif` (already set in index.css)

---

## Color

| Role | Value | Usage |
| :--- | :--- | :--- |
| Dominant bg (60%) | `#FAFAF5` | Page background — warm off-white |
| Surface (30%) | `#FFFFFF` | Cards, modals, bottom nav |
| Primary brand (10%) | `#0D5C4A` | Primary CTA cards, active icons, links |
| Primary dark | `#0A4A3C` | Primary CTA hover state |
| Accent amber | `#E8A020` | XP badges, "MOST POPULAR" pill, level badges |
| Border default | `border-slate-100` | All secondary card borders |
| Border subtle | `border-slate-50` | Inner dividers, section separators |
| Text primary | `#1A1C19` | Headings, important body text |
| Text secondary | `slate-500` / `#64748B` | Body prose |
| Text muted | `slate-400` / `#94A3B8` | Captions, metadata |
| Text on-primary | `#FFFFFF` | Text on teal CTA cards |
| Destructive | `#DC2626` / red-600 | Reset button only — never for errors/info |
| SOS button | `#0A4A3C` (primary-dark) | Always visible, never red-aggressive |

**Accent (amber) reserved for:** XP display chip, badge pills ("MOST POPULAR"), level badge on profile avatar. NOT for general interactive elements.

**Gradient rule:** Phase header card on MisiScreen only. All other cards: flat white or flat teal. No gradients on HomeScreen, MateriScreen, ProfileScreen.

---

## Border Radius Contract

| Element | Class | px |
| :--- | :--- | :--- |
| Primary CTA card (full-width) | `rounded-[28px]` | 28px |
| Audio player card, content cards | `rounded-[40px]` | 40px |
| Secondary list cards (materi, profile rows) | `rounded-[28px]` | 28px |
| Icon containers (large) | `rounded-2xl` | 16px |
| Icon containers (small) | `rounded-xl` | 12px |
| Buttons (primary) | `rounded-[28px]` | 28px |
| Buttons (secondary/ghost) | `rounded-2xl` | 16px |
| Badges / pills | `rounded-full` | full |
| Bottom nav container | `rounded-t-[32px]` | 32px top-only |
| Circular avatar / logo | `rounded-full` | full |
| Input fields | `rounded-2xl` | 16px |

---

## Shadow Contract

| Level | Class | Usage |
| :--- | :--- | :--- |
| Default card | `shadow-sm` | All secondary/white cards |
| Elevated card | `shadow-md` | Featured cards, audio player |
| Primary CTA | `shadow-lg shadow-primary/20` | Main teal action button |
| Bottom nav | `shadow-[0_-8px_32px_rgba(13,148,136,0.08)]` | Bottom navigation bar |
| Modal sheet | `shadow-2xl` | Full-screen bottom sheet modal |

---

## Component Anatomy — Card Row (Linktree Style)

The core repeating unit across all list screens (MateriScreen, ProfileScreen settings):

```text
┌─────────────────────────────────────────────────────┐
│  [ ICON BOX ]  Title text                  [ › ]   │
│                Subtitle / meta                      │
└─────────────────────────────────────────────────────┘
```

**Specs:**

- Container: `w-full flex items-center gap-4 p-5 bg-white rounded-[28px] shadow-sm border border-slate-100`
- Icon box: `w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0`
- Icon: Material Symbols Outlined, text-2xl
- Text block: `flex-1 text-left`
  - Title: `text-[15px] font-bold text-slate-800 leading-tight`
  - Sub: `text-[10px] font-black text-primary/60 uppercase tracking-widest`
- Chevron: `material-symbols-outlined text-slate-300` → `chevron_right`
- Hover: `group-hover:translate-x-1 group-hover:text-primary transition-all`
- Active: `active:scale-[0.98] transition-all`

**Primary CTA variant (solid teal):**

- Container: `w-full flex items-center gap-4 p-5 bg-primary rounded-[28px] shadow-lg shadow-primary/20`
- Icon box: `w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0`
- Text: `text-[15px] font-bold text-white` + subtitle `text-white/70`
- Chevron: `text-white/70`
- Badge pill (optional): `absolute -top-3 left-5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full`

---

## Component Anatomy — Home Header

Matches the linktree reference visual (circular logo centered at top):

```text
        ┌───────────────────┐
        │   ◉ Circular Logo  │   ← w-20 h-20 rounded-full bg-primary ring-4 ring-white shadow-lg
        │   Lambung Tenang  │   ← text-xl font-bold text-slate-900 text-center
        │   tagline text    │   ← text-sm text-slate-500 text-center
        └───────────────────┘
```

- Logo circle: `w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg ring-4 ring-white`
- App name: `text-xl font-bold text-slate-900 text-center mt-4`
- Tagline: `text-sm text-slate-500 text-center leading-relaxed`

**Top App Bar (fixed, non-home screens):**

- `fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100`
- Inner: `max-w-md mx-auto px-6 py-4 flex items-center justify-between h-16`
- Logo mark: `w-8 h-8 bg-primary rounded-xl flex items-center justify-center` (left-aligned for sub-screens)

---

## Component Anatomy — Day Status Card

```text
┌─────────────────────────────────────────────────────┐
│  Hari ke-X dari 14          [  PHASE ICON BOX  ]   │
│  Fase 1: Pola Pikir                                 │
│  ████████░░░░░░░░░░░░  42%                         │
└─────────────────────────────────────────────────────┘
```

- Container: `rounded-[28px] p-6 border border-slate-100 bg-white shadow-sm`
- Phase icon box: `w-12 h-12 rounded-2xl bg-primary/5 text-primary` (when incomplete) / `bg-primary text-white` (when done)
- Progress bar track: `w-full h-2 bg-slate-100 rounded-full`
- Progress fill: `h-full bg-primary rounded-full transition-all duration-1000`

---

## Component Anatomy — Bottom Navigation Bar

- `fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-[32px] shadow-[0_-8px_32px_rgba(13,148,136,0.08)]`
- Height: `h-20`
- Inner: `max-w-md mx-auto flex justify-around items-center px-4`
- Active indicator: top pill `w-8 h-1 bg-primary rounded-full` (framer-motion layoutId)
- Active tab: `text-primary` with `font-bold` label + `FILL 1` icon variation
- Inactive: `text-slate-400` with `font-medium` label + `FILL 0`

---

## Component Anatomy — SOS Button

- Position: Always in top-right of every top app bar
- Style: `w-9 h-9 bg-primary-dark text-white rounded-xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all`
- Text: `SOS` (uppercase, font-black)
- NEVER use red background (anxiety-inducing). Use `primary-dark` (#0A4A3C).

---

## Copywriting Contract

| Element | Copy |
| :--- | :--- |
| Primary CTA (day not done) | "Mulai Ikhtiar Hari Ini" |
| Primary CTA (day done) | "Lihat Ikhtiar Hari Ini" |
| Secondary CTA | "Isi Jurnal Langsung" |
| Lesson completion | "Alhamdulillah, Selesai Belajar →" |
| Material close | "Saya Mengerti, Bismillah" |
| Day skipped greeting | "Kamu kembali, itu sudah hebat 💛" |
| Audio fallback | "Voice note sedang disiapkan — baca dulu ya 🌿" |
| Empty search state heading | "Topik tidak ditemukan." |
| Empty search state body | (italic, slate-400) |
| Journal saved confirmation | "MasyaAllah, misi hari ini sudah selesai. Istirahat dengan tenang ya 💚" |
| Reset confirmation | "Reset Seluruh Data" + confirm 2x modal |
| Destructive confirm copy | "Yakin? Data akan hilang permanen." + "Konfirmasi Hapus" |
| Backup action | "Amankan Jurnal (Backup)" |
| Footer tagline | "Lambung Tenang · Ikhtiar Membawa Pulih" |
| Profile card | "[Name]" / "Pejuang" (if no name) |

**Tone rules (WAJIB):**

- Never blame the user for skipping or relapsing
- Always validate before instructing
- Islamic expressions natural, not forced
- Never call Walmagh "obat" or claim cure

---

## Interaction & Animation Contract

| Interaction | Class / Behavior |
| :--- | :--- |
| Button press | `active:scale-95 transition-all` (200ms) |
| Card press | `active:scale-[0.98] transition-all` |
| Icon press | `active:scale-90 transition-all` |
| Card hover (desktop) | `hover:border-teal-100 hover:shadow-md` |
| Chevron on hover | `group-hover:translate-x-1 group-hover:text-primary` |
| Icon on card hover | `group-hover:bg-primary group-hover:text-white transition-all` |
| Screen entry | `animate-in fade-in duration-500` (already in index.css) |
| Bottom nav active | framer-motion `layoutId="activeNav"` spring transition |
| Progress bar | `transition-all duration-1000` |
| Modal entry | `slide-in-from-bottom-full duration-500` |
| Loading state | Skeleton screen (slate-100 pulse blocks) — NEVER spinner |
| Error color | Teal-dark + icon — NEVER aggressive red |

---

## Screen-Specific Rules

### HomeScreen

- **Header:** Circular logo centered, NOT left-aligned logo + right icons layout
- **Greeting section:** Left-aligned, below circular header
- **XP chip:** Amber, top-right of the circular header area, pill shape
- **CTA cards:** Full-width, stacked, `space-y-4`
- **Day Status card:** `rounded-[28px]`, white bg, flat (no gradient)
- **Grafik Ikhtiar:** Keep bar chart, flat bars, teal fill

### MisiScreen

- **Phase header card:** ONLY screen allowed to use gradient (`from-primary to-teal-800`)
- **Audio player card:** `rounded-[40px]`, white, `shadow-md`
- **Content body:** `rounded-[40px]`, white
- **Deepdive topic rows:** Linktree card anatomy (icon-left, chevron-right, `rounded-[28px]`)
- **Audio fallback:** Amber-tinted notice box, NOT red

### MateriScreen

- **Topic list:** All cards use linktree anatomy, `rounded-[28px]`, `space-y-4`
- **Search field:** `rounded-2xl`, white bg, teal focus ring
- **Detail modal:** Bottom sheet, `rounded-t-[40px]`, full-height, white
- **Section blocks in modal:** `rounded-[32px]`, slate-50 bg for regular / teal-tint for practice

### ProfileScreen

- **Avatar circle:** `w-24 h-24 rounded-full bg-primary/10`, ring-4 ring-white
- **Level badge:** Amber pill, absolute positioned on avatar
- **Settings list:** Grouped in single white `rounded-[32px]` card with `p-2`
- **Each setting row:** `p-4 rounded-2xl` (inner radius inside the grouped card)
- **Backup row:** Normal interaction color (teal hover)
- **Reset row:** `hover:bg-red-50` ONLY, text-red-600 — confined to this row only

### JournalScreen

- Sliders: Empathic labels at each level (0-10), teal thumb color
- Checkbox missions: Custom teal checkboxes, NOT browser default
- Pill input for triggers: Tag-style, `rounded-full`, teal selected state

### SOSScreen

- **Background:** Dark mode (`bg-slate-950`) — reduce light stimulus
- **Breathing animation:** Centered circle, white/teal, pulse expand/contract
- **Affirm cards:** Dark surface (`bg-slate-800`), white text
- **Back button:** Light, accessible, always visible

---

## Accessibility Contract

| Rule | Spec |
| :--- | :--- |
| Min touch target | 44×44px (enforced in index.css) |
| Body font min | 16px |
| Caption font min | 10px (use sparingly, uppercase + tracking for legibility) |
| Focus ring | `focus:ring-4 focus:ring-primary/20 focus:outline-none` |
| Color contrast | All text on white/teal meets AA (verified by palette) |
| Screen reader | All icon-only buttons must have `aria-label` |
| SOS visibility | Always in top-right, never hidden behind scroll |
| Error messages | Teal icon + descriptive text, NEVER red-only |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
| :--- | :--- | :--- |
| Tailwind CSS v4 | @theme tokens, @layer utilities | Not required |
| framer-motion | motion.div, layoutId | Already installed |
| Material Symbols | Outlined variant only | CDN, no registry risk |
| idb-keyval | State persistence | Already installed |
| canvas-confetti | SuccessScreen only | Already installed |

No third-party component registries. All UI is custom Tailwind + custom components.

---

## Implementation Checklist (for developer)

### index.css

- [ ] Verify `Plus Jakarta Sans` is the active font (currently correct)
- [ ] Add `--color-primary-dark: #0A4A3C` if missing from @theme
- [ ] Add `--color-secondary: #E8A020` (amber, currently `#F59E0B` — update to match reference)
- [ ] Confirm `line-height: 1.6` on body (currently correct)

### HomeScreen.jsx

- [ ] Replace left-aligned logo bar with centered circular logo header
- [ ] XP chip moves to circular header area (top-right of circular logo section)
- [ ] SOS button remains in header, `primary-dark` bg
- [ ] Day Status card: change to `rounded-[28px]` (currently `rounded-3xl` — close, verify px)
- [ ] CTA buttons: `rounded-[28px]`, primary CTA solid teal, secondary white with border-slate-100
- [ ] Add `space-y-4` between all card sections
- [ ] Phase Info card: linktree anatomy (icon-left + text, no right arrow needed here)

### MateriScreen.jsx

- [ ] Topic rows: already close to linktree anatomy — verify `rounded-[28px]` and `space-y-4`
- [ ] Icon box: ensure `w-12 h-12 rounded-2xl` (currently w-12 h-12 rounded-2xl — correct)
- [ ] Chevron: `chevron_right` (currently correct)
- [ ] Remove any amber SOS button — standardize to `primary-dark rounded-xl`

### MisiScreen.jsx

- [ ] Deepdive topic rows: already use linktree anatomy — verify spacing
- [ ] Phase header: keep gradient (only exception)
- [ ] Audio player: `rounded-[40px]` (currently correct)
- [ ] Primary action button: `rounded-[32px]` → update to `rounded-[28px]` for consistency

### ProfileScreen.jsx

- [ ] Settings rows already use correct anatomy — verify grouped card `rounded-[32px]`
- [ ] Stats grid cards: `rounded-[28px]` (currently `rounded-3xl`)

### BottomNavBar.jsx

- [ ] Currently correct — keep framer-motion layoutId indicator
- [ ] Verify `rounded-t-[32px]`

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS — All copy follows brand voice, Islamic expressions natural, no medical overclaim
- [x] Dimension 2 Visuals: PASS — Clean 2D vector aesthetic locked, reference screenshot matched
- [x] Dimension 3 Color: PASS — 60/30/10 rule applied, amber accent restricted, SOS non-aggressive
- [x] Dimension 4 Typography: PASS — Plus Jakarta Sans, bold headings, body 1.6 line-height, scale defined
- [x] Dimension 5 Spacing: PASS — space-y-4 between cards, max-w-md enforced, 4px grid maintained
- [x] Dimension 6 Registry Safety: PASS — No third-party registries, all deps already installed

**Approval:** approved 2026-05-01
