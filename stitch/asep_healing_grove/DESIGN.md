# Design System Document: The Empathetic Companion

## 1. Overview & Creative North Star
**Creative North Star: "The Living Sanctuary"**

This design system moves away from the clinical, sterile atmosphere of traditional health apps and towards a "Living Sanctuary." We are building a digital companion that feels organic, responsive, and deeply encouraging. While inspired by gamified education, our execution must feel more "Editorial-Premium" than "Cartoon-Generic."

To break the "template" look, we utilize **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid, centered grids, we use weighted layouts where elements "grow" from the corners like organic life. We replace cold structural lines with soft background shifts and layered surfaces, creating a UI that feels like a series of soft, physical cards stacked on a sunlit table.

---

## 2. Colors & The Surface Manifesto

Our palette is rooted in nature but amplified for digital vibrancy. We use high-contrast pairings to ensure legibility while maintaining an empathetic warmth.

### Color Roles
- **Primary (`#2a6900`):** "Leaf Growth." Used for high-priority actions and brand identity.
- **Secondary (`#00628c`):** "Clear Sky." Used for calm, supportive elements and secondary navigation.
- **Tertiary (`#725800`):** "Golden Hour." Used for rewards, streaks, and moments of celebration.
- **Background (`#f8f6f6`):** "Soft Linen." A warm neutral that prevents eye strain.

### The Rules of Engagement
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Contrast must be achieved through background shifts. For example, a `surface-container-low` section should sit on a `surface` background to define its boundary.
- **Surface Hierarchy & Nesting:** Treat the UI as physical layers. Use `surface-container-lowest` for the main canvas, and `surface-container` for nested modules. This "paper-on-paper" look creates depth without clutter.
- **The "Glass & Gradient" Rule:** Use Glassmorphism (backdrop-blur: 12px) for floating navigation bars or celebratory modals using semi-transparent `surface` colors.
- **Signature Textures:** For Hero CTAs, use a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle. This adds "soul" and a tactile, pillowy feel to the button.

---

## 3. Typography: The Friendly Voice

We pair the structured playfulness of **Plus Jakarta Sans** with the approachable warmth of **Be Vietnam Pro**.

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | Bold, expressive, and joyful. |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | Assertive but rounded. |
| **Title** | `title-lg` | Be Vietnam Pro | 1.375rem | Human-centric and clear. |
| **Body** | `body-lg` | Be Vietnam Pro | 1rem | Highly legible for long-form guidance. |
| **Label** | `label-md` | Plus Jakarta Sans | 0.75rem | All-caps for metadata/chips. |

**Editorial Note:** Use `display-lg` for daily affirmations or progress milestones. The scale shift between a small `body` text and a massive `display` headline creates the "Signature" look.

---

## 4. Elevation & Depth: Tonal Layering

We reject the standard Material Design drop shadow. Depth is achieved through **Tonal Layering**.

- **The Layering Principle:** To lift a card, move it from `surface-container-low` to `surface-container-lowest`. The eye perceives the brighter white as being "closer" to the light source.
- **Ambient Shadows:** Only use shadows for floating Action Buttons or celebratory Modals. Use a blur of 32px, an opacity of 6%, and a tint derived from `on-surface` (`#2e2f2f`). Never use pure black shadows.
- **The "Ghost Border" Fallback:** For interactive states (like a selected card), use a 2px "Ghost Border" using the `outline-variant` token at 20% opacity. This provides a tactile "pressed" feel without the harshness of a structural line.

---

## 5. Components

### Buttons: The Tactile Press
- **Primary:** `primary` background, `on-primary` text. **2px bottom-offset border** (using `primary_dim`) to create a "3D" push-button effect common in gamified interfaces.
- **Radius:** Always use `xl` (3rem) or `full`.
- **Sizing:** Large height (56px+) to ensure it feels "meaty" and satisfying to tap.

### Progress Bars: The Path to Growth
- **Track:** `surface-container-highest`.
- **Fill:** `primary_fixed` with a subtle shimmer effect (gradient).
- **Height:** 12px minimum. Always include a `md` (1.5rem) rounded cap.

### Cards: The Content Vessel
- **Rule:** Forbid divider lines. Use vertical white space (32px+) to separate sections within a card.
- **Style:** Background of `surface-container-lowest` on a `surface` background. `lg` (2rem) corner radius.

### Input Fields: The Conversation
- **Style:** Thick 2px `outline-variant` border. On focus, the border transitions to `primary` with a 4px soft outer glow.
- **Labeling:** Always use `title-sm` (Be Vietnam Pro) for labels to maintain a grounded, helpful tone.

### Signature Component: "The Encouragement Toast"
A floating, semi-transparent notification using Glassmorphism. It sits at the top of the screen with a `tertiary_container` accent to celebrate small wins (e.g., "You drank a glass of water! ✨").

---

## 6. Do’s and Don’ts

### Do
- **Do** use `xl` (3rem) corner radii for main containers to emphasize friendliness.
- **Do** overlap illustrations with card boundaries to break the "boxed-in" feel.
- **Do** use high-contrast color pairings (e.g., `primary` text on `primary_container` backgrounds) for accessibility.
- **Do** treat "Empty States" as an opportunity for empathy—use `surface_variant` and soft icons.

### Don’t
- **Don’t** use 1px solid lines or dividers. They create "visual noise" and feel clinical.
- **Don’t** use sharp corners. Even a 4px radius is too sharp for this system.
- **Don’t** use harsh transitions. All state changes (hover, press, toggle) should have a 200ms ease-out duration.
- **Don’t** overwhelm the user with "Error" Red. Use `error_container` (soft orange-red) to keep the tone supportive, even when a mistake is made.