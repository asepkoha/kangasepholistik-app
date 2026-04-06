import { useState, useEffect, useRef } from 'react'

const PHASES_BREATH = [
  { label: 'Tarik', sub: '(Hidung)', duration: 4000 },
  { label: 'Tahan', sub: '',         duration: 7000 },
  { label: 'Buang', sub: '(Mulut)',  duration: 8000 },
]

export default function SOSScreen({ onBack }) {
  const [active, setActive] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [scale, setScale] = useState(0.6)
  const intervalRef = useRef(null)

  function startBreathing() {
    setActive(true)
    setPhaseIdx(0)
  }

  useEffect(() => {
    if (!active) return
    const ph = PHASES_BREATH[phaseIdx]

    // Animate scale
    setScale(phaseIdx === 0 ? 1 : phaseIdx === 2 ? 0.6 : 0.9)

    intervalRef.current = setTimeout(() => {
      setPhaseIdx(prev => (prev + 1) % PHASES_BREATH.length)
    }, ph.duration)

    return () => clearTimeout(intervalRef.current)
  }, [active, phaseIdx])

  const currentPhase = PHASES_BREATH[phaseIdx]

  return (
    <div className="page" style={{
      background: active ? '#050F0A' : 'var(--bg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.8s ease',
    }}>

      {!active ? (
        // ── Calm page ──
        <div className="container" style={{ paddingTop: 16, paddingBottom: 40 }}>
          <button onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-2)', marginBottom: 16 }}>
            ←
          </button>

          <div className="card animate-fade-in" style={{ marginBottom: 16, textAlign: 'center', padding: '24px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
            <h2 style={{ marginBottom: 8 }}>Kamu Tidak Sendiri</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Yang kamu rasakan sekarang nyata, tapi tidak berbahaya.
              Ini respons sistem sarafmu yang terlalu aktif.
              Kita tenangkan bersama dengan pernapasan.
            </p>
            <button className="btn btn-primary" onClick={startBreathing}>
              Mulai Teknik Pernapasan
            </button>
          </div>

          <div className="alert alert-warning" style={{ marginBottom: 12 }}>
            <strong>Jika kamu mengalami:</strong> nyeri dada hebat, sesak napas parah, atau gejala yang sangat mengkhawatirkan —
            <strong> segera hubungi tenaga medis atau pergi ke IGD.</strong>
          </div>

          <a href="tel:119"
            className="btn btn-ghost"
            style={{ textDecoration: 'none', marginBottom: 8 }}>
            📞 Hubungi 119 (Darurat Medis)
          </a>
        </div>
      ) : (
        // ── Breathing exercise ──
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 24, textAlign: 'center',
        }}>
          {/* Breathing circle */}
          <div style={{
            width: 180, height: 180,
            borderRadius: '50%',
            border: '2px solid rgba(29,158,117,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 40,
            position: 'relative',
          }}>
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(29,158,117,0.3) 0%, rgba(29,158,117,0.05) 100%)',
              border: '2px solid rgba(29,158,117,0.5)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              transform: `scale(${scale})`,
              transition: `transform ${currentPhase.duration}ms ease-in-out`,
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1D9E75' }}>
                {currentPhase.label}
              </div>
              {currentPhase.sub && (
                <div style={{ fontSize: 12, color: 'rgba(29,158,117,0.7)' }}>
                  {currentPhase.sub}
                </div>
              )}
            </div>
          </div>

          <h2 style={{ color: 'white', marginBottom: 8 }}>Tenangkan Pikiran</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 260, lineHeight: 1.6, marginBottom: 40 }}>
            Ikuti irama lingkaran. Tarik napas saat membesar, buang napas saat mengecil. Kamu aman.
          </p>

          {/* Phase indicators */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
            {PHASES_BREATH.map((ph, i) => (
              <div key={i} style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12, fontWeight: 600,
                background: phaseIdx === i ? '#1D9E75' : 'rgba(255,255,255,0.08)',
                color: phaseIdx === i ? 'white' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s',
              }}>{ph.label}</div>
            ))}
          </div>

          <button
            onClick={() => { setActive(false); setPhaseIdx(0) }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 40, padding: '12px 32px',
              color: 'white', fontSize: 14, cursor: 'pointer',
            }}>
            Saya Sudah Tenang
          </button>
        </div>
      )}
    </div>
  )
}
