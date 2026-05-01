import { useState } from 'react'

export default function OnboardingScreen({ onSave }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', age: '', city: '', 
    startDate: new Date().toISOString().slice(0, 10),
    committed: false,
  })
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)

  function updateForm(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  return (
    <div className="min-h-screen bg-[#FAFAF5] text-slate-800 flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 flex gap-1 z-50">
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s} 
            className={`flex-1 h-full transition-all duration-500 ${step >= s ? 'bg-teal-600' : 'bg-transparent'}`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-6 pt-12 animate-in fade-in duration-700">
        
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-teal-600 text-3xl">favorite</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
                Bismillah, <br/>Kamu Berani Sekali.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aku tahu rasanya. Dada sesak, perut perih, dan pikiran yang "lari" ke mana-mana. Itu berat, tapi hari ini kamu memilih untuk mulai.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
              <p className="text-sm text-slate-500 italic">
                "Lambungmu bukan musuhmu. Ia hanya sedang 'lelah' dan butuh waktu untuk renovasi."
              </p>
            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-600/20 active:scale-95 transition-all"
              >
                Lanjut, Kang
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-amber-600 text-3xl">history</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                Kenapa 14 Hari?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Secara biologis, sel lambung kita beregenerasi total setiap <span className="font-bold text-teal-700">14 hari</span>. 
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: 'psychology', title: 'Pola Pikir', desc: 'Menenangkan saraf vagus.' },
                  { icon: 'restaurant', title: 'Pola Makan', desc: 'Melapisi dengan Semen Biologis.' },
                  { icon: 'bedtime', title: 'Pola Tidur', desc: 'Waktu repair sel paling optimal.' }
                ].map(item => (
                  <div key={item.title} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-50">
                    <span className="material-symbols-outlined text-teal-600">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8 flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Kembali</button>
              <button 
                onClick={nextStep}
                className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-600/20 active:scale-95 transition-all"
              >
                Paham, Kang
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                Kenalan Dulu, Yuk?
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Data ini hanya tersimpan di HP-mu. Amanah.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nama Panggilan</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Rina"
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Usia</label>
                    <input 
                      type="number" 
                      placeholder="Thn"
                      value={form.age}
                      onChange={e => updateForm('age', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Kota</label>
                    <input 
                      type="text" 
                      placeholder="Domisili"
                      value={form.city}
                      onChange={e => updateForm('city', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Kembali</button>
              <button 
                disabled={!form.name || !form.age}
                onClick={nextStep}
                className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-600/20 active:scale-95 transition-all disabled:opacity-50"
              >
                Selesai
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                Janji pada Diri Sendiri?
              </h2>
              
              <div className="space-y-4 mb-8">
                <button 
                  onClick={() => updateForm('committed', !form.committed)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex gap-4 ${
                    form.committed ? 'bg-teal-50 border-teal-600' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border ${
                    form.committed ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-300 text-transparent'
                  }`}>
                    <span className="material-symbols-outlined text-xs">done</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${form.committed ? 'text-teal-900 font-medium' : 'text-slate-500'}`}>
                    Bismillah, saya berkomitmen untuk ikhtiar selama 14 hari penuh.
                  </p>
                </button>

                <button 
                  onClick={() => setDisclaimerAccepted(!disclaimerAccepted)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex gap-4 ${
                    disclaimerAccepted ? 'bg-amber-50 border-amber-600' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border ${
                    disclaimerAccepted ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-slate-300 text-transparent'
                  }`}>
                    <span className="material-symbols-outlined text-xs">done</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${disclaimerAccepted ? 'text-amber-900 font-medium' : 'text-slate-500'}`}>
                    Saya paham aplikasi ini adalah pendamping, bukan pengganti saran medis dokter.
                  </p>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[11px] text-slate-400 text-center leading-relaxed">
                "Barangsiapa bersungguh-sungguh, maka dia akan mendapatkan hasilnya. InsyaAllah."
              </div>
            </div>

            <div className="mt-auto pt-8 flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Kembali</button>
              <button 
                disabled={!form.committed || !disclaimerAccepted}
                onClick={() => onSave(form)}
                className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-600/20 active:scale-95 transition-all disabled:opacity-50"
              >
                Mulai Ikhtiar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
