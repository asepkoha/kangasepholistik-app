import { useMemo } from 'react'
import BottomNavBar from '../components/ui/BottomNavBar'
import { useAppState } from '../hooks/useAppState'

const PHASE_CONFIGS = [
  { range: [1, 4],  label: 'Fase 1: Pola Pikir', icon: 'psychology', color: 'teal', hint: 'Menenangkan saraf vagus & mode Rest & Digest' },
  { range: [5, 10], label: 'Fase 2: Pola Makan', icon: 'restaurant', color: 'amber', hint: 'Melapisi lambung dengan Semen Biologis' },
  { range: [11, 14],label: 'Fase 3: Pola Tidur', icon: 'bedtime',    color: 'indigo', hint: 'Shift malam — sel repair bekerja optimal' },
]

export default function HomeScreen({
  profile,
  currentDay,
  todaySaved,
  setScreen,
  totalXP,
  isComplete
}) {
  const { communityPosts } = useAppState()
  const firstName = profile.name ? profile.name.split(' ')[0] : 'Pejuang'
  const progressPercent = Math.min(Math.round(((currentDay - 1) / 14) * 100), 100)

  const latestMentorPost = useMemo(() => 
    communityPosts.find(p => p.isMentor),
    [communityPosts]
  )

  const phase = PHASE_CONFIGS.find(p => currentDay >= p.range[0] && currentDay <= p.range[1]) || PHASE_CONFIGS[2]

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Selamat pagi'
    if (hour < 15) return 'Selamat siang'
    if (hour < 18) return 'Selamat sore'
    return 'Selamat malam'
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-teal-600 text-lg">spa</span>
            </div>
            <span className="font-bold text-teal-800 tracking-tight">Kang Asep</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
              <span className="text-amber-600 text-xs">⚡</span>
              <span className="text-xs font-bold text-amber-700">{totalXP} XP</span>
            </div>
            <button 
              onClick={() => setScreen('sos')}
              className="w-9 h-9 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all"
            >
              SOS
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-6 animate-in fade-in duration-500">

        {/* Greeting */}
        <section>
          <p className="text-sm text-slate-400 font-medium mb-0.5">{greeting}, 👋</p>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">{firstName}.</h1>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            {todaySaved 
              ? 'MasyaAllah, misi hari ini sudah selesai. Istirahat dengan tenang ya 💚' 
              : 'Yuk, mulai ikhtiar hari ini pelan-pelan. Bismillah.'}
          </p>
        </section>

        {/* Day Status Card */}
        <section>
          <div className={`rounded-3xl p-6 border ${
            todaySaved 
              ? 'bg-teal-50 border-teal-100' 
              : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                  Hari ke-{currentDay} dari 14
                </p>
                <h2 className="text-base font-bold text-slate-900">{phase.label}</h2>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                todaySaved ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600'
              }`}>
                <span className="material-symbols-outlined text-2xl">
                  {todaySaved ? 'task_alt' : phase.icon}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-1">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-600 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{progressPercent}% perjalanan selesai</p>
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="grid gap-3">
          <button 
            onClick={() => setScreen(todaySaved ? 'journal' : 'misi')}
            className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              {todaySaved ? 'check_circle' : 'auto_stories'}
            </span>
            {todaySaved ? 'Lihat Ikhtiar Hari Ini' : 'Mulai Ikhtiar Hari Ini'}
          </button>
          {!todaySaved && (
            <button 
              onClick={() => setScreen('journal')}
              className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-xl text-teal-600">edit_note</span>
              Isi Jurnal Langsung
            </button>
          )}
        </section>

        {/* Phase Info Card */}
        <section>
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-3">Sedang Dikerja</p>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                <span className="material-symbols-outlined">{phase.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{phase.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{phase.hint}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Komunitas Teaser */}
        {latestMentorPost && (
          <section>
            <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-3xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-white text-[11px]">K</div>
                  <div>
                    <span className="text-xs font-bold text-amber-300">Kang Asep</span>
                    <span className="material-symbols-outlined text-amber-300 text-sm ml-1">verified</span>
                  </div>
                </div>
                <p className="text-sm text-teal-100/90 leading-relaxed mb-4 line-clamp-2">
                  "{latestMentorPost.content}"
                </p>
                <button 
                  onClick={() => setScreen('komunitas')}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
                >
                  Buka Komunitas →
                </button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-white/5 rotate-12">forum</span>
            </div>
          </section>
        )}

        {/* Recovery Chart */}
        <section>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Grafik Ikhtiar</h3>
                <p className="text-[10px] text-slate-400">Progres kumulatif 14 hari</p>
              </div>
              <span className="text-xl font-black text-teal-600">{(totalXP / 10).toFixed(0)}%</span>
            </div>
            {/* Simple visual bars */}
            <div className="flex items-end gap-1.5 h-16">
              {Array.from({ length: 14 }, (_, i) => {
                const dayNum = i + 1
                const done = dayNum < currentDay
                const today = dayNum === currentDay
                return (
                  <div 
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${
                      done ? 'bg-teal-500' : today ? 'bg-teal-200 animate-pulse' : 'bg-slate-100'
                    }`}
                    style={{ height: done ? '100%' : today ? '60%' : '20%' }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] text-slate-400">H1</span>
              <span className="text-[9px] font-bold text-teal-600">H{currentDay}</span>
              <span className="text-[9px] text-slate-400">H14</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="text-[11px] text-slate-300 uppercase tracking-widest">
            KangAsep Holistik · Ikhtiar Membawa Pulih
          </p>
        </footer>
      </main>

      <BottomNavBar activeScreen="home" onNavigate={setScreen} />
    </div>
  )
}
