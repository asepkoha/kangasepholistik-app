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
    <div className="min-h-screen bg-[#FAFAF5] pb-32 animate-in fade-in duration-500">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex items-center gap-4 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">Komunitas Harapan</h1>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Saling Menguatkan</p>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-br from-teal-900 to-teal-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-1 tracking-tight">Kamu Tidak Sendirian 💛</h2>
            <p className="text-teal-100/80 text-xs leading-relaxed">
              Ribuan teman lainnya sedang berjuang bersamamu. Bagikan progresmu atau tanya Kang Asep di sini.
            </p>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-white/5 rotate-12">forum</span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-6 px-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-full whitespace-nowrap text-xs font-bold transition-all ${
                filter === f 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                  : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm ${post.isMentor ? 'bg-amber-500' : 'bg-teal-600'}`}>
                      {post.author[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {post.author}
                        {post.isMentor && <span className="material-symbols-outlined text-[16px] text-amber-500 fill-1">verified</span>}
                      </h3>
                      <p className="text-[10px] font-medium text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${TAG_COLORS[post.tag] || 'bg-slate-100 text-slate-600'}`}>
                    {post.tag}
                  </span>
                </div>
                
                <p className="text-slate-700 text-[13px] leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => likeCommunityPost(post.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-teal-600 active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-xl">favorite</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-xl">chat_bubble</span>
                    <span className="text-xs font-bold">0</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <span className="material-symbols-outlined text-slate-200 text-6xl mb-4">post_add</span>
              <p className="text-slate-400 text-sm italic">Belum ada cerita di kategori ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* Post Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsPosting(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Bagikan Ceritamu</h3>
              <button onClick={() => setIsPosting(false)} className="text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
              {['Micro-Win', 'Inspirasi', 'Tanya'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedTag === tag 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20' 
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <textarea 
              autoFocus
              placeholder="Ceritakan progresmu hari ini..."
              className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all mb-6 resize-none"
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
            />

            <button 
              onClick={handleSubmit}
              disabled={!newPostContent.trim()}
              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 active:scale-95 transition-all disabled:opacity-50"
            >
              Kirim Cerita
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isPosting && (
        <div className="fixed bottom-28 right-6 z-30">
          <button 
            onClick={() => setIsPosting(true)}
            className="w-14 h-14 bg-amber-500 text-white rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-center active:scale-90 transition-all group"
          >
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">add_comment</span>
          </button>
        </div>
      )}

      <BottomNavBar activeScreen="komunitas" onNavigate={setScreen} />
    </div>
  );
}
