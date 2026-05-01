---
description: Standar coding untuk KangAsepHolistik app. Terapkan saat menulis atau mengedit kode React, TypeScript, hooks, state management, dan styling. Selalu aktif untuk semua perubahan kode.
globs: src/**/*.ts, src/**/*.tsx
alwaysApply: false
---

# Coding Standards

## State Management
- SATU sumber kebenaran: `useAppState` hook (Context + useReducer)
- Semua perubahan state HARUS melalui dispatch actions
- JANGAN baca/tulis state langsung — selalu via hook
- Storage: IndexedDB via `idb-keyval` — JANGAN localStorage

```typescript
// ✅ Benar
const { state, dispatch } = useAppState();
dispatch({ type: 'COMPLETE_MISSION', payload: { day: 1, missionId: 'pagi' } });

// ❌ Salah
localStorage.setItem('missions', JSON.stringify(data));
const [missions, setMissions] = useState(JSON.parse(localStorage.getItem('missions')));
```

## XP System
- TIDAK BOLEH double-count — validasi di reducer sebelum tambah XP
- Logic: cek `state.completedMissions[day]` sebelum award XP
- Jika XP > max possible untuk hari itu, cap ke max

```typescript
// ✅ Benar — validasi dulu
case 'EARN_XP':
  if (state.earnedXP[action.payload.missionId]) return state; // sudah diklaim
  return { ...state, totalXP: state.totalXP + action.payload.amount };
```

## Day Unlock Logic
```typescript
// Unlock berdasarkan tanggal, BUKAN manual toggle
const currentDay = Math.floor(
  (Date.now() - state.programStartDate) / 86400000
) + 1;
const isUnlocked = (day: number) => day <= Math.min(currentDay, 14);
```

## Styling
- Tailwind CSS ONLY — jangan inline style atau CSS modules
- Mobile-first: `max-w-md mx-auto`
- Cards: `rounded-2xl shadow-sm bg-white p-4`
- Badges: `rounded-full bg-amber-100 text-amber-800`
- Buttons primary: `bg-teal-700 text-white rounded-2xl px-6 py-3`

## Component Patterns
- Named exports only, no default exports
- Satu komponen per file
- Props interface di atas komponen
- Hooks di paling atas function body

```typescript
// ✅ Benar
interface MissionCardProps {
  day: number;
  title: string;
  isCompleted: boolean;
}

export function MissionCard({ day, title, isCompleted }: MissionCardProps) {
  const { dispatch } = useAppState();
  // ...
}
```

## File Naming
- Components: PascalCase (`MissionCard.tsx`)
- Hooks: camelCase dengan prefix `use` (`useAppState.ts`)
- Data: camelCase (`lessons.ts`, `materials.ts`)
- Types: PascalCase interfaces (`DailyJournal`, `Lesson`)
