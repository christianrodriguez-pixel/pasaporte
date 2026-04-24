import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Gift, QrCode, CalendarDays, ArrowRight } from "lucide-react";

const slides = [
  {
    icon: Gift,
    title: "Beneficios y descuentos",
    description: "Accede a descuentos exclusivos en cine, comida, transporte, cultura y mucho mas con aliados en todo Tamaulipas.",
    color: "#DD053E",
  },
  {
    icon: QrCode,
    title: "Tu credencial digital",
    description: "Lleva tu Pasaporte Joven en el celular. Presenta tu QR y accede a beneficios al instante.",
    color: "#C5A364",
  },
  {
    icon: CalendarDays,
    title: "Eventos y convocatorias",
    description: "Descubre cursos, talleres, actividades y convocatorias pensadas para ti. Todo en un solo lugar.",
    color: "#59021D",
  },
];

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (step < 2) setStep(step + 1);
    else navigate("/register");
  };

  return (
    <div className="h-dvh w-full bg-[#F9F7EB] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
              style={{ background: `${slides[step].color}12` }}
            >
              {(() => {
                const Icon = slides[step].icon;
                return <Icon size={44} color={slides[step].color} strokeWidth={1.5} />;
              })()}
            </div>
            <h2 className="text-[#091201] mb-3" style={{ fontSize: 24, fontWeight: 600 }}>{slides[step].title}</h2>
            <p className="text-[#091201]/60 max-w-xs" style={{ fontSize: 15, lineHeight: 1.6 }}>{slides[step].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots & CTA */}
      <div className="px-8 pb-12 flex flex-col items-center gap-8">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-[#DD053E]" : "w-2 bg-[#DBC8A7]"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          {step < 2 ? "Continuar" : "Comenzar"}
          <ArrowRight size={18} />
        </button>
        {step < 2 && (
          <button
            onClick={() => navigate("/register")}
            className="text-[#091201]/40"
            style={{ fontSize: 14 }}
          >
            Omitir
          </button>
        )}
      </div>
    </div>
  );
}
