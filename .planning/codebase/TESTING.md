# Testing Strategy — Kang Asep Holistik

Overview of quality assurance and verification methods.

## Manual Testing (UAT)
- **Checklist-based**: Managed via `5B-UAT.md`.
- **Focus Areas**:
  - State persistence across reloads.
  - Quota failure simulation via browser console events.
  - JSON Backup validity and file structure.
  - UI responsiveness on mobile viewport.

## Automated Verification (Planned)
- **Linting**: `npm run lint` for code style consistency.
- **Type Checking**: `npx tsc --noEmit` for data structure integrity.

## Simulation Methods
- **Quota Simulation**: `window.dispatchEvent(new CustomEvent('manual-quota-trigger'))`.
- **XP Simulation**: Modifying state in DevTools to test level-up logic and confetti.

## Success Criteria
- [x] Zero "aggressive red" colors in error states.
- [x] 100% data persistence in IndexedDB.
- [x] Validated brand voice in all user-facing strings.
