export const PROGRAM_DAYS = 14

export function calcDayNumber(startDate) {
  if (!startDate) return 1
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today - start) / 86400000) + 1
  return Math.min(Math.max(diff, 1), PROGRAM_DAYS + 1) // Allow day 15 for completion
}

export function calcXP(entry) {
  let xp = 0
  // Suplemen: 30 XP
  if (entry.supplements?.pagi) xp += 10
  if (entry.supplements?.siang) xp += 10
  if (entry.supplements?.malam) xp += 10
  // Makan: 40 XP
  if (entry.mealMissions?.pantangan) xp += 10
  if (entry.mealMissions?.lembut) xp += 10
  if (entry.mealMissions?.kunyah30) xp += 10
  if (entry.mealMissions?.stop19) xp += 10
  // Mental: 30 XP
  if (entry.mentalMissions?.tidur) xp += 10
  if (entry.mentalMissions?.dzikir) xp += 10
  if (entry.mentalMissions?.napas) xp += 10
  return xp
}
