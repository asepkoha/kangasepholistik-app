import { useState, useEffect } from 'react'
import { calcScore } from '../hooks/useAppState'
import { getPhase } from '../data/programData'

const CHECKLIST_ITEMS = {
  suplemen: [
    { key: 'suplementPagi',  label: '🌅 Pagi',   desc: 'Sebelum sarapan' },
    { key: 'suplementSiang', label: '☀️ Siang',  desc: 'Setelah makan siang' },
    { key: 'suplementMalam', label: '🌙 Malam',  desc: 'Sebelum tidur' },
  ],
  polaMakan: [
    { key: 'patuhPantangan', label: '🛡 Patuh Pantangan' },
    { key: 'teksturLembut',  label: '🥚 Tekstur Lembut' },
    { key: 'kunyah30',       label: '⏱ Kunyah 30x' },
    { key: 'stopJam19',      label: '🕖 Stop Jam 19.00' },
  ],
  mental: [
    { key: 'dzikirDoa',  label: '🤲 Dzikir/Doa' },
    { key: 'tidurCukup', label: '😴 Tidur Cukup' },
    { key: 'olahNapas',  label: '💨 Olah Napas' },
  ],
}

export default function JournalScreen({ currentDay, todayEntry, todaySaved, onSave, onBack }) {
  const [entry, setEntry] = useState({ ...todayEntry })
  const score = calcScore(entry)
  const phase = getPhase(currentDay)

  function set(field, val) {
    setEntry(prev => ({ ...prev, [field]: val }))
  }

  function toggle(field) {
    setEntry(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const phaseName = phase.label

  return (
    <div className="page scroll-page" style={{ paddingBottom: 40 }}>
      <div className="container" style={{ paddingTop: 16 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-2)' }}>
            ←
          </button>
          <div>
            <h2>Jurnal Hari Ke-{currentDay}</h2>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Fase: {phaseName}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: scoreColor(score) }}>{score}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>/ 100</div>
          </div>
        </div>

        {/* Suplemen harian */}
        <Section label="Suplemen Harian">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {CHECKLIST_ITEMS.suplemen.map(item => (
              <button key={item.key}
                className={'check-pill' + (entry[item.key] ? ' active' : '')}
                style={{ flexDirection: 'column', textAlign: 'center', padding: '10px 8px', borderRadius: 12 }}
                onClick={() => toggle(item.key)}>
                <span style={{ fontSize: 18, marginBottom: 2 }}>{item.label.split(' ')[0]}</span>
                <span style={{ fontSize: 12 }}>{item.label.split(' ')[1]}</span>
                <span style={{ fontSize: 10, opacity: 0.7 }}>{item.desc}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Pola makan */}
        <Section label="Pola Makan">
          <div className="checkbox-group">
            {CHECKLIST_ITEMS.polaMakan.map(item => (
              <label key={item.key}
                className={'check-pill' + (entry[item.key] ? ' active' : '')}>
                <input type="checkbox" checked={!!entry[item.key]}
                  onChange={() => toggle(item.key)}
                  style={{ display: 'none' }} />
                {entry[item.key] ? '✓ ' : ''}{item.label}
              </label>
            ))}
          </div>
        </Section>

        {/* Mental & Istirahat */}
        <Section label="Mental & Istirahat">
          <div className="checkbox-group">
            {CHECKLIST_ITEMS.mental.map(item => (
              <label key={item.key}
                className={'check-pill' + (entry[item.key] ? ' active' : '')}>
                <input type="checkbox" checked={!!entry[item.key]}
                  onChange={() => toggle(item.key)}
                  style={{ display: 'none' }} />
                {entry[item.key] ? '✓ ' : ''}{item.label}
              </label>
            ))}
          </div>
        </Section>

        {/* Sliders */}
        <Section label="">
          <SliderField label="Skor Nyeri Lambung" value={entry.nyeri}
            onChange={v => set('nyeri', v)} min={0} max={10}
            leftLabel="Nyaman" rightLabel="Sakit Sekali"
            color="var(--red)" />
          <SliderField label="Tingkat Kecemasan" value={entry.cemas}
            onChange={v => set('cemas', v)} min={0} max={10}
            leftLabel="Tenang" rightLabel="Cemas Berat"
            color="var(--orange)" />
          <SliderField label="Skala Panik" value={entry.panik}
            onChange={v => set('panik', v)} min={0} max={10}
            leftLabel="Tidak Ada" rightLabel="Panik Berat"
            color="var(--red)" />
          <SliderField label="Kualitas Tidur Semalam" value={entry.tidur}
            onChange={v => set('tidur', v)} min={0} max={10}
            leftLabel="Buruk Sekali" rightLabel="Nyenyak"
            color="var(--teal)" />
        </Section>

        {/* Kambuh */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
            Frekuensi Kambuh Hari Ini
            <span style={{ float: 'right', color: 'var(--orange)', fontWeight: 700 }}>{entry.kambuh}x</span>
          </div>
          <div className="num-stepper">
            {[0,1,2,3,4,5,6,7].map(n => (
              <button key={n}
                className={'num-btn' + (entry.kambuh === n ? ' active' : '')}
                onClick={() => set('kambuh', n)}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>
            <span>Tidak kambuh</span><span>Sangat sering</span>
          </div>
        </div>

        {/* BB */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>⚖️ Berat Badan Hari Ini <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: 12 }}>(opsional)</span></div>
          <input type="number" placeholder="Contoh: 65"
            value={entry.weight || ''} onChange={e => set('weight', e.target.value)} />
        </div>

        {/* Catatan */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>
                ⚠️ Ada keluhan/pemicu hari ini?
              </div>
              <textarea rows={2} placeholder="Ceritakan apa yang terjadi..."
                value={entry.keluhan || ''} onChange={e => set('keluhan', e.target.value)}
                style={{ resize: 'none' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>
                ✨ Satu hal yang disyukuri hari ini...
              </div>
              <textarea rows={2} placeholder="Alhamdulillah..."
                value={entry.syukur || ''} onChange={e => set('syukur', e.target.value)}
                style={{ resize: 'none' }} />
            </div>
          </div>
        </div>

        {/* Simpan */}
        {!todaySaved && (
          <button className="btn btn-primary" onClick={() => onSave(entry)}
            style={{ marginBottom: 12, fontSize: 15 }}>
            SIMPAN JURNAL 📋
          </button>
        )}

        <button className="btn btn-ghost" onClick={onBack}>← Kembali</button>
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      {label && <div className="section-label" style={{ marginTop: 0 }}>{label}</div>}
      {children}
    </div>
  )
}

function SliderField({ label, value, onChange, min, max, leftLabel, rightLabel, color }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
        <span style={{ fontWeight: 700, color, fontSize: 14 }}>{value}/10</span>
      </div>
      <input type="range" min={min} max={max} step={1} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--thumb-color': color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  )
}

function scoreColor(score) {
  if (score >= 80) return 'var(--teal)'
  if (score >= 50) return 'var(--orange)'
  return 'var(--red)'
}
