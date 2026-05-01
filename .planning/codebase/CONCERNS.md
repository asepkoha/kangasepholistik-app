# Critical Concerns & Tech Debt — Kang Asep Holistik

Identified risks and areas for future improvement.

## Technical Debt
1. **Audio Assets**: Currently using text fallback for VN content. Audio files (`hari-X-vn.mp3`) need to be recorded and integrated.
2. **PWA Offline Sync**: The `safeSet` layer handles local errors, but a more robust background sync strategy is needed for future cloud integration.
3. **TypeScript Migration**: Some files are still `.jsx`. Full conversion to `.tsx` would improve data safety for the complex `DailyJournal` interface.

## Performance Concerns
- **State Size**: As the 14-day journal grows, the single state object in `useAppState` will increase in size. Periodic pruning or separate DB stores might be needed for "Alumni" data.
- **Animation Overhead**: Ensure Framer Motion and Confetti do not cause lag on low-end mobile devices during the Success Screen transition.

## Data Integrity Risks
- **JSON Format**: The backup file is a simple JSON. If a user manually edits it and tries to "Restore" (future feature), it could corrupt the IndexedDB state. Schema validation (e.g., Zod) is recommended for the next phase.
