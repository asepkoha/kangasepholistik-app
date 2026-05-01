# Development Conventions — Kang Asep Holistik

Coding standards and brand guidelines for the Kang Asep Holistik project.

## Branding & Visuals
- **Primary Color**: `#0D5C4A` (Teal). Use via `text-primary`, `bg-primary`, or `--color-primary` CSS variable.
- **Secondary Colors**: 
  - Amber `#E8A020` (Badge/XP)
  - Cream `#F5F5EF` (Background)
- **Border Radius**: `rounded-2xl` for cards, `rounded-full` for badges.
- **Touch Targets**: Minimum `44x44px` for all interactive elements.

## Brand Voice (The "Kakak" Persona)
- **Tone**: Validasi → Edukasi → Solusi. Supportive, empathetic, and Islamic-natural.
- **Language**: Indonesian informal. Avoid medical jargon or lecturing.
- **Key Terms**:
  - Walmagh = "Semen Biologis" or "Plester Alami"
  - Saraf Vagus = "Remote Control Tubuh"
  - Lambung = "Rumah yang sedang direnovasi"
  - Kambuh = "Gema dari kebiasaan lama"

## State Management Rules
1. **Single Source of Truth**: Use `useAppState` hook. Do not manage global state in local component state.
2. **Persistence**: Use IndexedDB (`idb-keyval`). Never use `localStorage`.
3. **Safe Sets**: Always use the `safeSet` wrapper in `useAppState` for any database write to ensure Quota handling is active.

## UI Components
- **Loading**: Use Skeleton Screens, never spinners.
- **Errors**: Use soft teal/dark tones. Avoid aggressive red (`#ef4444`) to prevent user anxiety.
- **Animations**: Use Framer Motion for smooth transitions. Success screens should celebrate with micro-interactions (e.g., confetti).

## Code Style
- **Tailwind**: Utilities only. Avoid custom CSS files unless updating global design tokens in `index.css`.
- **Files**: PascalCase for components (`HomeScreen.jsx`), camelCase for hooks (`useAppState.js`).
