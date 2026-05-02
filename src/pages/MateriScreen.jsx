import { useState, useEffect } from 'react'
import { MATERIAL_TOPICS } from '../data/materials'
import BottomNavBar from '../components/ui/BottomNavBar'

const PILLAR_ICONS = {
  pola_pikir: 'psychology',
  pola_makan: 'restaurant',
  pola_tidur: 'bedtime'
}

const PILLAR_NAMES = {
  pola_pikir: 'Pola Pikir',
  pola_makan: 'Pola Makan',
  pola_tidur: 'Pola Tidur'
}

export default function MateriScreen({ onBack, setScreen, initialTopicId }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (initialTopicId) {
      const topic = MATERIAL_TOPICS.find(t => t.id === initialTopicId)
      if (topic) setSelectedTopic(topic)
    }
  }, [initialTopicId])

  const filteredMateri = MATERIAL_TOPICS.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    PILLAR_NAMES[m.pillar].toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pb-32 animate-in fade-in duration-500 font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-40 border-b border-primary/5">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div className="overflow-hidden">
              <h1 className="text-[17px] font-jakarta font-extrabold text-slate-900 leading-tight truncate">Perpustakaan</h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Pustaka Pemulihan</p>
            </div>
          </div>
          <button 
            onClick={() => setScreen('sos')}
            className="px-4 h-10 bg-primary text-white rounded-2xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-md shadow-primary/20 shrink-0"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-8">
        {/* Search */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
          <input 
            type="text"
            placeholder="Cari materi pemulihan..."
            className="w-full bg-white border border-slate-100 rounded-[28px] py-4.5 pl-14 pr-6 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm font-inter placeholder:text-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Topics List */}
        <div className="grid gap-5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Daftar Topik</h3>
          </div>

          {filteredMateri.map((materi) => (
            <button
              key={materi.id}
              onClick={() => setSelectedTopic(materi)}
              className="w-full bg-white rounded-[36px] p-5 shadow-sm border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-primary/20 hover:bg-emerald-50/20"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-2xl">
                    {PILLAR_ICONS[materi.pillar]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1 block">
                    {PILLAR_NAMES[materi.pillar]}
                  </span>
                  <h4 className="font-jakarta font-extrabold text-[16px] text-slate-800 leading-tight group-hover:text-primary transition-colors">{materi.title}</h4>
                </div>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
              </div>
            </button>
          ))}
          
          {filteredMateri.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="material-symbols-outlined text-slate-200 text-5xl">search_off</span>
              </div>
              <p className="text-slate-400 font-inter text-sm font-medium italic">Topik tidak ditemukan, coba kata kunci lain.</p>
            </div>
          )}
        </div>
      </main>

      {/* DETAIL MODAL */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedTopic(null)}
          ></div>
          <div className="relative bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[80vh] rounded-t-[44px] sm:rounded-[44px] overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-full duration-500 border-t border-primary/5">
            {/* Grab handle for mobile */}
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mt-4 shrink-0"></div>

            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[24px] bg-emerald-50 text-primary flex items-center justify-center shadow-inner shrink-0">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {PILLAR_ICONS[selectedTopic.pillar]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1.5">{PILLAR_NAMES[selectedTopic.pillar]}</span>
                  <h2 className="font-jakarta font-extrabold text-2xl text-slate-900 leading-tight tracking-tight">{selectedTopic.title}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTopic(null)}
                className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-all hover:bg-emerald-50 hover:text-primary"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 pb-12 custom-scrollbar">
              {selectedTopic.sections.map((section, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {section.type === 'why_important' ? 'help_center' : section.type === 'step_by_step' ? 'checklist' : 'fitness_center'}
                      </span>
                    </div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {section.type === 'why_important' ? 'Kenapa Ini Penting?' : section.type === 'step_by_step' ? 'Langkah Praktis' : 'Latihan Mandiri'}
                    </h3>
                  </div>
                  
                  <div className={`p-8 rounded-[36px] ${
                    section.type === 'practice' 
                      ? 'bg-emerald-50/50 border-2 border-primary/10 shadow-sm' 
                      : 'bg-slate-50/50 border border-slate-100'
                  }`}>
                    <p className={`text-[16px] leading-relaxed font-inter ${section.type === 'practice' ? 'text-emerald-900 font-semibold' : 'text-slate-600 font-medium'}`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="p-8 bg-white border-t border-slate-50 pt-6">
              <button 
                onClick={() => setSelectedTopic(null)}
                className="w-full bg-primary text-white py-5 rounded-[28px] font-jakarta font-black text-lg shadow-[0_12px_24px_rgba(16,185,129,0.2)] active:scale-[0.97] transition-all tracking-tight"
              >
                Saya Mengerti, Bismillah
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar activeScreen="materi" onNavigate={setScreen} />
    </div>
  )
}
