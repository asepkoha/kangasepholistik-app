import { useState, useEffect, useCallback } from 'react'
import { PROGRAM_DAYS } from '../data/programData'

const STORAGE_KEY = 'walmagh_v1'

// ── Default state ──────────────────────────────────────────
const defaultProfile = {
  name: '',
  age: '',
  city: '',
  job: '',
  weightStart: '',
  startDate: null,
  committed: false,
}

const defaultJournalEntry = {
  // Suplemen
  suplementPagi: false,
  suplementSiang: false,
  suplementMalam: false,
  // Pola makan
  patuhPantangan: false,
  teksturLembut: false,
  kunyah30: false,
  stopJam19: false,
  // Mental & istirahat
  tidurCukup: false,
  dzikirDoa: false,
  olahNapas: false,
  // Skala
  nyeri: 5,
  cemas: 5,
  panik: 0,
  tidur: 7,
  kambuh: 0,
  weight: '',
  // Catatan
  keluhan: '',
  syukur: '',
  // Meta
  savedAt: null,
}

// ── Helpers ────────────────────────────────────────────────
function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Storage save failed', e)
  }
}

export function calcDayNumber(startDate) {
  if (!startDate) return 1
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today - start) / 86400000) + 1
  return Math.min(Math.max(diff, 1), PROGRAM_DAYS)
}

export function calcScore(entry) {
  let score = 0
  // Suplemen: 30 poin total
  if (entry.suplementPagi)  score += 10
  if (entry.suplementSiang) score += 10
  if (entry.suplementMalam) score += 10
  // Pola makan: 40 poin total
  if (entry.patuhPantangan) score += 10
  if (entry.teksturLembut)  score += 10
  if (entry.kunyah30)       score += 10
  if (entry.stopJam19)      score += 10
  // Mental & istirahat: 30 poin total
  if (entry.tidurCukup)     score += 10
  if (entry.dzikirDoa)      score += 10
  if (entry.olahNapas)      score += 10
  return score
}

export function calcStreak(history) {
  const sorted = Object.keys(history).map(Number).sort((a, b) => b - a)
  let streak = 0
  for (let i = 0; i < sorted.length; i++) {
    if (history[sorted[i]]?.savedAt) streak++
    else break
  }
  return streak
}

// ── Main hook ──────────────────────────────────────────────
export function useAppState() {
  const [state, setState] = useState(() => {
    const stored = loadStorage()
    return stored || {
      profile: defaultProfile,
      journal: {},      // { dayNumber: entry }
      lessonsSeen: [],  // [dayNumber, ...]
      screen: 'onboarding',
    }
  })

  useEffect(() => {
    saveStorage(state)
  }, [state])

  // ── Derived values ───────────────────────────────────────
  const currentDay = calcDayNumber(state.profile.startDate)
  const todayEntry = state.journal[currentDay] || { ...defaultJournalEntry }
  const todaySaved = !!state.journal[currentDay]?.savedAt
  const streak = calcStreak(state.journal)
  const isComplete = currentDay > PROGRAM_DAYS

  // ── Actions ──────────────────────────────────────────────
  const saveProfile = useCallback((profileData) => {
    setState(prev => ({
      ...prev,
      profile: { ...profileData, committed: true },
      screen: 'home',
    }))
  }, [])

  const updateJournalField = useCallback((field, value) => {
    setState(prev => ({
      ...prev,
      journal: {
        ...prev.journal,
        [currentDay]: {
          ...(prev.journal[currentDay] || defaultJournalEntry),
          [field]: value,
        },
      },
    }))
  }, [currentDay])

  const saveJournal = useCallback((entry) => {
    setState(prev => ({
      ...prev,
      journal: {
        ...prev.journal,
        [currentDay]: { ...entry, savedAt: new Date().toISOString() },
      },
      screen: 'lesson',
    }))
  }, [currentDay])

  const markLessonSeen = useCallback((day) => {
    setState(prev => ({
      ...prev,
      lessonsSeen: prev.lessonsSeen.includes(day)
        ? prev.lessonsSeen
        : [...prev.lessonsSeen, day],
      screen: 'home',
    }))
  }, [])

  const setScreen = useCallback((screen) => {
    setState(prev => ({ ...prev, screen }))
  }, [])

  const resetAll = useCallback(() => {
    setState({
      profile: defaultProfile,
      journal: {},
      lessonsSeen: [],
      screen: 'onboarding',
    })
  }, [])

  // ── Backup / Restore ─────────────────────────────────────
  const backup = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `walmagh-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const restore = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        if (parsed.profile && parsed.journal) {
          setState(parsed)
        } else {
          alert('File backup tidak valid.')
        }
      } catch {
        alert('File backup tidak valid.')
      }
    }
    reader.readAsText(file)
  }, [])

  return {
    // State
    profile: state.profile,
    journal: state.journal,
    lessonsSeen: state.lessonsSeen,
    screen: state.screen,
    // Derived
    currentDay,
    todayEntry,
    todaySaved,
    streak,
    isComplete,
    // Actions
    saveProfile,
    updateJournalField,
    saveJournal,
    markLessonSeen,
    setScreen,
    resetAll,
    backup,
    restore,
    // Helpers
    defaultJournalEntry,
  }
}
