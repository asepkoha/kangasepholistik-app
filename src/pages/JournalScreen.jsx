import { useState } from 'react'
import { calcXP } from '../utils/xp'
import BottomNavBar from '../components/ui/BottomNavBar'

const CHECKLIST_ITEMS = {
  suplemen: [
    { key: 'pagi', label: 'Pagi', icon: 'light_mode', desc: 'Semen Pagi' },
    { key: 'siang', label: 'Siang', icon: 'sunny', desc: 'Semen Siang' },
    { key: 'malam', label: 'Malam', icon: 'dark_mode', desc: 'Semen Malam' },
  ],
  makan: [
    { key: 'pantangan', label: '🛡 Patuh Pantangan', desc: 'Menghindari 5C' },
    { key: 'lembut', label: '🥚 Tekstur Lembut', desc: 'Ramah lambung' },
    { key: 'kunyah30', label: '⏱ Kunyah 30x', desc: 'Bantu cerna' },
    { key: 'stop19', label: '🕖 Stop Jam 19.00', desc: 'Istirahatkan sel' },
  ],
  mental: [
    { key: 'dzikir', label: '🤲 Dzikir/Doa', desc: 'Vagal toning' },
    { key: 'napas', label: '💨 Olah Napas', desc: 'Mode Rest & Digest' },
    { key: 'tidur', label: '😴 Tidur Cukup', desc: 'Shift malam sel' },
  ]
}

