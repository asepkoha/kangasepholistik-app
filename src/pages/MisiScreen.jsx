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
    pola_pikir: 'from-primary to-teal-800',
    pola_makan: 'from-amber-500 to-amber-700',
    pola_tidur: 'from-slate-700 to-slate-900'
  }

  const phaseLabels = {
    pola_pikir: 'Pola Pikir',
    pola_makan: 'Pola Makan',
    pola_tidur: 'Pola Tidur'
  }

  return (
    <div className="min-h-screen bg-background-cream pb-32 animate-fade-in font-sans">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 h-16 bg-background-cream/80 backdrop-blur-md border-b border-primary/5 rounded-b-[24px]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen('home')} 
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-primary/5 active:scale-90 transition-all"
            id="btn-back-home"
          >
            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
          </button>
          <span className="text-lg font-bold text-primary tracking-tight">Misi Hari Ke-{currentDay}</span>
        </div>
        <button 
          onClick={() => setScreen('sos')}
          className="w-11 h-11 bg-[#0A4A3C] text-white rounded-xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-sm"
          id="btn-sos-misi"
          aria-label="Tombol SOS darurat"
        >
          SOS
        </button>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Phase Header Card */}
        <div className={`p-8 rounded-[32px] bg-gradient-to-br ${phaseColors[lesson.phase]} text-white shadow-xl shadow-teal-900/10 relative overflow-hidden`}>
          <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12">
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
          
          <h1 className="text-2xl font-bold leading-tight mb-2 relative z-10">{lesson.title}</h1>
          <p className="text-white/70 text-xs font-medium relative z-10">Dengarkan pesan hangat dari Kang Asep hari ini.</p>
        </div>

        {/* Audio Player Card - Premium Interaction */}
        <section className="bg-white rounded-[40px] p-8 shadow-soft-ambient border border-slate-100/50 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
             <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full space-y-3">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.15em]">Audio Voice Note</h3>
                   <p className="text-[10px] text-slate-400 font-medium">Langkah demi langkah menuju pulih</p>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  {currentTime} / {lesson.audioGuideDuration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button 
                onClick={() => { if(audioRef.current) audioRef.current.currentTime -= 10 }}
                className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-primary transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-3xl">replay_10</span>
              </button>
              
              <button 
                onClick={toggleAudio}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 shadow-2xl ${playing ? 'bg-primary-dark shadow-primary/30' : 'bg-primary shadow-primary/20 hover:scale-105'}`}
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
                className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-primary transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-3xl">forward_10</span>
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
              <div className="bg-amber-50/50 px-4 py-3 rounded-2xl border border-amber-100 w-full text-center">
                <p className="text-[11px] text-amber-700 font-medium italic">
                  "Voice note sedang disiapkan — Kakak bisa baca ringkasannya dulu di bawah ya 🌿"
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Content Body - Empathetic Reading */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">chat_bubble</span>
            </div>
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Pesan Kang Asep</h3>
          </div>
          
          <div className="bg-white rounded-[40px] p-10 shadow-soft-ambient border border-slate-50 relative">
            <div className="absolute top-6 left-6 text-primary/5 scale-[4]">
              <span className="material-symbols-outlined">format_quote</span>
            </div>
            <div className="prose prose-slate max-w-none relative z-10">
              {lesson.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed text-[17px] font-medium mb-6">
                  {para}
                </p>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-50 mt-8 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-slate-300">person</span>
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-800">Kang Asep</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Sahabat Pemulihanmu</p>
               </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Suggestions - Integrated Material Links */}
        {lesson.deepdiveTopics && lesson.deepdiveTopics.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Edukasi Terkait</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">DIPERLUKAN</span>
            </div>
            
            <div className="grid gap-4">
              {lesson.deepdiveTopics.map((topicId) => (
                <button 
                  key={topicId}
                  onClick={() => setScreen('materi')} 
                  className="w-full flex items-center gap-5 p-5 bg-white rounded-[28px] shadow-sm border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all active:scale-[0.98] group"
                  id={`btn-deepdive-${topicId}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <span className="material-symbols-outlined text-2xl">menu_book</span>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[15px] font-bold text-slate-800 block mb-0.5 capitalize">{topicId.replace(/-/g, ' ')}</span>
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
            className="w-full h-20 bg-primary text-white rounded-[28px] font-black text-lg shadow-xl shadow-primary/20 hover:bg-[#0A4A3C] active:scale-[0.97] transition-all flex items-center justify-center gap-4"
            id="btn-selesai-belajar"
          >
            <span>Alhamdulillah, Selesai Belajar</span>
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
          <p className="text-center mt-6 text-[12px] text-slate-400 font-medium px-8">
            Klik tombol di atas untuk melanjutkan pengisian jurnal harianmu, Kak. 🌿
          </p>
        </div>
      </main>
    </div>
  )
}
