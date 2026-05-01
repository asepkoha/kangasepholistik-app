# Codebase Structure — Kang Asep Holistik

A breakdown of the project's folder organization and component hierarchy.

## Root Directory
- `App.jsx`: Main router and global modal provider.
- `main.jsx`: Entry point for React.
- `index.css`: Global design tokens and Tailwind imports.

## `/src` Subdirectories
### 1. `/components`
- **`gamification/`**: `XPBadge.jsx`, `LevelProgress.jsx`.
- **`ui/`**: Layout shells (`TopAppBar`, `BottomNavBar`) and global overlays (`QuotaModal`).

### 2. `/data`
- `lessons.ts`: 14-day program content (VN scripts, mission items).
- `materials.ts`: Modular deep-dive topics.
- `missionTemplates.ts`: Reusable checklist definitions.

### 3. `/hooks`
- `useAppState.jsx`: Central state management, logic for persistence and quota safety.

### 4. `/pages`
- `HomeScreen.jsx`: Recovery dashboard.
- `MisiScreen.jsx`: Daily program interaction.
- `ProfileScreen.jsx`: Settings and JSON Backup.
- `SOSScreen.jsx`: Panic protocol.
- `SuccessScreen.jsx`: Mission completion celebrations.

### 5. `/utils`
- `xp.ts`: XP math and validation logic.
- `storage.ts`: Generic persistence helpers.
