import { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, Check } from "lucide-react";
import { motion } from "motion/react";

const interests = [
  { id: "cultura", label: "Cultura", emoji: "🎭" },
  { id: "deporte", label: "Deporte", emoji: "⚽" },
  { id: "educacion", label: "Educacion", emoji: "📚" },
  { id: "tecnologia", label: "Tecnologia", emoji: "💻" },
  { id: "salud", label: "Salud", emoji: "🏥" },
  { id: "comida", label: "Comida", emoji: "🍽️" },
  { id: "empleo", label: "Empleo", emoji: "💼" },
  { id: "actividades", label: "Actividades", emoji: "🎨" },
];

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState(0); // 0 = photo, 1 = interests

  const toggle = (id: string) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };

  if (step === 0) {
    return (
      <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col items-center px-6 pt-16 pb-8">
        <h1 className="text-[#091201] mb-2" style={{ fontSize: 24, fontWeight: 600 }}>Completa tu perfil</h1>
        <p className="text-[#091201]/50 mb-10 text-center" style={{ fontSize: 14 }}>Agrega una foto para tu credencial digital</p>

        <button className="w-32 h-32 rounded-full bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#C5A364]/50 flex flex-col items-center justify-center gap-2 mb-8 active:scale-95 transition-transform">
          <Camera size={32} className="text-[#C5A364]" />
          <span className="text-[#091201]/40" style={{ fontSize: 12 }}>Subir foto</span>
        </button>

        <div className="w-full space-y-3 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Nombre completo</p>
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Maria Fernanda Lopez Garcia</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>CURP</p>
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>LOGM030415MTSLPR08</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Edad</p>
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>23 anos</p>
          </div>
        </div>

        <button
          onClick={() => setStep(1)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          Confirmar datos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col px-6 pt-16 pb-8">
      <h1 className="text-[#091201] mb-2" style={{ fontSize: 24, fontWeight: 600 }}>Que te interesa?</h1>
      <p className="text-[#091201]/50 mb-8" style={{ fontSize: 14 }}>Selecciona tus intereses para personalizar tu experiencia</p>

      <div className="flex flex-wrap gap-3 mb-auto">
        {interests.map((item) => {
          const isActive = selected.includes(item.id);
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(item.id)}
              className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-[#DD053E] border-[#DD053E] text-white shadow-md shadow-[#DD053E]/20"
                  : "bg-white/60 backdrop-blur-sm border-white/50 text-[#091201]"
              }`}
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              <span>{item.emoji}</span>
              {item.label}
              {isActive && <Check size={16} />}
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/home")}
        disabled={selected.length === 0}
        className={`w-full mt-8 py-4 rounded-2xl text-white shadow-lg active:scale-[0.98] transition-all ${
          selected.length > 0
            ? "bg-gradient-to-r from-[#CB0723] to-[#DD053E] shadow-[#DD053E]/20"
            : "bg-[#DBC8A7] shadow-none"
        }`}
        style={{ fontSize: 16, fontWeight: 500 }}
      >
        Continuar ({selected.length}/8)
      </button>
    </div>
  );
}
