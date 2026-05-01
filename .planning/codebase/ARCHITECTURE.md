# Architecture Map — Kang Asep Holistik

A simplified overview of the technical structure and data flow of the Kang Asep Holistik application.

## Core Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Persistence**: IndexedDB via `idb-keyval`
- **PWA**: Ready for offline usage

## Directory Structure
```
src/
├── components/
│   ├── gamification/   # XP and achievement visuals
│   └── ui/             # Global layout & shared modals (BottomNavBar, QuotaModal)
├── data/               # Static content (lessons, materials)
├── hooks/
│   └── useAppState.jsx # Central State & Persistence (SINGLE SOURCE OF TRUTH)
├── pages/              # Screen-level components
├── utils/              # Helper functions (XP math, date helpers)
└── App.jsx             # Router & Global Modal Provider
```

## Data Lifecycle & Safety
### 1. State Hub (`useAppState.jsx`)
All application data (profile, journal, XP) flows through the `useAppState` hook. It handles:
- Initialization from IndexedDB.
- State transitions via actions.
- **Safe Persistence**: Uses `safeSet` to catch `QuotaExceededError`.

### 2. Quota Handling
If a save fails due to storage limits:
- `safeSet` catches the error.
- Sets `isQuotaModalOpen: true` in the state.
- `App.jsx` (Root) renders the `QuotaModal`.

### 3. Manual Backup (`ProfileScreen.jsx`)
- Entry point for exporting local data to a `.json` file.
- Provides a safety net for users to manually secure their data.

## Routing Logic
Managed in `App.jsx`:
- **Onboarding**: Redirects if profile is empty.
- **Program Flow**: Misi screen unlocks based on `programStartDate`.
- **Global SOS**: Always accessible via bottom navigation or dedicated triggers.
