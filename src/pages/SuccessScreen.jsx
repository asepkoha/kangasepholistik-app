import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

// ─── Brand colors ─────────────────────────────────────────────────────────────
const TEAL   = '#0D5C4A'
const TEAL2  = '#0D9488'
const AMBER  = '#E8A020'
const AMBER2 = '#F59E0B'
const GREEN  = '#10B981'

// ─── Multi-wave confetti burst ─────────────────────────────────────────────────
function fireCelebration() {
  const colors = [TEAL, TEAL2, AMBER, AMBER2, GREEN, '#ffffff']

  // Wave 1 — center burst (saat screen muncul)
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.5, y: 0.55 },
      colors,
      scalar: 1.1,
    })
  }, 100)

  // Wave 2 — kiri & kanan (delay 400ms)
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60,  spread: 55, origin: { x: 0, y: 0.6 }, colors })
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors })
  }, 400)

  // Wave 3 — shower dari atas (delay 900ms)
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.5, y: 0 },
      colors,
      gravity: 0.5,
      scalar: 0.8,
      drift: 0.3,
    })
  }, 900)
}

// ─── Animated XP counter ──────────────────────────────────────────────────────
function XPCounter({ target = 100 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.on('change', v => setDisplay(v))
    const controls = animate(count, target, {
      duration: 1.6,
      delay: 0.6,
      ease: [0.16, 1, 0.3, 1], // expo-out — cepat dulu, makin lambat saat mendekati target
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [target]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span>+{display} XP</span>
}

// ─── Star-burst ring ──────────────────────────────────────────────────────────
function StarRing() {
  return (
    <>
      {/* Ring pulse 1 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400/40"
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
      />
      {/* Ring pulse 2 — offset phase */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-teal-500/30"
        animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut', delay: 0.6 }}
      />
    </>
  )
}

// ─── Quotes rotator (brand voice H4 "Gema") ───────────────────────────────────
const AFFIRMATIONS = [
  'Ini bukan kebetulan — ini adalah "Gema baru" yang sedang kamu ukir 💛',
  'Tubuhmu tersenyum karena kamu menjaganya hari ini 🌿',
  'Satu langkah kecil hari ini adalah semen untuk pemulihan besok',
  'Bismillah, kamu sudah luar biasa. Istirahat yang cukup ya 🤍',
]

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SuccessScreen({ onContinue, xpEarned = 100 }) {
  const quoteRef = useRef(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)])

  useEffect(() => {
    fireCelebration()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center overflow-hidden relative">

      {/* ── Icon hero ── */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
        animate={{ scale: 1,   opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
        className="w-36 h-36 rounded-full flex items-center justify-center mb-8 relative"
        style={{ background: 'radial-gradient(circle at 35% 35%, #FDE68A, #F59E0B)' }}
      >
        <StarRing />
        <motion.span
          animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeInOut' }}
          className="material-symbols-outlined text-6xl text-white relative z-10 select-none"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          rewarded_ads
        </motion.span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
        className="text-3xl font-black text-primary mb-3 tracking-tighter leading-tight"
      >
        SubhanAllah,<br />Satu Langkah Hebat!
      </motion.h1>

      {/* ── Affirmation quote ── */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.38 }}
        className="text-slate-600 text-base leading-relaxed mb-10 max-w-[288px]"
      >
        {quoteRef.current}
      </motion.p>

      {/* ── XP Badge ── */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 18 }}
        className="w-full max-w-xs mb-4"
      >
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 relative overflow-hidden">
          {/* shimmer stripe */}
          <motion.div
            className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{ x: ['0%', '400%'] }}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
          />
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Capaian Hari Ini
          </span>
          <span className="text-3xl font-black text-amber-600">
            <XPCounter target={xpEarned} />
          </span>
          <p className="text-[11px] text-amber-600/70 mt-1">
            tersimpan di riwayat perjalananmu
          </p>
        </div>
      </motion.div>

      {/* ── Milestone micro-badges ── */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-2 mb-10"
      >
        {['🧠 Pikiran', '🌿 Lambung', '😴 Tidur'].map((label, i) => (
          <motion.span
            key={label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 400 }}
            className="text-[11px] font-semibold text-primary bg-primary/8 px-3 py-1.5 rounded-full"
          >
            {label}
          </motion.span>
        ))}
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.72 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={onContinue}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Lanjutkan Perjalanan →
        </button>
        <p className="text-xs text-slate-400 mt-3">
          Istirahat yang cukup ya, besok kita lanjut 🤍
        </p>
      </motion.div>

    </div>
  )
}
