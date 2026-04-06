import { useMemo, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { calcScore, calcStreak } from '../hooks/useAppState'
import { PROGRAM_DAYS, DAILY_MOTIVATIONS, getPhase } from '../data/programData'

export default function HomeScreen({
  profile, journal, currentDay, todaySaved, streak,
  isComplete, setScreen, backup, restore, resetAll,
}) {
  const restoreRef = useRef()

  const phase = getPhase(currentDay)
  const progress = Math.round((currentDay / PROGRAM_DAYS) * 100)
  const motivation = DAILY_MOTIVATIONS[(currentDay - 1) % DAILY_MOTIVATIONS.length]

  // Stats dari semua hari yang sudah diisi
  const stats = useMemo(() => {
    const days = Object.values(journal)
    if (!days.length) return { nyeri: '-', cemas: '-', panik: '-', tidur: '-', kambuh: '-' }
    const last = days[days.length - 1]
    return {
      nyeri:  last.nyeri,
      cemas:  last.cemas,
      panik:  last.panik,
      tidur:  last.tidur,
      kambuh: last.kambuh + 'x',
    }
  }, [journal])

  // Chart data
  const chartData = useMemo(() => {
    return Array.from({ length: currentDay }, (_, i) => {
      const d = i + 1
      const e = journal[d]
      return {
        day: 'H' + d,
        nyeri:  e?.nyeri  ?? null,
        cemas:  e?.cemas  ?? null,
        kambuh: e?.kambuh ?? null,
        tidur:  e?.tidur  ?? null,
      }
    })
  }, [journal, currentDay])

  // Rata-rata skor
  const avgScore = useMemo(() => {
    const entries = Object.values(journal).filter(e => e.savedAt)
    if (!entries.length) return 0
    return Math.round(entries.reduce((s, e) => s + calcScore(e), 0) / entries.length)
  }, [journal])

  // History table
  const historyRows = useMemo(() => {
    return Object.entries(journal)
      .map(([day, e]) => ({ day: Number(day), ...e }))
      .sort((a, b) => b.day - a.day)
      .slice(0, 14)
  }, [journal])

  return (
    <div className="page scroll-page" style={{ paddingBottom: 40 }}>
      <div className="container" style={{ paddingTop: 16 }}>

        {/* Header card */}
        <div className="header-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ color: 'white', marginBottom: 2 }}>Halo, {profile.name.split(' ')[0]} 👋</h2>
              <p style={{ fontSize: 13 }}>{motivation}</p>
            </div>
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 20, padding: '3px 10px',
              fontSize: 12, fontWeight: 600, color: 'white',
            }}>
              {phase.label}
            </span>
          </div>

          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>
              Hari {currentDay} / {PROGRAM_DAYS}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: progress + '%' }} />
          </div>
        </div>

        {/* Complete banner */}
        {isComplete && (
          <div className="card animate-scale" style={{
            background: 'linear-gradient(135deg, #0F6E56, #085041)',
            color: 'white', textAlign: 'center', marginBottom: 16,
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
            <h2 style={{ color: 'white', marginBottom: 6 }}>Program Selesai!</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16 }}>
              Alhamdulillah, kamu sudah menyelesaikan 14 hari.
              Lanjut program Maintenance agar hasilnya lebih stabil.
            </p>
            <button className="btn" style={{ background: 'white', color: 'var(--teal-dark)', fontWeight: 700 }}>
              Lanjut Maintenance →
            </button>
          </div>
        )}

        {/* SOS */}
        <button className="sos-btn" onClick={() => setScreen('sos')}>
          ♥ SAYA SEDANG PANIK (SOS)
        </button>

        {/* Jurnal hari ini */}
        {!isComplete && (
          <div className="card" style={{ marginBottom: 12 }}>
            {todaySaved ? (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Selesai Untuk Hari Ini</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
                  Jurnal dibuka kembali besok.
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>📔 Jurnal Hari Ke-{currentDay}</div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 8px',
                    borderRadius: 20, background: 'var(--teal-light)', color: 'var(--teal-dark)',
                  }}>BELUM DIISI</span>
                </div>
                <p style={{ fontSize: 13, marginBottom: 12 }}>
                  Isi jurnal malam ini untuk membuka materi hari ini dari Kang Asep.
                </p>
                <button className="btn btn-primary" onClick={() => setScreen('journal')}>
                  Isi Jurnal Sekarang →
                </button>
              </>
            )}
          </div>
        )}

        {/* Streak + Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div className="streak-badge" style={{ gridColumn: 1 }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <span className="streak-num">{streak}</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)' }}>STREAK</span>
          </div>
          <div className="metric-pill">
            <div className="metric-val" style={{ color: 'var(--red)' }}>{stats.nyeri}</div>
            <div className="metric-label">NYERI</div>
          </div>
          <div className="metric-pill">
            <div className="metric-val" style={{ color: 'var(--orange)' }}>{stats.cemas}</div>
            <div className="metric-label">CEMAS</div>
          </div>
          <div className="metric-pill">
            <div className="metric-val" style={{ color: 'var(--red)' }}>{stats.panik}</div>
            <div className="metric-label">PANIK</div>
          </div>
          <div className="metric-pill">
            <div className="metric-val" style={{ color: 'var(--teal)' }}>{stats.tidur}</div>
            <div className="metric-label">TIDUR</div>
          </div>
          <div className="metric-pill">
            <div className="metric-val" style={{ color: 'var(--orange)' }}>{stats.kambuh}</div>
            <div className="metric-label">KAMBUH/HARI</div>
          </div>
        </div>

        {/* BB */}
        {profile.weightStart && (
          <div className="card" style={{ marginBottom: 12, padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--text-2)' }}>⚖️ Berat Badan</span>
              <span style={{ fontWeight: 600 }}>
                {profile.weightStart} kg → {Object.values(journal).reverse().find(e => e.weight)?.weight || '-'} kg
              </span>
            </div>
          </div>
        )}

        {/* Grafik perkembangan */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>📈 Grafik Perkembangan</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--text-3)' }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: 'var(--text-3)' }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid var(--border)' }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="nyeri"  stroke="#E24B4A" dot={{ r: 3 }} strokeWidth={2} connectNulls={false} name="Nyeri" />
              <Line type="monotone" dataKey="cemas"  stroke="#EF9F27" dot={{ r: 3 }} strokeWidth={2} connectNulls={false} name="Cemas" />
              <Line type="monotone" dataKey="tidur"  stroke="#1D9E75" dot={{ r: 3 }} strokeWidth={2} connectNulls={false} name="Tidur" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, justifyContent: 'center' }}>
            {[['Nyeri','#E24B4A'],['Cemas','#EF9F27'],['Tidur','#1D9E75']].map(([l,c]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-2)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Statistik */}
        <div className="card" style={{ marginBottom: 12, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--teal)' }}>
                {avgScore}<span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 400 }}>/100</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Rata-Rata Kestabilan
              </div>
              <div style={{ fontSize: 12, color: avgScore >= 80 ? 'var(--teal)' : 'var(--orange)', marginTop: 2, fontWeight: 500 }}>
                {avgScore >= 80 ? 'Ikhtiar Konsisten 🌿' : avgScore >= 50 ? 'Terus Semangat' : 'Ayo Kejar Ketertinggalan'}
              </div>
            </div>
            <button
              className="btn btn-outline btn-sm"
              style={{ width: 'auto' }}
              onClick={() => setScreen('lesson')}
            >
              Materi Hari Ini
            </button>
          </div>
        </div>

        {/* Riwayat */}
        {historyRows.length > 0 && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>🕐 Riwayat</div>
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Hari','Nyeri','Cemas','Panik','Tidur'].map(h => (
                    <th key={h} style={{ textAlign: 'left', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, paddingBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {historyRows.map(row => (
                  <tr key={row.day}>
                    <td style={{ fontWeight: 700, color: 'var(--teal)', paddingBottom: 4 }}>H{row.day}</td>
                    <td style={{ color: 'var(--red)', fontWeight: 600, paddingBottom: 4 }}>{row.nyeri ?? '-'}</td>
                    <td style={{ color: 'var(--orange)', fontWeight: 600, paddingBottom: 4 }}>{row.cemas ?? '-'}</td>
                    <td style={{ fontWeight: 600, paddingBottom: 4 }}>{row.panik ?? '-'}</td>
                    <td style={{ color: 'var(--teal)', fontWeight: 600, paddingBottom: 4 }}>{row.tidur ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lapor mentor */}
        <a
          href={`https://wa.me/62xxxxxxxxxx?text=Laporan+H${currentDay}+${profile.name}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ textDecoration: 'none', marginBottom: 12 }}
        >
          💬 LAPOR MENTOR
        </a>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={backup}>
            ↓ Backup
          </button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}
            onClick={() => restoreRef.current?.click()}>
            ↑ Restore
          </button>
          <button className="btn btn-danger btn-sm" style={{ flex: 1 }}
            onClick={() => { if (confirm('Reset semua data?')) resetAll() }}>
            🗑 Reset
          </button>
        </div>

        <input type="file" ref={restoreRef} accept=".json"
          style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) restore(e.target.files[0]) }} />

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)' }}>
          v1.0 · Kang Asep Holistik
        </p>
      </div>
    </div>
  )
}
