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
    <div className="min-h-screen bg-background pb-32 animate-in fade-in duration-500 font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-primary/5">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <button 
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div className="overflow-hidden">
              <h1 className="text-[17px] font-jakarta font-extrabold text-slate-900 leading-tight truncate">Jurnal Hari {currentDay}</h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Catatan Ikhtiar</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-2xl shadow-sm shadow-secondary/5">
            <span className="text-secondary text-xs animate-pulse">⚡</span>
            <span className="text-[13px] font-jakarta font-black text-secondary">{score} XP</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Welcome Section */}
        <div className="relative">
          <h2 className="text-2xl font-jakarta font-extrabold text-slate-900 tracking-tight mb-2">
            {todaySaved ? 'Terima kasih, Kak 💛' : 'Bismillah, Hari Baru 🌿'}
          </h2>
          <p className="text-[13px] font-medium text-slate-400 leading-relaxed max-w-[85%]">
            {todaySaved 
              ? 'Jurnal sudah tersimpan rapi. Lihat kembali progresmu hari ini di bawah ya.' 
              : 'Setiap tanda centang adalah bukti cinta pada diri sendiri. Yuk, catat progres ikhtiar hari ini.'}
          </p>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-50/30 rounded-full blur-2xl -z-10" />
        </div>

        {/* Suplemen Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Walmagh (Semen Biologis)</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {CHECKLIST_ITEMS.suplemen.map(item => (
              <button
                key={item.key}
                disabled={todaySaved}
                onClick={() => handleToggle('supplements', item.key)}
                className={`flex flex-col items-center p-5 rounded-[32px] transition-all relative overflow-hidden group active:scale-95 ${
                  entry.supplements[item.key] 
                    ? 'bg-primary text-white shadow-[0_12px_24px_rgba(16,185,129,0.25)] scale-[1.02]' 
                    : 'bg-white text-slate-400 border border-slate-100 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                   entry.supplements[item.key] ? 'bg-white/20' : 'bg-slate-50'
                }`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: entry.supplements[item.key] ? "'FILL' 1" : "" }}>{item.icon}</span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                {entry.supplements[item.key] && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Checklist Groups */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Pola Makan & Mental</h3>
          </div>
          <div className="bg-white rounded-[40px] p-3 shadow-sm border border-slate-50 space-y-2">
            {[...CHECKLIST_ITEMS.makan, ...CHECKLIST_ITEMS.mental].map((item, idx) => {
              const category = idx < 4 ? 'mealMissions' : 'mentalMissions'
              const isActive = entry[category][item.key]
              return (
                <button
                  key={item.key}
                  disabled={todaySaved}
                  onClick={() => handleToggle(category, item.key)}
                  className={`w-full flex items-center justify-between p-4 rounded-[30px] transition-all active:scale-[0.98] border ${
                    isActive ? 'bg-emerald-50/50 border-primary/10' : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all shadow-sm ${
                      isActive ? 'bg-primary text-white rotate-6' : 'bg-slate-50 text-slate-300'
                    }`}>
                      <span className="material-symbols-outlined text-xl font-bold">done</span>
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className={`text-[15px] font-jakarta font-extrabold block leading-tight ${isActive ? 'text-primary' : 'text-slate-700'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.desc}</span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-300">
                       <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Condition Scores */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Kondisi Tubuh</h3>
          </div>
          <div className="bg-white rounded-[44px] p-10 shadow-sm border border-slate-50 space-y-12">
            <ScoreSlider 
              label="Tingkat Nyeri" 
              value={entry.conditionScores.painScore} 
              onChange={(v) => handleScore('painScore', v)}
              disabled={todaySaved}
              variant="danger"
              helperText={entry.conditionScores.painScore > 7 ? "Pusatkan napas, Kak 🧘‍♀️" : "Tetap tenang ya..."}
            />
            <ScoreSlider 
              label="Tingkat Cemas" 
              value={entry.conditionScores.anxietyScore} 
              onChange={(v) => handleScore('anxietyScore', v)}
              disabled={todaySaved}
              variant="warning"
              helperText={entry.conditionScores.anxietyScore > 7 ? "Ini hanya gema saraf 🌊" : "Tarik napas dalam..."}
            />
            <ScoreSlider 
              label="Kualitas Tidur" 
              value={entry.conditionScores.sleepQuality} 
              onChange={(v) => handleScore('sleepQuality', v)}
              disabled={todaySaved}
              variant="success"
              helperText={entry.conditionScores.sleepQuality > 7 ? "MasyaAllah, nyenyak ya ✨" : "Walmagh kerja saat tidur..."}
            />
          </div>
        </section>

        {/* Relapse Stepper */}
        <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 flex items-center justify-between group">
          <div className="text-left">
            <h3 className="text-[15px] font-jakarta font-extrabold text-slate-800 tracking-tight">Kambuh?</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">Gema kebiasaan lama</p>
          </div>
          <div className="flex items-center gap-5">
            <button 
              disabled={todaySaved || entry.relapseCount <= 0}
              onClick={() => setEntry(prev => ({ ...prev, relapseCount: prev.relapseCount - 1 }))}
              className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-all border border-slate-100 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-2xl">remove</span>
            </button>
            <div className="relative flex items-center justify-center">
              <span className="text-3xl font-jakarta font-black text-primary w-10 text-center z-10">{entry.relapseCount}</span>
              <div className="absolute inset-0 bg-emerald-50 rounded-full scale-125 blur-lg opacity-50" />
            </div>
            <button 
              disabled={todaySaved}
              onClick={() => setEntry(prev => ({ ...prev, relapseCount: prev.relapseCount + 1 }))}
              className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-2xl">add</span>
            </button>
          </div>
        </section>

        {/* Text Areas */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Catatan & Syukur</h3>
          </div>
          <div className="space-y-4">
            <div className="relative group">
              <textarea
                placeholder="Apa pemicu atau keluhan hari ini?"
                disabled={todaySaved}
                value={entry.triggers}
                onChange={(e) => setEntry(prev => ({ ...prev, triggers: e.target.value }))}
                className="w-full bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-[15px] font-medium min-h-[140px] resize-none leading-relaxed placeholder:text-slate-300"
              />
              <div className="absolute top-6 right-6 text-slate-200 group-focus-within:text-primary/20 transition-colors">
                <span className="material-symbols-outlined">edit_note</span>
              </div>
            </div>
            <div className="relative group">
              <textarea
                placeholder="Alhamdulillah, satu hal yang disyukuri..."
                disabled={todaySaved}
                value={entry.gratitude}
                onChange={(e) => setEntry(prev => ({ ...prev, gratitude: e.target.value }))}
                className="w-full bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-[15px] font-medium min-h-[140px] resize-none leading-relaxed italic placeholder:text-slate-300"
              />
              <div className="absolute top-6 right-6 text-slate-200 group-focus-within:text-secondary/20 transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </div>
            </div>
          </div>
        </section>

        {!todaySaved ? (
          <div className="pt-6 pb-10 space-y-4">
            <button 
              onClick={() => onSave(entry)}
              className="w-full py-6 bg-primary text-white rounded-[32px] font-jakarta font-extrabold text-lg shadow-[0_15px_30px_rgba(16,185,129,0.25)] active:scale-95 transition-all relative overflow-hidden"
            >
              Simpan & Lanjut
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine" />
            </button>
            <p className="text-center text-[12px] font-medium text-slate-400 italic">
              Data hanya disimpan di HP Kakak. Privasi terjaga. 🔒
            </p>
          </div>
        ) : (
          <div className="pt-6 pb-10">
            <div className="w-full py-6 bg-emerald-50 text-primary rounded-[32px] font-jakarta font-extrabold text-center flex items-center justify-center gap-3 border-2 border-primary/10 shadow-sm animate-in zoom-in duration-500">
              <span className="material-symbols-outlined text-2xl font-black">check_circle</span>
              Alhamdulillah, Jurnal Tersimpan
            </div>
          </div>
        )}
      </main>

      <BottomNavBar activeScreen="journal" onNavigate={setScreen} />
    </div>
  )
}

function ScoreSlider({ label, value, onChange, disabled, variant, helperText }) {
  const configs = {
    danger: { color: 'text-rose-500', bg: 'bg-rose-500', track: 'bg-rose-50' },
    warning: { color: 'text-secondary', bg: 'bg-secondary', track: 'bg-amber-50' },
    success: { color: 'text-primary', bg: 'bg-primary', track: 'bg-emerald-50' }
  }
  const config = configs[variant] || configs.success

  return (
    <div className="space-y-6 relative group">
      <div className="flex justify-between items-end px-1">
        <div>
          <span className="text-[15px] font-jakarta font-extrabold text-slate-800 block mb-0.5">{label}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{helperText}</span>
        </div>
        <div className={`text-4xl font-jakarta font-black transition-all group-hover:scale-110 ${config.color}`}>
          {value}
        </div>
      </div>
      
      <div className="relative flex items-center pt-2">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-3 ${config.track} rounded-full appearance-none cursor-pointer accent-primary border border-slate-50 shadow-inner`}
        />
      </div>

      <div className="flex justify-between px-2">
        <div className="flex flex-col items-start gap-1">
          <div className="w-1 h-1 bg-slate-200 rounded-full" />
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Sangat Baik</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="w-1 h-1 bg-slate-200 rounded-full" />
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Sangat Buruk</span>
        </div>
      </div>
    </div>
  )
}
