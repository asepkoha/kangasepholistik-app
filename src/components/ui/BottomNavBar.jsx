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
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-[32px] shadow-[0_-8px_32px_rgba(13,148,136,0.08)] border-t border-teal-50/50 pb-safe-offset-4">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 h-20">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-2 active:scale-90 transition-all relative ${
                isActive ? "text-primary" : "text-slate-400"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -top-1 w-8 h-1 bg-primary rounded-full shadow-[0_0_12px_rgba(13,148,136,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className="material-symbols-outlined mb-1 text-[26px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
