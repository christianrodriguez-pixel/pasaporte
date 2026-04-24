import { useLocation, useNavigate } from "react-router";
import { Home, Gift, Compass, User, CreditCard } from "lucide-react";

const tabs = [
  { path: "/home", label: "Inicio", icon: Home },
  { path: "/benefits", label: "Beneficios", icon: Gift },
  { path: "/passport", label: "Mi Pasaporte", icon: CreditCard, center: true },
  { path: "/explore", label: "Explora", icon: Compass },
  { path: "/profile", label: "Perfil", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 border-t border-white/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-end justify-around px-2 pt-1 pb-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          if (tab.center) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center -mt-5"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${active ? "bg-gradient-to-b from-[#CB0723] to-[#6A002C]" : "bg-gradient-to-b from-[#DD053E] to-[#59021D]"}`}>
                  <Icon size={24} className="text-white" strokeWidth={1.8} />
                </div>
                <span className={`text-[10px] mt-0.5 ${active ? "text-[#DD053E]" : "text-[#091201]/50"}`}>{tab.label}</span>
              </button>
            );
          }
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center py-1.5 px-2 min-w-[56px]"
            >
              <Icon size={22} className={active ? "text-[#DD053E]" : "text-[#091201]/40"} strokeWidth={active ? 2 : 1.5} />
              <span className={`text-[10px] mt-0.5 ${active ? "text-[#DD053E]" : "text-[#091201]/50"}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
