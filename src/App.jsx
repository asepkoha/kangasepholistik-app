import { useAppState } from './hooks/useAppState.jsx'
import OnboardingScreen from './pages/OnboardingScreen'
import HomeScreen       from './pages/HomeScreen'
import JournalScreen    from './pages/JournalScreen'
import MisiScreen      from './pages/MisiScreen'
import SOSScreen        from './pages/SOSScreen'
import MateriScreen     from './pages/MateriScreen'
import ProfileScreen    from './pages/ProfileScreen'
import SuccessScreen    from './pages/SuccessScreen'
import KomunitasScreen  from './pages/KomunitasScreen'

export default function App() {
  const app = useAppState()
  
  if (app.loading) return null

  // Route by screen
  const screen = app.screen

  // First launch or Onboarding
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
        setScreen={app.setScreen}
      />
    )
  }

  if (screen === 'misi' || screen === 'lesson') {
    return (
      <MisiScreen
        currentDay={app.currentDay}
        onDone={() => { 
          app.markLessonSeen(app.currentDay)
          app.setScreen('journal') 
        }}
        setScreen={app.setScreen}
      />
    )
  }

  if (screen === 'materi') {
    return (
      <MateriScreen 
        onBack={() => app.setScreen('home')} 
        setScreen={app.setScreen} 
      />
    )
  }

  if (screen === 'profil') {
    return <ProfileScreen setScreen={app.setScreen} />
  }
  if (screen === 'success') {
    return (
      <SuccessScreen
        onContinue={() => app.setScreen('home')}
        xpEarned={app.todayEntry?.xpEarned ?? 100}
      />
    )
  }

  
  if (screen === 'komunitas') {
    return (
      <KomunitasScreen 
        onBack={() => app.setScreen('home')} 
        setScreen={app.setScreen}
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
      totalXP={app.totalXP}
      isComplete={app.isComplete}
      setScreen={app.setScreen}
    />
  )
}
