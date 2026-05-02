import { useState, useRef, useEffect } from 'react'
import { getLessonByDay } from '../data/lessons'

export default function MisiScreen({ currentDay, onDone, setScreen }) {
  const lesson = getLessonByDay(currentDay)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100
      setProgress(p)
      
      const mins = Math.floor(audio.currentTime / 60)
      const secs = Math.floor(audio.currentTime % 60)
      setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  if (!lesson) return null

  function toggleAudio() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  const phaseColors = {
    pola_pikir: 'from-primary to-primary-dark',
    pola_makan: 'from-amber-500 to-amber-700',
    pola_tidur: 'from-indigo-600 to-indigo-800'
  }

  const phaseLabels = {
    pola_pikir: 'Pola Pikir',
    pola_makan: 'Pola Makan',
    pola_tidur: 'Pola Tidur'
  }

  return (
    <div className="min-h-screen bg-background pb-32 animate-fade-in font-inter overflow-x-hidden">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-primary/5">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 h-20">
          <div className="flex items-center gap-3 overflow-hidden">
            <button 
              onClick={() => setScreen('home')} 
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all shrink-0"
              id="btn-back-home"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <h2 className="text-[17px] font-jakarta font-extrabold text-primary tracking-tight truncate">Misi Hari Ke-{currentDay}</h2>
          </div>
          <button 
            onClick={() => setScreen('sos')}
            className="px-4 h-11 min-w-[44px] bg-primary text-white rounded-2xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-md shadow-primary/20 shrink-0"
            id="btn-sos-misi"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-28 space-y-8">
        {/* Phase Header Card */}
        <div className={`p-8 rounded-[40px] bg-gradient-to-br ${phaseColors[lesson.phase]} text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden`}>
          <div className="absolute -right-6 -bottom-6 opacity-10 scale-150 rotate-12">
            <span className="material-symbols-outlined text-9xl">spa</span>
          </div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              Fase {phaseLabels[lesson.phase]}
            </span>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <span className="text-[10px] font-bold tracking-wider">{lesson.estimatedDuration}</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-jakarta font-extrabold leading-tight mb-2 relative z-10">{lesson.title}</h1>
          <p className="text-white/80 text-[13px] font-semibold relative z-10">Dengarkan pesan hangat dari Kang Asep hari ini.</p>
        </div>

        {/* Audio Player Card - Premium Interaction */}
        <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
             <div 
                className="h-full bg-primary transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full space-y-3">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.15em]">Audio Voice Note</h3>
                   <p className="text-[10px] text-slate-400 font-bold">Langkah demi langkah menuju pulih</p>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-emerald-50/50 px-3 py-1 rounded-full border border-primary/5">
                  {currentTime} / {lesson.audioGuideDuration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button 
                onClick={() => { if(audioRef.current) audioRef.current.currentTime -= 10 }}
                className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 600" }}>replay_10</span>
              </button>
              
              <button 
                onClick={toggleAudio}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 shadow-2xl ${playing ? 'bg-primary shadow-primary/30 scale-105' : 'bg-primary shadow-primary/20 hover:scale-110'}`}
                id="btn-play-audio"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {playing && (
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
                  )}
                  <span className="material-symbols-outlined text-5xl text-white leading-none relative z-10">
                    {playing ? 'pause' : 'play_arrow'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => { if(audioRef.current) audioRef.current.currentTime += 10 }}
                className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 600" }}>forward_10</span>
              </button>
            </div>

            {lesson.audioUrl ? (
              <audio 
                ref={audioRef} 
                src={lesson.audioUrl} 
                onEnded={() => setPlaying(false)}
                className="hidden"
              />
            ) : (
              <div className="bg-emerald-50/50 px-6 py-4 rounded-[28px] border border-primary/10 w-full text-center">
                <p className="text-[13px] text-primary font-bold italic leading-relaxed">
                  "Voice note sedang disiapkan — Kakak bisa baca ringkasannya dulu di bawah ya 🌿"
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Content Body - Empathetic Reading */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
            </div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Pesan Kang Asep</h3>
          </div>
          
          <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-sm border border-slate-50 relative overflow-hidden">
            {/* Background quote mark */}
            <span className="material-symbols-outlined absolute -top-4 -left-4 text-9xl text-slate-50/80 select-none">format_quote</span>
            
            <div className="prose prose-slate max-w-none relative z-10">
              {lesson.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed text-[17px] font-medium mb-6 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
            
            <div className="pt-8 border-t border-slate-50 mt-10 flex items-center gap-4">
               <div className="w-14 h-14 rounded-[20px] bg-emerald-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
               </div>
               <div>
                  <p className="text-base font-jakarta font-bold text-slate-800">Kang Asep</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Sahabat Pemulihanmu</p>
               </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Suggestions - Integrated Material Links */}
        {lesson.deepdiveTopics && lesson.deepdiveTopics.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Edukasi Terkait</h3>
              <span className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">DIPERLUKAN</span>
            </div>
            
            <div className="grid gap-4">
              {lesson.deepdiveTopics.map((topicId) => (
                <button 
                  key={topicId}
                  onClick={() => setScreen('materi')} 
                  className="w-full flex items-center gap-5 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:border-primary/20 hover:bg-emerald-50/30 transition-all active:scale-[0.98] group"
                  id={`btn-deepdive-${topicId}`}
                >
                  <div className="w-14 h-14 rounded-[20px] bg-emerald-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-primary/5">
                    <span className="material-symbols-outlined text-2xl">menu_book</span>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[15px] font-jakarta font-bold text-slate-800 block mb-0.5 capitalize">{topicId.replace(/-/g, ' ')}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">BACA MODUL LENGKAP</span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Primary Action - Connect to Journal */}
        <div className="pt-10 pb-12">
          <button 
            onClick={onDone}
            className="w-full h-20 bg-primary text-white rounded-[32px] font-jakarta font-extrabold text-lg shadow-button-premium hover:bg-primary-dark active:scale-[0.97] transition-all flex items-center justify-center gap-4 group"
            id="btn-selesai-belajar"
          >
            <span>Alhamdulillah, Selesai Belajar</span>
            <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
          <p className="text-center mt-6 text-[12px] text-slate-400 font-bold px-8 leading-relaxed">
            Klik tombol di atas untuk melanjutkan pengisian jurnal harianmu, Kak. 🌿
          </p>
        </div>
      </main>
    </div>
  )
}
