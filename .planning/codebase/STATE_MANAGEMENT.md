# State & Persistence — Kang Asep Holistik

Detailed mapping of the state machine and persistence logic.

## The `useAppState` Hook
The heartbeat of the application, managing all user-specific data.

### 1. State Schema
```typescript
interface AppState {
  profile: UserProfile | null;
  journal: Record<string, DailyJournal>;
  xp: number;
  unlockedDays: number[];
  programStartDate: string | null;
  isQuotaModalOpen: boolean; // Storage safety flag
}
```

### 2. The `safeSet` Mechanism
Located in `src/hooks/useAppState.jsx`, this function wraps `idb-keyval`'s `set`.

**Logic:**
```javascript
const safeSet = async (key, value) => {
  try {
    await set(key, value);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      dispatch({ type: 'SET_QUOTA_MODAL', payload: true });
    }
    throw error;
  }
};
```

### 3. Global Modal Integration
- `App.jsx` listens to `isQuotaModalOpen`.
- When `true`, `QuotaModal` is rendered as an overlay.
- This ensures the user is warned regardless of which screen they are currently on.

### 4. Data Export (Backup)
- `backup()` function in `useAppState.jsx` aggregates `profile` and `journal` data.
- Triggered by the "Amankan Jurnal" button in `ProfileScreen.jsx`.
- Uses `JSON.stringify` and `Blob` for local download.

## XP Calculation
- Handled by `src/utils/xp.ts`.
- Validates against `journal` entries to prevent double-counting.
- XP is stored as a derived value but also persisted to avoid re-calculation on every load.
