import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "home", icon: "home", label: "Beranda" },
  { id: "materi", icon: "library_books", label: "Materi" },
  { id: "komunitas", icon: "group", label: "Komunitas" },
  { id: "profil", icon: "person", label: "Profil" },
];

export default function BottomNavBar({ activeScreen, onNavigate }) {
  // Normalize screen IDs to their nav parent
  const activeId = (() => {
    if (['home', 'journal', 'misi', 'lesson', 'sos', 'success'].includes(activeScreen)) return 'home'
    if (activeScreen === 'materi') return 'materi'
    if (activeScreen === 'komunitas') return 'komunitas'
    if (['profil', 'profile'].includes(activeScreen)) return 'profil'
    return 'home'
  })()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl rounded-t-[40px] shadow-[0_-10px_40px_rgba(16,185,129,0.08)] border-t border-emerald-50 pb-safe">
      <div className="max-w-md mx-auto flex justify-around items-center px-6 h-24">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-2 active:scale-90 transition-all relative ${
                isActive ? "text-primary" : "text-slate-300"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute -top-1 w-12 h-1.5 bg-primary rounded-full shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className="material-symbols-outlined mb-1.5 text-[28px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] font-jakarta tracking-wider ${isActive ? "font-extrabold" : "font-bold opacity-60"}`}>
                {item.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
