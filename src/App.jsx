import { useAppState } from './hooks/useAppState'
import OnboardingScreen from './pages/OnboardingScreen'
import HomeScreen       from './pages/HomeScreen'
import JournalScreen    from './pages/JournalScreen'
import LessonScreen     from './pages/LessonScreen'
import SOSScreen        from './pages/SOSScreen'

export default function App() {
  const app = useAppState()

  // Route by screen
  const screen = app.screen

  // First launch
  if (!app.profile.committed || screen === 'onboarding') {
    return <OnboardingScreen onSave={app.saveProfile} />
  }

  if (screen === 'sos') {
    return <SOSScreen onBack={() => app.setScreen('home')} />
  }

  if (screen === 'journal') {
    return (
      <JournalScreen
        currentDay={app.currentDay}
        todayEntry={app.todayEntry}
        todaySaved={app.todaySaved}
        onSave={app.saveJournal}
        onBack={() => app.setScreen('home')}
      />
    )
  }

  if (screen === 'lesson') {
    return (
      <LessonScreen
        currentDay={app.currentDay}
        todayEntry={app.todayEntry}
        lessonsSeen={app.lessonsSeen}
        onDone={() => { app.markLessonSeen(app.currentDay) }}
      />
    )
  }

  // Default: home
  return (
    <HomeScreen
      profile={app.profile}
      journal={app.journal}
      currentDay={app.currentDay}
      todaySaved={app.todaySaved}
      streak={app.streak}
      isComplete={app.isComplete}
      setScreen={app.setScreen}
      backup={app.backup}
      restore={app.restore}
      resetAll={app.resetAll}
    />
  )
}
