import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useState } from 'react'
import { get, set, del, clear } from 'idb-keyval'
import { calcDayNumber, calcXP } from '../utils/xp'

const AppStateContext = createContext()

const INITIAL_STATE = {
  profile: {
    name: '',
    age: '',
    city: '',
    committed: false,
    startDate: null
  },
  journal: {},
  lessonsSeen: [],
  screen: 'home',
  totalXP: 0,
  communityPosts: [],
  loading: true
}

const DEFAULT_POSTS = [
  {
    id: 'p1',
    author: 'Kang Asep',
    time: 'Baru Saja',
    tag: 'Edukasi',
    content: 'Bismillah, selamat datang pejuang lambung. Ingat, sensasi itu nyata tapi bahayanya tidak nyata. Kita berjuang bareng ya! 💛',
    likes: 99,
    isMentor: true,
    timestamp: Date.now()
  },
  {
    id: 'p2',
    author: 'Siti',
    time: '1 jam lalu',
    tag: 'Inspirasi',
    content: 'Alhamdulillah, hari ke-5 sudah mulai bisa tidur miring kiri. Walmagh benar-benar membantu melapisi lambungku.',
    likes: 12,
    timestamp: Date.now() - 3600000
  }
]

function appReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return { ...state, ...action.payload, loading: false }
    
    case 'SET_SCREEN':
      return { ...state, screen: action.payload }
    
    case 'SAVE_PROFILE':
      return { 
        ...state, 
        profile: { ...action.payload, committed: true, startDate: action.payload.startDate || new Date().toISOString() } 
      }
    
    case 'UPDATE_JOURNAL': {
      const { date, entry } = action.payload
      return {
        ...state,
        journal: {
          ...state.journal,
          [date]: entry
        }
      }
    }
    
    case 'SAVE_JOURNAL': {
      const { date, entry, xpChange } = action.payload
      return {
        ...state,
        journal: {
          ...state.journal,
          [date]: entry
        },
        totalXP: state.totalXP + xpChange
      }
    }
    
    case 'MARK_LESSON_SEEN':
      if (state.lessonsSeen.includes(action.payload)) return state
      return {
        ...state,
        lessonsSeen: [...state.lessonsSeen, action.payload],
        totalXP: state.totalXP + 50 // Fixed reward for lesson
      }
    
    case 'ADD_POST':
      return {
        ...state,
        communityPosts: [action.payload, ...state.communityPosts]
      }
    
    case 'LIKE_POST':
      return {
        ...state,
        communityPosts: state.communityPosts.map(p => 
          p.id === action.payload ? { ...p, likes: p.likes + 1 } : p
        )
      }
    
    case 'RESET_ALL':
      return { ...INITIAL_STATE, loading: false }
    
    default:
      return state
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)
  const [showQuotaModal, setShowQuotaModal] = useState(false)

  // Helper: detect quota exceeded
  function isQuotaError(err) {
    return (
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      (err?.message && err.message.toLowerCase().includes('quota'))
    )
  }

  // Safe set wrapper — shows QuotaModal on storage full
  const safeSet = useCallback(async (key, value) => {
    try {
      await set(key, value)
    } catch (err) {
      if (isQuotaError(err)) {
        setShowQuotaModal(true)
      } else {
        console.error(`[useAppState] Failed to save '${key}':`, err)
      }
    }
  }, [])

  // Initialization
  useEffect(() => {
    async function loadData() {
      try {
        const [profile, journal, lessonsSeen, totalXP, screen, communityPosts] = await Promise.all([
          get('profile'),
          get('journal'),
          get('lessonsSeen'),
          get('totalXP'),
          get('screen'),
          get('communityPosts')
        ])

        dispatch({
          type: 'INIT_STATE',
          payload: {
            profile: profile || INITIAL_STATE.profile,
            journal: journal || INITIAL_STATE.journal,
            lessonsSeen: lessonsSeen || INITIAL_STATE.lessonsSeen,
            totalXP: totalXP || INITIAL_STATE.totalXP,
            screen: screen || 'home',
            communityPosts: communityPosts || DEFAULT_POSTS
          }
        })
      } catch (error) {
        console.error('Failed to load state from IndexedDB:', error)
        dispatch({ type: 'INIT_STATE', payload: {} })
      }
    }
    loadData()
  }, [])

  // Auto-save effects — menggunakan safeSet agar QuotaExceededError terdeteksi
  useEffect(() => { if (!state.loading) safeSet('profile', state.profile) }, [state.profile, state.loading, safeSet])
  useEffect(() => { if (!state.loading) safeSet('journal', state.journal) }, [state.journal, state.loading, safeSet])
  useEffect(() => { if (!state.loading) safeSet('lessonsSeen', state.lessonsSeen) }, [state.lessonsSeen, state.loading, safeSet])
  useEffect(() => { if (!state.loading) safeSet('totalXP', state.totalXP) }, [state.totalXP, state.loading, safeSet])
  useEffect(() => { if (!state.loading) safeSet('screen', state.screen) }, [state.screen, state.loading, safeSet])
  useEffect(() => { if (!state.loading) safeSet('communityPosts', state.communityPosts) }, [state.communityPosts, state.loading, safeSet])

  // Helpers
  const currentDay = useMemo(() => calcDayNumber(state.profile.startDate), [state.profile.startDate])
  
  const todayDate = new Date().toISOString().split('T')[0]
  const todayEntry = state.journal[todayDate] || {
    day: currentDay,
    date: todayDate,
    supplements: { pagi: false, siang: false, malam: false },
    mealMissions: { pantangan: false, lembut: false, kunyah30: false, stop19: false },
    mentalMissions: { tidur: false, dzikir: false, napas: false },
    conditionScores: { painScore: 5, anxietyScore: 5, panicScore: 0, sleepQuality: 5 },
    relapseCount: 0,
    triggers: '',
    gratitude: '',
    xpEarned: 0,
    saved: false
  }

  const saveProfile = useCallback((data) => {
    dispatch({ type: 'SAVE_PROFILE', payload: data })
  }, [])

  const setScreen = useCallback((screen) => {
    dispatch({ type: 'SET_SCREEN', payload: screen })
  }, [])

  const saveJournal = useCallback((entry) => {
    const oldXP = todayEntry.xpEarned || 0
    const newXP = calcXP(entry)
    const xpChange = newXP - oldXP
    
    dispatch({
      type: 'SAVE_JOURNAL',
      payload: {
        date: todayDate,
        entry: { ...entry, xpEarned: newXP, saved: true },
        xpChange
      }
    })
  }, [todayDate, todayEntry.xpEarned])

  const markLessonSeen = useCallback((day) => {
    dispatch({ type: 'MARK_LESSON_SEEN', payload: day })
  }, [])

  const addCommunityPost = useCallback((content, tag = 'Micro-Win') => {
    const newPost = {
      id: Date.now().toString(),
      author: state.profile.name || 'Anonim',
      time: 'Baru Saja',
      tag,
      content,
      likes: 0,
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_POST', payload: newPost })
  }, [state.profile.name])

  const likeCommunityPost = useCallback((postId) => {
    dispatch({ type: 'LIKE_POST', payload: postId })
  }, [])

  const resetAll = useCallback(async () => {
    if (window.confirm('Hapus semua data dan mulai dari awal?')) {
      await clear()
      dispatch({ type: 'RESET_ALL' })
    }
  }, [])

  // Export-only backup — sesuai keputusan: profile + journal, nama file mudah dikenali
  const backup = useCallback(() => {
    const dateStr = new Date().toLocaleDateString('id-ID', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).replace(/\/|\./g, '-')
    const data = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      appName: 'KangAsep Holistik',
      profile: state.profile,
      journal: state.journal,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Jurnal_KangAsep_${dateStr}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }, [state.profile, state.journal])

  const value = {
    ...state,
    currentDay,
    todayEntry,
    todaySaved: todayEntry.saved,
    saveProfile,
    setScreen,
    saveJournal,
    markLessonSeen,
    addCommunityPost,
    likeCommunityPost,
    resetAll,
    backup,
    showQuotaModal,
    setShowQuotaModal,
    isComplete: currentDay > 14
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
