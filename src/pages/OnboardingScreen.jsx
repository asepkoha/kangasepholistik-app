import { useState } from 'react'

export default function OnboardingScreen({ onSave }) {
  const [form, setForm] = useState({
    name: '', age: '', city: '', job: '', weightStart: '',
    startDate: new Date().toISOString().slice(0, 10),
    committed: false,
  })

  const valid = form.name.trim() && form.startDate && form.committed

  function set(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  return (
    <div className="page scroll-page" style={{ background: 'var(--bg)', paddingTop: 0 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)',
        padding: '40px 24px 32px',
        textAlign: 'center',
        color: 'white',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}>
        <img src="/logo-ka.png" alt="Kang Asep Holistik"
          style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: 12, border: '3px solid rgba(255,255,255,0.3)' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <h1 style={{ color: 'white', fontSize: 20, marginBottom: 4 }}>Kang Asep Holistik</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Program Ikhtiar 14 Hari — Metode 3P+</p>
      </div>

      <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>

        {/* Warning */}
        <div className="alert alert-warning" style={{ marginBottom: 20 }}>
          <strong>⚠ Penting:</strong> Aplikasi ini adalah alat bantu jurnal.
          Jika mengalami muntah darah, nyeri dada hebat, atau sesak berat — segera ke IGD.
        </div>

        {/* Profile */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-label" style={{ marginTop: 0 }}>Profil Anda</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="text" placeholder="Nama Lengkap *"
              value={form.name} onChange={e => set('name', e.target.value)} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input type="number" placeholder="Usia"
                value={form.age} onChange={e => set('age', e.target.value)} />
              <input type="text" placeholder="Kota"
                value={form.city} onChange={e => set('city', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input type="text" placeholder="Pekerjaan"
                value={form.job} onChange={e => set('job', e.target.value)} />
              <input type="number" placeholder="BB Awal (kg)"
                value={form.weightStart} onChange={e => set('weightStart', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Tanggal mulai */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-label" style={{ marginTop: 0 }}>Tanggal Mulai</div>
          <input type="date" value={form.startDate}
            onChange={e => set('startDate', e.target.value)} />
        </div>

        {/* Komitmen */}
        <div className="card" style={{ marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.committed}
              onChange={e => set('committed', e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: 'var(--teal)', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
              Saya berkomitmen mengikuti program ini dengan sungguh-sungguh
              selama 14 hari. Bismillah.
            </span>
          </label>
        </div>

        <button className="btn btn-primary" onClick={() => onSave(form)} disabled={!valid}>
          Mulai Perjalanan →
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 16 }}>
          Data tersimpan di perangkat Anda saja — tidak dikirim ke server manapun.
        </p>
      </div>
    </div>
  )
}
