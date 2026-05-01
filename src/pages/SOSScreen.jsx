import { useState, useEffect, useRef } from 'react'

const PHASES_BREATH = [
  { label: 'Tarik Napas', sub: 'Lewat Hidung', duration: 4000, scale: 1.5, opacity: 0.8 },
  { label: 'Tahan', sub: 'Tetap Tenang', duration: 7000, scale: 1.5, opacity: 0.6 },
  { label: 'Hembuskan', sub: 'Lewat Mulut', duration: 8000, scale: 1, opacity: 0.4 },
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
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col ${
      active ? 'bg-slate-950' : 'bg-background'
    }`}>
      {/* Header */}
      {!active && (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center px-6 py-4 h-16 bg-background/80 backdrop-blur-md">
          <button onClick={onBack} className="material-symbols-outlined text-slate-400">arrow_back</button>
          <span className="ml-3 text-xl font-bold text-primary">Kembali</span>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {!active ? (
          <div className="space-y-8 animate-fade-in max-w-sm">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-primary animate-pulse">favorite</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tenang, Kamu Aman 🌿</h2>
              <p className="text-slate-500 leading-relaxed">
                Sensasi yang kamu rasakan nyata, tapi tidak berbahaya. Itu hanya sinyal dari saraf yang terlalu aktif. 
                Yuk, kita tenangkan bersama.
              </p>
            </div>

            <button 
              onClick={startBreathing}
              className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Mulai Napas 4-7-8
            </button>

            <div className="p-6 bg-amber-50 rounded-[24px] border border-amber-100 text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-700">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Penting</span>
              </div>
              <p className="text-[12px] text-amber-800/80 leading-relaxed italic">
                Jika nyeri dada hebat, sesak parah, atau gejala sangat mengkhawatirkan, segera hubungi IGD atau tekan tombol di bawah.
              </p>
            </div>

            <a 
              href="tel:119"
              className="inline-flex items-center gap-2 text-red-500 font-bold text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              Panggil Darurat (119)
            </a>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in w-full max-w-md">
            {/* Breathing Circle Container */}
            <div className="relative flex items-center justify-center py-20">
              {/* Outer Pulse Rings */}
              <div className={`absolute w-64 h-64 border border-primary/20 rounded-full transition-transform duration-[4000ms] ease-in-out ${
                phaseIdx === 0 ? 'scale-150 opacity-0' : 'scale-100 opacity-10'
              }`}></div>
              
              {/* Main Circle */}
              <div 
                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-teal-700 shadow-2xl shadow-primary/40 flex flex-col items-center justify-center transition-all ease-in-out"
                style={{ 
                  transform: `scale(${currentPhase.scale})`,
                  opacity: currentPhase.opacity,
                  transitionDuration: `${currentPhase.duration}ms`
                }}
              >
                <span className="text-white text-2xl font-black mb-1">{currentPhase.label}</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{currentPhase.sub}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {PHASES_BREATH.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      phaseIdx === i ? 'w-8 bg-primary' : 'w-2 bg-slate-800'
                    }`}
                  ></div>
                ))}
              </div>
              
              <p className="text-slate-500 text-sm italic max-w-[280px] mx-auto leading-relaxed">
                "SubhanAllah, setiap hembusan napas adalah perintah bagi tubuhmu untuk kembali tenang."
              </p>
            </div>

            <button 
              onClick={() => {
                setActive(false)
                setIsPlaying(false)
              }}
              className="px-10 py-4 bg-slate-900 text-slate-400 rounded-full border border-slate-800 text-sm font-bold active:scale-95 transition-all"
            >
              Sudah Lebih Tenang
            </button>
          </div>
        )}
      </main>

      {/* Safety Bottom Label */}
      {active && (
        <div className="pb-10 text-center">
           <a 
              href="tel:119"
              className="text-red-500/50 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-red-500"
            >
              Emergency 119
            </a>
        </div>
      )}
    </div>
  )
}
