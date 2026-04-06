import { useState, useRef, useEffect } from 'react'
import { DAILY_LESSONS, getPhase, SCORE_MESSAGES } from '../data/programData'
import { calcScore } from '../hooks/useAppState'

export default function LessonScreen({ currentDay, todayEntry, lessonsSeen, onDone }) {
  const lesson = DAILY_LESSONS[currentDay - 1]
  const phase = getPhase(currentDay)
  const score = todayEntry ? calcScore(todayEntry) : 0
  const alreadySeen = lessonsSeen.includes(currentDay)

  const [stage, setStage] = useState(alreadySeen ? 'lesson' : 'reward')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // Reward message based on score
  const rewardMsg = score >= 90 ? SCORE_MESSAGES.perfect
    : score >= 70 ? SCORE_MESSAGES.great
    : score >= 40 ? SCORE_MESSAGES.good
    : SCORE_MESSAGES.low

  useEffect(() => {
    if (stage === 'reward' && !alreadySeen) {
      // Auto advance to lesson after 3s
      const t = setTimeout(() => setStage('lesson'), 3500)
      return () => clearTimeout(t)
    }
  }, [stage, alreadySeen])

  function toggleAudio() {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play(); setPlaying(true) }
  }

  if (!lesson) return null

  // ── STAGE 1: Reward animation ──
  if (stage === 'reward') {
    return (
      <div className="page animate-fade-in" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', padding: 24, textAlign: 'center',
        background: 'linear-gradient(160deg, #E1F5EE 0%, #F5F7F6 60%)',
      }}>
        <div style={{ fontSize: 72, marginBottom: 16, animation: 'pulse 1s ease infinite' }}>
          {score >= 80 ? '🌟' : score >= 50 ? '✅' : '💪'}
        </div>
        <h1 style={{ fontSize: 26, marginBottom: 8, color: 'var(--teal-dark)' }}>
          {rewardMsg.label}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 300, lineHeight: 1.6, marginBottom: 24 }}>
          {rewardMsg.text}
        </p>

        {/* Score breakdown */}
        <div className="card animate-scale" style={{ width: '100%', maxWidth: 320, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 8 }}>SKOR IKHTIAR HARI INI</div>
          <ScoreRing score={score} />
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <ScoreBreak entry={todayEntry} />
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Memuat materi hari ini...</p>
        <button className="btn btn-outline" style={{ marginTop: 12, width: 'auto', padding: '10px 24px' }}
          onClick={() => setStage('lesson')}>
          Lihat Materi Hari Ini →
        </button>
      </div>
    )
  }

  // ── STAGE 2: VN Lesson ──
  return (
    <div className="page scroll-page" style={{ paddingBottom: 40 }}>
      <div className="container" style={{ paddingTop: 16 }}>

        {/* Back */}
        <button onClick={onDone}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-2)', marginBottom: 12 }}>
          ←
        </button>

        {/* Phase badge */}
        <div className="phase-badge" style={{
          background: phase.color + '20',
          color: phase.color,
          marginBottom: 12,
        }}>
          ● {phase.label} · Hari {currentDay}
        </div>

        {/* Lesson card */}
        <div className="lesson-card animate-fade-in" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7, marginBottom: 8 }}>
            MATERI HARI {currentDay}
          </div>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>{lesson.title}</h2>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>{lesson.summary}</p>
        </div>

        {/* Audio player */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
            🎙 Voice Note Kang Asep
          </div>

          {lesson.audioUrl ? (
            <>
              <audio ref={audioRef} src={lesson.audioUrl}
                onEnded={() => setPlaying(false)} style={{ display: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={toggleAudio}
                  style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--teal)', border: 'none',
                    color: 'white', fontSize: 18, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                  {playing ? '⏸' : '▶'}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{lesson.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Durasi ~3–5 menit</div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info">
              🎙 Voice note untuk hari ini belum tersedia — sedang disiapkan Kang Asep.
              <div style={{ marginTop: 8 }}>Baca ringkasan di atas sambil menunggu ya. 🌿</div>
            </div>
          )}
        </div>

        {/* Key points */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>💡 Poin Utama Hari Ini</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lesson.keyPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview besok */}
        {lesson.tomorrowPreview && (
          <div className="alert alert-info" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>📅 Preview Besok</div>
            <div style={{ fontSize: 13 }}>{lesson.tomorrowPreview}</div>
          </div>
        )}

        <button className="btn btn-primary" onClick={onDone}>
          Kembali ke Dashboard →
        </button>
      </div>
    </div>
  )
}

// ── Score ring SVG ─────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 40, cx = 55, cy = 55
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 80 ? '#1D9E75' : score >= 50 ? '#EF9F27' : '#E24B4A'

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width={110} height={110} viewBox="0 0 110 110">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg)" strokeWidth={8} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
        <text x={cx} y={cy - 4} textAnchor="middle"
          style={{ fontSize: 22, fontWeight: 800, fill: color }}>{score}</text>
        <text x={cx} y={cy + 14} textAnchor="middle"
          style={{ fontSize: 11, fill: 'var(--text-3)' }}>/ 100</text>
      </svg>
    </div>
  )
}

// ── Score breakdown ────────────────────────────────────────
function ScoreBreak({ entry }) {
  if (!entry) return null
  const items = [
    { label: 'Suplemen', pts: (entry.suplementPagi?10:0)+(entry.suplementSiang?10:0)+(entry.suplementMalam?10:0), max: 30 },
    { label: 'Pola Makan', pts: (entry.patuhPantangan?10:0)+(entry.teksturLembut?10:0)+(entry.kunyah30?10:0)+(entry.stopJam19?10:0), max: 40 },
    { label: 'Mental & Istirahat', pts: (entry.tidurCukup?10:0)+(entry.dzikirDoa?10:0)+(entry.olahNapas?10:0), max: 30 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(it => (
        <div key={it.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-2)' }}>{it.label}</span>
          <span style={{ fontWeight: 600, color: it.pts === it.max ? 'var(--teal)' : 'var(--orange)' }}>
            {it.pts}/{it.max}
          </span>
        </div>
      ))}
    </div>
  )
}
