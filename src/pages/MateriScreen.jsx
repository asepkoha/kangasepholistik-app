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
    <div className="min-h-screen bg-[#FAFAF5] pb-32 animate-in fade-in duration-500">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Perpustakaan</h1>
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Pustaka Pemulihan</p>
          </div>
        </div>
        <button 
          onClick={() => setScreen('sos')}
          className="px-4 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          SOS
        </button>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-6">
        {/* Search */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">search</span>
          <input 
            type="text"
            placeholder="Cari materi..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Topics List */}
        <div className="grid gap-4">
          {filteredMateri.map((materi) => (
            <button
              key={materi.id}
              onClick={() => setSelectedTopic(materi)}
              className="w-full bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-teal-100 hover:bg-teal-50/10"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">
                  <span className="material-symbols-outlined text-2xl">
                    {PILLAR_ICONS[materi.pillar]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-teal-600/50 uppercase tracking-widest mb-0.5 block">
                    {PILLAR_NAMES[materi.pillar]}
                  </span>
                  <h4 className="font-bold text-slate-800 leading-tight group-hover:text-teal-900 transition-colors">{materi.title}</h4>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 group-hover:text-teal-600 transition-all">chevron_right</span>
            </button>
          ))}
          
          {filteredMateri.length === 0 && (
            <div className="py-20 text-center">
              <span className="material-symbols-outlined text-slate-200 text-6xl mb-4">search_off</span>
              <p className="text-slate-400 text-sm italic">Topik tidak ditemukan.</p>
            </div>
          )}
        </div>
      </main>

      {/* DETAIL MODAL */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedTopic(null)}
          ></div>
          <div className="relative bg-white w-full max-w-md h-[90vh] rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-full duration-500">
            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined">
                    {PILLAR_ICONS[selectedTopic.pillar]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest block mb-0.5">{PILLAR_NAMES[selectedTopic.pillar]}</span>
                  <h2 className="font-bold text-xl text-slate-900 leading-tight">{selectedTopic.title}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTopic(null)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-20">
              {selectedTopic.sections.map((section, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                  <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    <span className="material-symbols-outlined text-[18px]">
                      {section.type === 'why_important' ? 'help_center' : section.type === 'step_by_step' ? 'checklist' : 'fitness_center'}
                    </span>
                    {section.type === 'why_important' ? 'Kenapa Ini Penting?' : section.type === 'step_by_step' ? 'Langkah Praktis' : 'Latihan Mandiri'}
                  </h3>
                  <div className={`p-6 rounded-[32px] ${
                    section.type === 'practice' 
                      ? 'bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-100' 
                      : 'bg-slate-50/50 border border-slate-100'
                  }`}>
                    <p className={`text-base leading-relaxed ${section.type === 'practice' ? 'text-teal-900 font-medium' : 'text-slate-600'}`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="p-8 bg-white border-t border-slate-50">
              <button 
                onClick={() => setSelectedTopic(null)}
                className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-600/20 active:scale-95 transition-all"
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
