import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import BottomNavBar from '../components/ui/BottomNavBar';

const TAG_COLORS = {
  'Inspirasi': 'bg-amber-100 text-amber-700',
  'Edukasi': 'bg-teal-100 text-teal-700',
  'Micro-Win': 'bg-blue-100 text-blue-700',
  'Tanya': 'bg-purple-100 text-purple-700'
};

export default function KomunitasScreen({ onBack, setScreen }) {
  const { communityPosts, addCommunityPost, likeCommunityPost } = useAppState();
  const [filter, setFilter] = useState('Semua');
  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Micro-Win');

  const filters = ['Semua', 'Inspirasi', 'Edukasi', 'Micro-Win', 'Tanya'];

  const filteredPosts = filter === 'Semua' 
    ? communityPosts 
    : communityPosts.filter(p => p.tag === filter);

  const handleSubmit = () => {
    if (!newPostContent.trim()) return;
    addCommunityPost(newPostContent, selectedTag);
    setNewPostContent('');
    setIsPosting(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32 animate-in fade-in duration-500 font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-primary/5">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div className="overflow-hidden">
              <h1 className="text-[17px] font-jakarta font-extrabold text-slate-900 leading-tight truncate">Komunitas Harapan</h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Saling Menguatkan</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('sos')}
            className="px-4 h-10 bg-primary text-white rounded-2xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-md shadow-primary/20 shrink-0"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-8">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white rounded-[40px] p-8 shadow-xl shadow-emerald-900/10 relative overflow-hidden group">
          <div className="relative z-10 space-y-2">
            <h2 className="text-xl font-jakarta font-extrabold tracking-tight">Kamu Tidak Sendirian 💛</h2>
            <p className="text-emerald-100/80 text-[13px] font-medium leading-relaxed max-w-[90%]">
              Ribuan pejuang lainnya sedang berjuang bersamamu. Bagikan progresmu atau sapa teman baru di sini.
            </p>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">forum</span>
        </div>

        {/* Filter Scroll */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar -mx-6 px-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3 rounded-2xl whitespace-nowrap text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white text-slate-500 border border-slate-100 shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Feed List */}
        <div className="space-y-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-[36px] p-7 shadow-sm border border-slate-50 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-jakarta font-black text-white shadow-md relative overflow-hidden ${post.isMentor ? 'bg-secondary' : 'bg-primary'}`}>
                      {post.author[0]}
                      <div className="absolute inset-0 bg-white/10" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-jakarta font-extrabold text-slate-900 flex items-center gap-1.5">
                        {post.author}
                        {post.isMentor && (
                          <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        )}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.time}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest ${TAG_COLORS[post.tag] || 'bg-slate-100 text-slate-600'}`}>
                    {post.tag}
                  </span>
                </div>
                
                <p className="text-slate-700 text-[14px] leading-relaxed mb-6 font-medium">
                  {post.content}
                </p>

                <div className="flex items-center gap-6 pt-5 border-t border-slate-50">
                  <button 
                    onClick={() => likeCommunityPost(post.id)}
                    className="flex items-center gap-2 text-slate-400 hover:text-rose-500 active:scale-90 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: post.likes > 0 ? "'FILL' 1" : "" }}>favorite</span>
                    </div>
                    <span className="text-xs font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    </div>
                    <span className="text-xs font-black">0</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-slate-200 text-4xl">post_add</span>
              </div>
              <p className="text-slate-400 text-[13px] font-medium italic">Belum ada cerita di kategori ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* Post Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsPosting(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-jakarta font-extrabold text-slate-900 tracking-tight">Bagikan Ceritamu</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Saling Menginspirasi</p>
              </div>
              <button onClick={() => setIsPosting(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 active:scale-90 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2 hide-scrollbar -mx-2 px-2">
              {['Micro-Win', 'Inspirasi', 'Tanya'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border active:scale-95 ${
                    selectedTag === tag 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative group mb-8">
              <textarea 
                autoFocus
                placeholder="Ceritakan progresmu hari ini..."
                className="w-full h-40 bg-slate-50 border border-slate-100 rounded-[32px] p-7 text-[15px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none leading-relaxed placeholder:text-slate-300"
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
              />
              <div className="absolute top-6 right-6 text-slate-200 group-focus-within:text-primary/20 transition-colors">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!newPostContent.trim()}
              className="w-full py-6 bg-primary text-white rounded-[32px] font-jakarta font-extrabold text-lg shadow-[0_15px_30px_rgba(16,185,129,0.25)] active:scale-95 transition-all relative overflow-hidden disabled:opacity-50"
            >
              Kirim Cerita
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isPosting && (
        <div className="fixed bottom-28 right-6 z-30">
          <button 
            onClick={() => setIsPosting(true)}
            className="w-16 h-16 bg-secondary text-white rounded-3xl shadow-xl shadow-secondary/30 flex items-center justify-center active:scale-90 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10" />
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform relative z-10">add_comment</span>
          </button>
        </div>
      )}

      <BottomNavBar activeScreen="komunitas" onNavigate={setScreen} />
    </div>
  );
}
