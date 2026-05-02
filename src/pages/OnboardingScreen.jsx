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
    <div className="min-h-screen bg-background text-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] p-6 md:p-8 flex flex-col relative h-[800px] max-h-[90vh] overflow-hidden border border-slate-100 shadow-sm animate-fade-in">
        
        {/* Top Progress/Decoration Bar */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="w-1/3 bg-primary h-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
          <div className="flex-1 bg-gray-200 h-full"></div>
        </div>

        {step === 1 && (
          <div className="flex-1 flex flex-col pt-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Icon */}
            <div className="w-16 h-16 bg-mint rounded-3xl flex items-center justify-center mb-8 shadow-sm">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-black text-primary mb-4 tracking-tight font-jakarta">Lambung Tenang</h1>
            
            {/* Welcome Text */}
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Selamat datang di <span className="font-bold text-primary">Lambung Tenang</span>.<br/>
              Kakak akan didampingi oleh <span className="font-bold text-slate-900">Kang Asep</span><br/>
              dalam perjalanan pemulihan 14 hari ini.
            </p>

            {/* Motivational Quote Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-100">
              <p className="text-[15px] italic text-gray-600 leading-relaxed">
                "Ikhtiar ini adalah janji pada diri sendiri untuk tidak menyerah. Kamu berhak merasa aman dan tenang kembali."
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-auto pb-6 pt-4">
              <button 
                onClick={nextStep}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 px-6 rounded-[32px] transition-all duration-300 shadow-button-premium active:scale-95 text-xl tracking-wide font-jakarta"
              >
                Bismillah, Mulai
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-8">
              <div className="w-16 h-16 bg-mint rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">history</span>
              </div>
              <h2 className="text-2xl font-black text-primary mb-4 tracking-tight font-jakarta">
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
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8 flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold transition-all active:scale-95">Kembali</button>
              <button 
                onClick={nextStep}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-[28px] transition-all duration-200 shadow-button-premium active:scale-95 text-lg font-jakarta"
              >
                Saya Paham
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-primary mb-2 tracking-tight font-jakarta">
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
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Kota</label>
                    <input 
                      type="text" 
                      placeholder="Domisili"
                      value={form.city}
                      onChange={e => updateForm('city', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold transition-all active:scale-95">Kembali</button>
              <button 
                disabled={!form.name || !form.age}
                onClick={nextStep}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-[28px] transition-all duration-200 shadow-button-premium active:scale-95 text-lg disabled:opacity-50 disabled:shadow-none font-jakarta"
              >
                Selesai
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-primary mb-4 tracking-tight font-jakarta">
                Janji pada Diri Sendiri?
              </h2>
              
              <div className="space-y-4 mb-8">
                <button 
                  onClick={() => updateForm('committed', !form.committed)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex gap-4 ${
                    form.committed ? 'bg-primary/5 border-primary' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border ${
                    form.committed ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300 text-transparent'
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
              <button onClick={prevStep} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold transition-all active:scale-95">Kembali</button>
              <button 
                disabled={!form.committed || !disclaimerAccepted}
                onClick={() => onSave(form)}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-[28px] transition-all duration-200 shadow-button-premium active:scale-95 text-lg disabled:opacity-50 disabled:shadow-none font-jakarta"
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
