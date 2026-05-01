import { motion } from "framer-motion";

export default function TopAppBar({ name, streak, xp }) {
  const firstName = name ? name.split(" ")[0] : "Kawan";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f6f6]/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-md mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center p-0.5">
            <img
              src="/logo-ka.png"
              alt="KA"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://ui-avatars.com/api/?name=KA&background=0D5C4A&color=fff";
              }}
            />
          </div>
          <h1 className="font-headline text-base font-black text-primary tracking-tight">
            Hi, {firstName}!
          </h1>
        </div>
        
        {/* Stats Pill */}
        <div className="flex bg-white px-4 py-1.5 rounded-full shadow-sm items-center gap-2">
          <span className="font-headline font-black text-primary text-sm tracking-tight leading-none">
            {streak || 0}
          </span>
          <span className="text-sm leading-none">🔥</span>
          <span className="font-headline font-black text-primary text-sm tracking-tight leading-none">
            {xp || 0}
          </span>
          <span className="text-sm leading-none">❤️</span>
        </div>
      </div>
    </header>
  );
}
