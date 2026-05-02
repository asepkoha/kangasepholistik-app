import { useState, useEffect, useRef } from 'react'

const PHASES_BREATH = [
  { label: 'Tarik Napas', sub: 'Lewat Hidung', duration: 4000, scale: 1.5, opacity: 0.8 },
  { label: 'Tahan', sub: 'Tetap Tenang', duration: 4000, scale: 1.5, opacity: 0.6 },
  { label: 'Hembuskan', sub: 'Lewat Mulut', duration: 6000, scale: 1, opacity: 0.4 },
]

export default function SOSScreen({ onBack }) {
  const [active, setActive] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  const startBreathing = () => {
    setActive(true)
    setIsPlaying(true)
    setPhaseIdx(0)
  }

  useEffect(() => {
    if (!isPlaying) return

    const phase = PHASES_BREATH[phaseIdx]
    timerRef.current = setTimeout(() => {
      setPhaseIdx((prev) => (prev + 1) % PHASES_BREATH.length)
    }, phase.duration)

    return () => clearTimeout(timerRef.current)
  }, [isPlaying, phaseIdx])

  const currentPhase = PHASES_BREATH[phaseIdx]

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden ${
      active ? 'bg-slate-950' : 'bg-background'
    }`}>
      {/* Header */}
      {!active && (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-primary/5">
          <div className="max-w-md mx-auto flex items-center px-6 h-20">
            <button 
              onClick={onBack} 
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <h2 className="ml-4 text-[17px] font-jakarta font-extrabold text-primary tracking-tight">Mode SOS</h2>
          </div>
        </header>
      )}

      <main className={`flex-1 flex flex-col items-center justify-center px-8 text-center ${active ? 'pt-0' : 'pt-24 pb-32'}`}>
        {!active ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-sm">
            <div className="relative inline-flex mb-2 group">
               <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto shadow-[0_12px_40px_rgba(16,185,129,0.12)] border-2 border-emerald-50 transition-transform group-hover:scale-105">
                 <span className="material-symbols-outlined text-5xl text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
               </div>
               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-md border-2 border-white">
                 <span className="text-white text-[12px] font-black">!</span>
               </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-jakarta font-extrabold text-slate-900 tracking-tight leading-tight">Tenang, Kamu Aman 🌿</h2>
              <p className="text-slate-600 leading-relaxed text-[15px] font-medium px-2">
                Sensasi yang kamu rasakan nyata, tapi <span className="font-bold text-primary italic">tidak berbahaya</span>. 
                Itu hanya "Gema" dari saraf yang sedang sensitif.
              </p>
            </div>

            <button 
              onClick={startBreathing}
              className="w-full py-5 bg-primary text-white rounded-[32px] font-jakarta font-black text-xl shadow-[0_12px_30px_rgba(16,185,129,0.25)] active:scale-[0.97] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Mulai Napas 4-4-6
            </button>

            <div className="p-8 bg-white rounded-[40px] border border-slate-50 text-left space-y-3 shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-emerald-50 opacity-20">
                <span className="material-symbols-outlined text-7xl">verified_user</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_moon</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Protokol Keamanan</span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed italic font-medium relative z-10">
                Aplikasi ini adalah pendamping pemulihan. Jika kamu merasa gejala sangat darurat secara fisik, silakan hubungi bantuan medis segera.
              </p>
            </div>

            <a 
              href="tel:119"
              className="inline-flex items-center gap-2 text-red-500 font-black text-[13px] uppercase tracking-widest bg-red-50/50 px-8 py-4 rounded-full hover:bg-red-50 transition-colors border border-red-100"
            >
              <span className="material-symbols-outlined text-xl">call</span>
              Panggil Darurat (119)
            </a>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000 w-full max-w-md">
            {/* Breathing Circle Container */}
            <div className="relative flex items-center justify-center py-20">
              {/* Outer Pulse Rings */}
              <div className={`absolute w-72 h-72 border border-primary/20 rounded-full transition-all duration-[4000ms] ease-in-out ${
                phaseIdx === 0 ? 'scale-150 opacity-0' : 'scale-100 opacity-10'
              }`}></div>
              <div className={`absolute w-80 h-80 border border-primary/10 rounded-full transition-all duration-[4000ms] ease-in-out delay-500 ${
                phaseIdx === 0 ? 'scale-150 opacity-0' : 'scale-100 opacity-5'
              }`}></div>
              
              {/* Main Circle */}
              <div 
                className="w-56 h-56 rounded-full bg-gradient-to-br from-primary to-emerald-900 shadow-[0_0_80px_rgba(16,185,129,0.4)] flex flex-col items-center justify-center transition-all ease-in-out border-4 border-white/10"
                style={{ 
                  transform: `scale(${currentPhase.scale})`,
                  opacity: currentPhase.opacity,
                  transitionDuration: `${currentPhase.duration}ms`
                }}
              >
                <span className="text-white text-3xl font-jakarta font-black mb-1 tracking-tight">{currentPhase.label}</span>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{currentPhase.sub}</span>
              </div>
            </div>

            <div className="space-y-8 px-8">
              <div className="flex justify-center gap-3">
                {PHASES_BREATH.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 rounded-full transition-all duration-700 ${
                      phaseIdx === i ? 'w-10 bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'w-2.5 bg-slate-800'
                    }`}
                  ></div>
                ))}
              </div>
              
              <p className="text-slate-400 text-[15px] italic leading-relaxed px-4 font-medium animate-pulse">
                "SubhanAllah, setiap hembusan napas adalah perintah mutlak bagi saraf untuk masuk ke mode <span className="text-primary font-black uppercase tracking-wider">Rest & Digest</span>."
              </p>
            </div>

            <button 
              onClick={() => {
                setActive(false)
                setIsPlaying(false)
              }}
              className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[32px] border border-white/10 text-base font-bold active:scale-95 transition-all shadow-xl backdrop-blur-sm"
            >
              Sudah Lebih Tenang 🌿
            </button>
          </div>
        )}
      </main>

      {/* Safety Bottom Label */}
      {active && (
        <div className="pb-12 text-center animate-in fade-in duration-1000 delay-1000">
           <a 
              href="tel:119"
              className="text-red-500/40 font-black text-[10px] uppercase tracking-[0.4em] hover:text-red-500 transition-colors"
            >
              SOS DARURAT 119
            </a>
        </div>
      )}
    </div>
  )
}
