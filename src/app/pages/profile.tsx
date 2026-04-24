import { useNavigate } from "react-router";
import { ChevronRight, Settings, Shield, HelpCircle, LogOut, Heart } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { AppLogo } from "../components/app-logo";

const interests = ["Cultura", "Tecnologia", "Comida", "Deporte"];

const menuItems = [
  { icon: Settings, label: "Ajustes", color: "#091201" },
  { icon: Shield, label: "Privacidad", color: "#091201" },
  { icon: HelpCircle, label: "Ayuda y soporte", color: "#091201" },
  { icon: LogOut, label: "Cerrar sesion", color: "#DD053E" },
];

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-6 text-center">
        <h1 className="text-[#091201]" style={{ fontSize: 24, fontWeight: 600 }}>Perfil</h1>
      </div>

      {/* Avatar & info */}
      <div className="flex flex-col items-center px-5 mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#CB0723] to-[#6A002C] flex items-center justify-center mb-3 shadow-lg shadow-[#59021D]/20">
          <span className="text-white" style={{ fontSize: 32, fontWeight: 700 }}>MF</span>
        </div>
        <p className="text-[#091201]" style={{ fontSize: 20, fontWeight: 600 }}>Maria Fernanda Lopez</p>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-green-600" style={{ fontSize: 13 }}>Pasaporte Activo</span>
        </div>
      </div>

      {/* Interests */}
      <div className="px-5 mb-6">
        <h3 className="text-[#091201] mb-3 flex items-center gap-2" style={{ fontSize: 16, fontWeight: 600 }}>
          <Heart size={16} className="text-[#DD053E]" /> Mis intereses
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <GlassCard className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-[#091201]" style={{ fontSize: 24, fontWeight: 700 }}>12</p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>Beneficios usados</p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p className="text-[#091201]" style={{ fontSize: 24, fontWeight: 700 }}>3</p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>Eventos asistidos</p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p className="text-[#091201]" style={{ fontSize: 24, fontWeight: 700 }}>8</p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>Meses activo</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Menu */}
      <div className="px-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={item.label}
              className="p-4 flex items-center gap-3"
              onClick={item.label === "Cerrar sesion" ? () => navigate("/") : undefined}
            >
              <Icon size={20} style={{ color: item.color }} />
              <span className="flex-1" style={{ color: item.color, fontSize: 15, fontWeight: 500 }}>{item.label}</span>
              {item.label !== "Cerrar sesion" && <ChevronRight size={18} className="text-[#091201]/20" />}
            </GlassCard>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center mt-8 gap-2">
        <AppLogo color="#DBC8A7" size={32} />
        <p className="text-[#091201]/20" style={{ fontSize: 11 }}>Pasaporte Joven v1.0</p>
      </div>
    </div>
  );
}