export default function JournalScreen({ currentDay, todayEntry, todaySaved, onSave, onBack, setScreen }) {
  const [entry, setEntry] = useState({ ...todayEntry })
  const score = calcXP(entry)

  const handleToggle = (category, key) => {
    if (todaySaved) return
    setEntry(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }))
  }

  const handleScore = (key, val) => {
    if (todaySaved) return
    setEntry(prev => ({
      ...prev,
      conditionScores: {
        ...prev.conditionScores,
        [key]: val
      }
    }))
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-32 animate-in fade-in duration-500">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Jurnal Hari {currentDay}</h1>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Catatan Ikhtiar</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
            <span className="text-amber-600 text-xs">⚡</span>
            <span className="text-xs font-bold text-amber-700">{score} XP</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {todaySaved ? 'Terima kasih, Kak 💚' : 'Bismillah, Hari Baru 🌿'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {todaySaved 
              ? 'Jurnal sudah tersimpan. Lihat progresmu di bawah ya.' 
              : 'Yuk, catat progres ikhtiar hari ini. Setiap tanda centang adalah langkah kecil menuju kesembuhan.'}
          </p>
        </div>

        {/* Suplemen Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Suplemen (Walmagh)</h3>
          <div className="grid grid-cols-3 gap-3">
            {CHECKLIST_ITEMS.suplemen.map(item => (
              <button
                key={item.key}
                disabled={todaySaved}
                onClick={() => handleToggle('supplements', item.key)}
                className={`flex flex-col items-center p-4 rounded-3xl transition-all ${
                  entry.supplements[item.key] 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                    : 'bg-white text-slate-400 border border-slate-100'
                }`}
              >
                <span className="material-symbols-outlined mb-2 text-2xl">{item.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Checklist Groups */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Pola Makan & Mental</h3>
          <div className="bg-white rounded-[32px] p-2 shadow-soft-ambient space-y-1">
            {[...CHECKLIST_ITEMS.makan, ...CHECKLIST_ITEMS.mental].map((item, idx) => {
              const category = idx < 4 ? 'mealMissions' : 'mentalMissions'
              const isActive = entry[category][item.key]
              return (
                <button
                  key={item.key}
                  disabled={todaySaved}
                  onClick={() => handleToggle(category, item.key)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    isActive ? 'bg-primary/5 border-primary/10' : 'hover:bg-slate-50 border-transparent'
                  } border`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-300'
                    }`}>
                      <span className="material-symbols-outlined text-sm">done</span>
                    </div>
                    <div className="text-left">
                      <span className={`text-sm font-bold block ${isActive ? 'text-primary' : 'text-slate-700'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.desc}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Condition Scores */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Kondisi Tubuh (0-10)</h3>
          <div className="bg-white rounded-[32px] p-8 shadow-soft-ambient space-y-8">
            <ScoreSlider 
              label="Tingkat Nyeri" 
              value={entry.conditionScores.painScore} 
              onChange={(v) => handleScore('painScore', v)}
              disabled={todaySaved}
              color="text-red-500"
              bg="bg-red-500"
            />
            <ScoreSlider 
              label="Tingkat Cemas" 
              value={entry.conditionScores.anxietyScore} 
              onChange={(v) => handleScore('anxietyScore', v)}
              disabled={todaySaved}
              color="text-amber-500"
              bg="bg-amber-500"
            />
            <ScoreSlider 
              label="Kualitas Tidur" 
              value={entry.conditionScores.sleepQuality} 
              onChange={(v) => handleScore('sleepQuality', v)}
              disabled={todaySaved}
              color="text-primary/50"
              bg="bg-primary/50"
            />
          </div>
        </section>

        {/* Relapse Stepper */}
        <section className="bg-white rounded-[32px] p-8 shadow-soft-ambient border border-slate-50 flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Kambuh</h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Berapa kali hari ini?</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              disabled={todaySaved || entry.relapseCount <= 0}
              onClick={() => setEntry(prev => ({ ...prev, relapseCount: prev.relapseCount - 1 }))}
              className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center disabled:opacity-50"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="text-2xl font-bold text-primary w-8 text-center">{entry.relapseCount}</span>
            <button 
              disabled={todaySaved}
              onClick={() => setEntry(prev => ({ ...prev, relapseCount: prev.relapseCount + 1 }))}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>

        {/* Text Areas */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Catatan Tambahan</h3>
          <div className="space-y-4">
            <textarea
              placeholder="Apa pemicu atau keluhan hari ini?"
              disabled={todaySaved}
              value={entry.triggers}
              onChange={(e) => setEntry(prev => ({ ...prev, triggers: e.target.value }))}
              className="w-full bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 focus:border-primary/50 outline-none transition-all text-sm min-h-[120px] resize-none"
            />
            <textarea
              placeholder="Alhamdulillah, satu hal yang disyukuri..."
              disabled={todaySaved}
              value={entry.gratitude}
              onChange={(e) => setEntry(prev => ({ ...prev, gratitude: e.target.value }))}
              className="w-full bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 focus:border-primary/50 outline-none transition-all text-sm min-h-[120px] resize-none"
            />
          </div>
        </section>

        {!todaySaved ? (
          <div className="pt-4 space-y-4">
            <button 
              onClick={() => onSave(entry)}
              className="w-full py-5 bg-primary text-white rounded-[28px] font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Simpan & Lanjut
            </button>
            <p className="text-center text-[11px] text-slate-400 italic">
              Data tersimpan di perangkatmu. Amanah.
            </p>
          </div>
        ) : (
          <div className="pt-4">
            <div className="w-full py-5 bg-primary/5 border-2 border-teal-100 text-teal-700 rounded-[24px] font-bold text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary">task_alt</span>
              Alhamdulillah, Jurnal Tersimpan
            </div>
          </div>
        )}
      </main>

      <BottomNavBar activeScreen="journal" onNavigate={setScreen} />
    </div>
  )
}

function ScoreSlider({ label, value, onChange, disabled, color, bg }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <span className={`text-lg font-black ${color}`}>{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-1.5 ${bg}/10 rounded-full appearance-none cursor-pointer accent-primary`}
      />
      <div className="flex justify-between text-[9px] font-bold text-slate-300 uppercase tracking-widest">
        <span>Sangat Baik</span>
        <span>Sangat Buruk</span>
      </div>
    </div>
  )
}
