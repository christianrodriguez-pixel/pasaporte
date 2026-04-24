// ─────────────────────────────────────────────────────────────────────────────
// FUENTE DE VERDAD DEL RUNTIME
// Este archivo (App.tsx) es el punto de entrada real de la aplicación.
// El router activo, todas las pantallas y la navegación viven aquí.
// routes.tsx y el directorio pages/ son estructura legacy desconectada
// del router activo — NO modificar en esta tarea ni en futuras iteraciones
// sin una migración explícita y consensuada.
// ─────────────────────────────────────────────────────────────────────────────
import { RouterProvider } from "react-router";
import { createBrowserRouter, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Gift,
  Compass,
  User,
  CreditCard,
  Bell,
  ChevronRight,
  MapPin,
  Clock,
  Wifi,
  Eye,
  EyeOff,
  Camera,
  Check,
  ArrowRight,
  QrCode,
  CalendarDays,
  Search,
  Share2,
  Globe,
  ArrowLeft,
  X,
  Smartphone,
  Wallet,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  Heart,
  Calendar,
  Bookmark,
  Star,
  Flame,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import svgLogoPaths from "../imports/svg-puu9ef7n37";
import passportPhoto from "figma:asset/c64053af280117181c45b9726fba2f03d9cfca03.png";
import { GamificationProvider, useGamification } from "./gamification/state";
import { PointsBadge, StreakBadge, BalanceCompact, SectionHeader, BadgeIcon } from "./gamification/components";
import { MisPointsPage, DailyClaimPage, RetosPage, CheckInPage, CheckInSuccessPage, CanjePage, RewardDetailPage, HistorialPage, BadgesPage } from "./gamification/pages";
// WavePattern y WavePatternWide — fuente de verdad: ./components/wave-pattern
import { WavePattern, WavePatternWide } from "./components/wave-pattern";

/* ──────────── Reusable Components ──────────── */

function GlassCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function AppLogo({
  color = "#091201",
  size = 120,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.009 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        viewBox="0 0 543.192 548.1"
      >
        <g>
          <g>
            <path d={svgLogoPaths.p229854f0} fill={color} />
            <path d={svgLogoPaths.pab14280} fill={color} />
            <path d={svgLogoPaths.p313ac380} fill={color} />
            <path d={svgLogoPaths.p3c754a00} fill={color} />
            <path d={svgLogoPaths.p2cd90d00} fill={color} />
          </g>
          <path d={svgLogoPaths.p31e85800} fill={color} />
          <path d={svgLogoPaths.p16299800} fill={color} />
          <path d={svgLogoPaths.p3dfb5c00} fill={color} />
          <path d={svgLogoPaths.p11394df0} fill={color} />
          <path d={svgLogoPaths.p2d962e00} fill={color} />
          <path d={svgLogoPaths.pd23c880} fill={color} />
          <path d={svgLogoPaths.p20afe280} fill={color} />
          <path d={svgLogoPaths.p135e0000} fill={color} />
          <path d={svgLogoPaths.p1175c900} fill={color} />
          <path d={svgLogoPaths.p6a37d80} fill={color} />
          <path d={svgLogoPaths.p4318500} fill={color} />
          <path d={svgLogoPaths.p55d6a00} fill={color} />
          <path d={svgLogoPaths.p12149600} fill={color} />
          <path d={svgLogoPaths.p1df74080} fill={color} />
          <path d={svgLogoPaths.p2c2ace00} fill={color} />
          <path d={svgLogoPaths.p1cb37080} fill={color} />
          <path d={svgLogoPaths.p2eecd1c0} fill={color} />
          <path d={svgLogoPaths.p11ce7580} fill={color} />
          <path d={svgLogoPaths.p3ff9fd00} fill={color} />
          <path d={svgLogoPaths.p23f8d300} fill={color} />
          <g>
            <path d={svgLogoPaths.p3fb1a800} fill={color} />
            <path d={svgLogoPaths.p17c5a900} fill={color} />
            <path d={svgLogoPaths.p24417880} fill={color} />
            <path d={svgLogoPaths.p2e3426fa} fill={color} />
            <path d={svgLogoPaths.p98f580} fill={color} />
          </g>
        </g>
      </svg>
      <div
        className="absolute"
        style={{ inset: "35.33% 24.51% 35.36% 23.99%" }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          fill="none"
          viewBox="0 0 279.744 160.671"
        >
          <g>
            <path d={svgLogoPaths.p38059400} fill={color} />
            <g>
              <path d={svgLogoPaths.pe5ec980} fill={color} />
              <path d={svgLogoPaths.p1ec8ba80} fill={color} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

// WavePattern y WavePatternWide — implementación eliminada; se importa desde
// ./components/wave-pattern (fuente de verdad única).

const tierWaveColors: Record<PassportTier, { from: string; to: string }> = {
  base: { from: "#C5A364", to: "#DBC8A7" },
  gold: { from: "#C59138", to: "#DBC8A7" },
  premium: { from: "#DD053E", to: "#96051C" },
  platinum: { from: "rgba(255,255,255,0.6)", to: "rgba(197,163,100,0.35)" },
  black: { from: "rgba(255,255,255,0.4)", to: "rgba(255,255,255,0.15)" },
};

/* ──────────── Bottom Navigation ──────────── */

const navTabs = [
  { path: "/home", label: "Inicio", icon: Home },
  { path: "/benefits", label: "Beneficios", icon: Gift },
  { path: "/passport", label: "Mi Pasaporte", icon: CreditCard, center: true },
  { path: "/explore", label: "Explora", icon: Compass },
  { path: "/profile", label: "Perfil", icon: User },
];

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 border-t border-white/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-end justify-around px-2 pt-1 pb-1 max-w-md mx-auto">
        {navTabs.map((tab) => {
          const active = pathname.startsWith(tab.path);
          const Icon = tab.icon;
          if (tab.center) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center -mt-5"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${active ? "bg-gradient-to-b from-[#CB0723] to-[#6A002C]" : "bg-gradient-to-b from-[#DD053E] to-[#59021D]"}`}
                >
                  <Icon size={24} className="text-white" strokeWidth={1.8} />
                </div>
                <span
                  className={`mt-0.5 ${active ? "text-[#DD053E]" : "text-[#091201]/50"}`}
                  style={{ fontSize: 10 }}
                >
                  {tab.label}
                </span>
              </button>
            );
          }
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center py-1.5 px-2 min-w-[56px]"
            >
              <Icon
                size={22}
                className={active ? "text-[#DD053E]" : "text-[#091201]/40"}
                strokeWidth={active ? 2 : 1.5}
              />
              <span
                className={`mt-0.5 ${active ? "text-[#DD053E]" : "text-[#091201]/50"}`}
                style={{ fontSize: 10 }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function AppLayout() {
  return (
    <GamificationProvider>
      <div className="max-w-md mx-auto relative min-h-dvh bg-[#F9F7EB]">
        <Outlet />
        <BottomNav />
      </div>
    </GamificationProvider>
  );
}

/* ──────────── PAGES ──────────── */

// 1. Splash
function SplashPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-[#F9F7EB] to-[#DBC8A7] flex flex-col items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <WavePattern variant="gold" className="h-32" />
      </div>
      <div className="absolute top-0 left-0 right-0 opacity-[0.08] rotate-180">
        <WavePattern variant="red" className="h-24" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <AppLogo color="#59021D" size={140} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-[#091201] tracking-tight"
            style={{ fontSize: 28, fontWeight: 600 }}
          >
            Pasaporte Joven
          </h1>
          <p
            className="text-[#59021D]/70 mt-1"
            style={{ fontSize: 14 }}
          >
            Gobierno de Tamaulipas
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 flex gap-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C5A364]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// 2. Onboarding
const onboardingSlides = [
  {
    icon: Gift,
    title: "Beneficios y descuentos",
    description:
      "Accede a descuentos exclusivos en cine, comida, transporte, cultura y mucho más con aliados en todo Tamaulipas.",
    color: "#DD053E",
  },
  {
    icon: QrCode,
    title: "Tu credencial digital",
    description:
      "Lleva tu Pasaporte Joven en el celular. Presenta tu QR y accede a beneficios al instante.",
    color: "#C5A364",
  },
  {
    icon: CalendarDays,
    title: "Eventos y convocatorias",
    description:
      "Descubre cursos, talleres, actividades y convocatorias pensadas para ti. Todo en un solo lugar.",
    color: "#59021D",
  },
];

function OnboardingPage() {
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
              style={{ background: `${onboardingSlides[step].color}12` }}
            >
              {(() => {
                const Icon = onboardingSlides[step].icon;
                return (
                  <Icon
                    size={44}
                    color={onboardingSlides[step].color}
                    strokeWidth={1.5}
                  />
                );
              })()}
            </div>
            <h2
              className="text-[#091201] mb-3"
              style={{ fontSize: 24, fontWeight: 600 }}
            >
              {onboardingSlides[step].title}
            </h2>
            <p
              className="text-[#091201]/60 max-w-xs"
              style={{ fontSize: 15, lineHeight: 1.6 }}
            >
              {onboardingSlides[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="px-8 pb-12 flex flex-col items-center gap-8">
        <div className="flex gap-2">
          {onboardingSlides.map((_, i) => (
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

// 3. Register
function RegisterPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col px-6 pt-16 pb-8">
      <div className="flex flex-col items-center mb-10">
        <AppLogo color="#59021D" size={64} />
        <h1
          className="mt-4 text-[#091201]"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h1>
        <p className="text-[#091201]/50 mt-1" style={{ fontSize: 14 }}>
          {isLogin
            ? "Ingresa tus datos para continuar"
            : "Regístrate para obtener tu Pasaporte Joven"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <div>
            <label
              className="text-[#091201]/70 mb-1.5 block"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              CURP
            </label>
            <input
              type="text"
              placeholder="Ingresa tu CURP"
              className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all"
              style={{ fontSize: 15 }}
              maxLength={18}
            />
          </div>
        )}
        <div>
          <label
            className="text-[#091201]/70 mb-1.5 block"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="tu@correo.com"
            className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all"
            style={{ fontSize: 15 }}
          />
        </div>
        <div>
          <label
            className="text-[#091201]/70 mb-1.5 block"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Crea una contraseña"
              className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all pr-12"
              style={{ fontSize: 15 }}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#091201]/30"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          {isLogin ? "Iniciar sesión" : "Registrarme"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[#DD053E]"
          style={{ fontSize: 14, fontWeight: 500 }}
        >
          {isLogin
            ? "No tengo cuenta, registrarme"
            : "Ya tengo cuenta, iniciar sesión"}
        </button>
      </div>
    </div>
  );
}

// 4. Profile Setup
const interests = [
  { id: "cultura", label: "Cultura", emoji: "🎭" },
  { id: "deporte", label: "Deporte", emoji: "⚽" },
  { id: "educacion", label: "Educación", emoji: "📚" },
  { id: "tecnologia", label: "Tecnología", emoji: "💻" },
  { id: "salud", label: "Salud", emoji: "🏥" },
  { id: "comida", label: "Comida", emoji: "🍽️" },
  { id: "empleo", label: "Empleo", emoji: "💼" },
  { id: "actividades", label: "Actividades", emoji: "🎨" },
];

function ProfileSetupPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const toggle = (id: string) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  };

  if (step === 0) {
    return (
      <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col items-center px-6 pt-16 pb-8">
        <h1
          className="text-[#091201] mb-2"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          Completa tu perfil
        </h1>
        <p
          className="text-[#091201]/50 mb-10 text-center"
          style={{ fontSize: 14 }}
        >
          Agrega una foto para tu credencial digital
        </p>
        <button className="w-32 h-32 rounded-full bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#C5A364]/50 flex flex-col items-center justify-center gap-2 mb-8 active:scale-95 transition-transform">
          <Camera size={32} className="text-[#C5A364]" />
          <span className="text-[#091201]/40" style={{ fontSize: 12 }}>
            Subir foto
          </span>
        </button>
        <div className="w-full space-y-3 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
              Nombre completo
            </p>
            <p
              className="text-[#091201]"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              María Fernanda López García
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
              CURP
            </p>
            <p
              className="text-[#091201]"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              LOGM030415MTSLPR08
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40">
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
              Edad
            </p>
            <p
              className="text-[#091201]"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              23 años
            </p>
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
      <h1
        className="text-[#091201] mb-2"
        style={{ fontSize: 24, fontWeight: 600 }}
      >
        ¿Qué te interesa?
      </h1>
      <p className="text-[#091201]/50 mb-8" style={{ fontSize: 14 }}>
        Selecciona tus intereses para personalizar tu experiencia
      </p>
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

// 5. Home
const homeCategories = [
  "Todo",
  "Cultura",
  "Comida",
  "Deporte",
  "Salud",
  "Educación",
  "Transporte",
  "Tecnología",
];

const homeBenefits = [
  {
    id: 1,
    ally: "Cinépolis",
    benefit: "2x1 en boletos",
    mode: "Presencial",
    exp: "31 Dic 2026",
    distance: "1.2 km",
    cat: "Cultura",
    img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?w=400&q=80",
  },
  {
    id: 2,
    ally: "Librería Porrúa",
    benefit: "15% en material escolar",
    mode: "Ambas",
    exp: "30 Jun 2026",
    distance: "800 m",
    cat: "Educación",
    img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?w=400&q=80",
  },
  {
    id: 3,
    ally: "Museo de Arte",
    benefit: "Entrada gratuita los martes",
    mode: "Presencial",
    exp: "31 Dic 2026",
    distance: "2.5 km",
    cat: "Cultura",
    img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?w=400&q=80",
  },
  {
    id: 4,
    ally: "Gym Iron Fitness",
    benefit: "30% en membresía mensual",
    mode: "Presencial",
    exp: "30 Sep 2026",
    distance: "3.1 km",
    cat: "Deporte",
    img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?w=400&q=80",
  },
  {
    id: 5,
    ally: "Tacos Don Pepe",
    benefit: "Refresco gratis en combo",
    mode: "Presencial",
    exp: "28 Feb 2027",
    distance: "500 m",
    cat: "Comida",
    img: "https://images.unsplash.com/photo-1666307551254-eacbfaff5369?w=400&q=80",
  },
];

function HomePage() {
  const [activeCat, setActiveCat] = useState("Todo");
  const navigate = useNavigate();
  const g = useGamification();
  const filtered =
    activeCat === "Todo"
      ? homeBenefits
      : homeBenefits.filter((b) => b.cat === activeCat);

  const [quickClaimed, setQuickClaimed] = useState(false);
  const handleQuickClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (g.dailyClaimed) return;
    g.claimDaily();
    setQuickClaimed(true);
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[#091201]/50" style={{ fontSize: 13 }}>
            Hola,
          </p>
          <h2
            className="text-[#091201]"
            style={{ fontSize: 22, fontWeight: 600 }}
          >
            María Fernanda
          </h2>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <Bell size={20} className="text-[#091201]/60" />
        </button>
      </div>

      <div className="px-5 mb-4">
        <GlassCard className="p-4" onClick={() => navigate("/passport")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CB0723] to-[#6A002C] flex items-center justify-center">
                <span
                  className="text-white"
                  style={{ fontSize: 14, fontWeight: 700 }}
                >
                  MF
                </span>
              </div>
              <div>
                <p
                  className="text-[#091201]"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  Mi Pasaporte
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-600" style={{ fontSize: 12 }}>
                    Activo
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#091201]/30" />
          </div>
        </GlassCard>
      </div>

      {/* ── Points module ── */}
      <div className="px-5 mb-6">
        <GlassCard className="p-4" onClick={() => navigate("/points")}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(197,163,100,0.12)" }}>
                <Star size={18} className="text-[#C5A364]" />
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#091201" }}>{g.balance.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(9,18,1,0.4)" }}>pts</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StreakBadge streak={g.streak} compact />
              <ChevronRight size={16} className="text-[#091201]/20" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!g.dailyClaimed && !quickClaimed ? (
              <button
                onClick={handleQuickClaim}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A364] to-[#DBC8A7] text-white flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform shadow-sm shadow-[#C5A364]/15"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                <Star size={14} /> Reclamar hoy
              </button>
            ) : (
              <div className="flex-1 py-2.5 rounded-xl bg-[#C5A364]/10 flex items-center justify-center gap-1.5" style={{ fontSize: 13, fontWeight: 500, color: "#C5A364" }}>
                <Check size={14} /> Reclamado
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); navigate("/points/challenges"); }}
              className="px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 text-[#091201]/70 active:scale-[0.97] transition-transform"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              Mis retos
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="px-5 mb-3">
        <h3
          className="text-[#091201]"
          style={{ fontSize: 18, fontWeight: 600 }}
        >
          Beneficios disponibles
        </h3>
      </div>

      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-none">
        {homeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCat === cat
                ? "bg-[#DD053E] text-white shadow-sm shadow-[#DD053E]/20"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        {filtered.map((b) => (
          <GlassCard
            key={b.id}
            className="flex overflow-hidden"
            onClick={() => navigate(`/benefits/${b.id}`)}
          >
            <ImageWithFallback
              src={b.img}
              alt={b.ally}
              className="w-24 h-24 object-cover"
            />
            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
              <div>
                <p
                  className="text-[#091201]"
                  style={{ fontSize: 14, fontWeight: 600 }}
                >
                  {b.ally}
                </p>
                <p
                  className="text-[#091201]/70 truncate"
                  style={{ fontSize: 13 }}
                >
                  {b.benefit}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="flex items-center gap-1 text-[#091201]/40"
                  style={{ fontSize: 11 }}
                >
                  {b.mode === "Presencial" ? (
                    <MapPin size={12} />
                  ) : (
                    <Wifi size={12} />
                  )}
                  {b.mode}
                </span>
                <span
                  className="flex items-center gap-1 text-[#091201]/40"
                  style={{ fontSize: 11 }}
                >
                  <Clock size={12} />
                  {b.exp}
                </span>
                {b.distance && (
                  <span
                    className="text-[#C5A364]"
                    style={{ fontSize: 11, fontWeight: 500 }}
                  >
                    {b.distance}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center pr-3">
              <ChevronRight size={18} className="text-[#091201]/20" />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="px-5 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-[#091201]"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            Explora
          </h3>
          <button
            onClick={() => navigate("/explore")}
            className="text-[#DD053E]"
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            Ver todo
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          <GlassCard
            className="min-w-[200px] overflow-hidden flex-shrink-0"
            onClick={() => navigate("/explore/1")}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80"
              alt="Evento"
              className="w-full h-28 object-cover"
            />
            <div className="p-3">
              <span
                className="text-[#DD053E] px-2 py-0.5 rounded-full bg-[#DD053E]/10"
                style={{ fontSize: 10, fontWeight: 600 }}
              >
                Próximo
              </span>
              <p
                className="mt-1.5 text-[#091201]"
                style={{ fontSize: 13, fontWeight: 500 }}
              >
                Festival Joven 2026
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>
                15 May 2026
              </p>
            </div>
          </GlassCard>
          <GlassCard
            className="min-w-[200px] overflow-hidden flex-shrink-0"
            onClick={() => navigate("/explore/2")}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?w=400&q=80"
              alt="Taller"
              className="w-full h-28 object-cover"
            />
            <div className="p-3">
              <span
                className="text-[#C5A364] px-2 py-0.5 rounded-full bg-[#C5A364]/10"
                style={{ fontSize: 10, fontWeight: 600 }}
              >
                Nuevo
              </span>
              <p
                className="mt-1.5 text-[#091201]"
                style={{ fontSize: 13, fontWeight: 500 }}
              >
                Taller de Programación
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>
                20 May 2026
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ── Activity prompts ── */}
      <div className="px-5 mt-6 mb-2">
        <h3 className="text-[#091201] mb-3" style={{ fontSize: 16, fontWeight: 600 }}>Gana más puntos</h3>
        <div className="space-y-2">
          <GlassCard className="p-3.5 flex items-center gap-3" onClick={() => navigate("/checkin")}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div className="flex-1">
              <p style={{ fontSize: 13, fontWeight: 500, color: "#091201" }}>Haz check-in en una actividad</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Registra tu asistencia y gana puntos</p>
            </div>
            <PointsBadge amount={25} />
          </GlassCard>
          <GlassCard className="p-3.5 flex items-center gap-3" onClick={() => navigate("/points/challenges")}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <div className="flex-1">
              <p style={{ fontSize: 13, fontWeight: 500, color: "#091201" }}>Completa 1 reto más</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Tienes retos pendientes esta semana</p>
            </div>
            <PointsBadge amount={40} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// 6. Benefits
const allBenefitsList = [
  {
    id: 1, ally: "Cinépolis", benefit: "2x1 en boletos de cine", mode: "Presencial",
    exp: "31 Dic 2026", distance: "1.2 km", cat: "Cultura",
    img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?w=400&q=80",
    pointsCost: 120, rewardType: "redeem" as const,
  },
  {
    id: 2, ally: "Librería Porrúa", benefit: "15% de descuento en material escolar", mode: "Ambas",
    exp: "30 Jun 2026", distance: "800 m", cat: "Educación",
    img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?w=400&q=80",
    pointsEarn: 15, rewardType: "earn" as const,
  },
  {
    id: 3, ally: "Museo de Arte Contemporáneo", benefit: "Entrada gratuita los martes", mode: "Presencial",
    exp: "31 Dic 2026", distance: "2.5 km", cat: "Cultura",
    img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?w=400&q=80",
    pointsEarn: 10, rewardType: "earn" as const,
  },
  {
    id: 4, ally: "Gym Iron Fitness", benefit: "30% en membresía mensual", mode: "Presencial",
    exp: "30 Sep 2026", distance: "3.1 km", cat: "Deporte",
    img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?w=400&q=80",
    pointsEarn: 20, pointsCost: 300, rewardType: "hybrid" as const,
  },
  {
    id: 5, ally: "Tacos Don Pepe", benefit: "Refresco gratis en combo", mode: "Presencial",
    exp: "28 Feb 2027", distance: "500 m", cat: "Comida",
    img: "https://images.unsplash.com/photo-1666307551254-eacbfaff5369?w=400&q=80",
    pointsCost: 60, rewardType: "redeem" as const,
  },
  {
    id: 6, ally: "Clínica Salud Total", benefit: "Consulta médica gratuita", mode: "Presencial",
    exp: "31 Dic 2026", distance: "4 km", cat: "Salud",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80",
    pointsEarn: 15, rewardType: "earn" as const,
  },
  {
    id: 7, ally: "TransBus Tamaulipas", benefit: "50% en tarjeta de transporte", mode: "Presencial",
    exp: "31 Dic 2026", distance: "—", cat: "Transporte",
    img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80",
    pointsEarn: 10, rewardType: "earn" as const,
  },
];

function BenefitsPage() {
  const [activeCat, setActiveCat] = useState("Todo");
  const navigate = useNavigate();
  const filtered =
    activeCat === "Todo"
      ? allBenefitsList
      : allBenefitsList.filter((b) => b.cat === activeCat);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1
          className="text-[#091201]"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          Beneficios
        </h1>
      </div>

      <div className="px-5 mb-4">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3">
          <Search size={18} className="text-[#091201]/30" />
          <input
            placeholder="Buscar beneficios..."
            className="flex-1 bg-transparent outline-none text-[#091201] placeholder:text-[#091201]/30"
            style={{ fontSize: 14 }}
          />
        </div>
      </div>

      <div className="px-5 mb-5">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#091201]/50" style={{ fontSize: 12 }}>
                Beneficios activos
              </p>
              <p
                className="text-[#091201]"
                style={{ fontSize: 28, fontWeight: 700 }}
              >
                {allBenefitsList.length}
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-xl bg-[#DD053E]/10 text-[#DD053E]"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              Ver cercanos
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-none">
        {homeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCat === cat
                ? "bg-[#DD053E] text-white shadow-sm shadow-[#DD053E]/20"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        {filtered.map((b) => (
          <GlassCard
            key={b.id}
            className="overflow-hidden"
            onClick={() => navigate(`/benefits/${b.id}`)}
          >
            <div className="flex">
              <ImageWithFallback
                src={b.img}
                alt={b.ally}
                className="w-28 h-28 object-cover"
              />
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <p
                    className="text-[#091201]"
                    style={{ fontSize: 15, fontWeight: 600 }}
                  >
                    {b.ally}
                  </p>
                  <p
                    className="text-[#091201]/70 line-clamp-2"
                    style={{ fontSize: 13 }}
                  >
                    {b.benefit}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="flex items-center gap-1 text-[#091201]/40"
                    style={{ fontSize: 11 }}
                  >
                    {b.mode === "Presencial" ? (
                      <MapPin size={12} />
                    ) : (
                      <Wifi size={12} />
                    )}
                    {b.mode}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[#091201]/40"
                    style={{ fontSize: 11 }}
                  >
                    <Clock size={12} />
                    {b.exp}
                  </span>
                  {b.pointsCost && <PointsBadge amount={b.pointsCost} type="spend" />}
                  {b.pointsEarn && !b.pointsCost && <PointsBadge amount={b.pointsEarn} type="earn" />}
                </div>
              </div>
              <div className="flex items-center pr-3">
                <ChevronRight size={18} className="text-[#091201]/20" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// 7. Benefit Detail
const benefitDetails: Record<
  string,
  {
    ally: string; benefit: string; desc: string; terms: string;
    mode: string; exp: string; img: string;
    pointsEarn?: number; pointsCost?: number; rewardType?: "earn" | "redeem" | "hybrid";
  }
> = {
  "1": {
    ally: "Cinépolis", benefit: "2x1 en boletos de cine",
    desc: "Presenta tu Pasaporte Joven en taquilla y obtén dos boletos por el precio de uno. Aplica de lunes a jueves en todas las salas excepto VIP y 4DX.",
    terms: "Válido de lunes a jueves. No acumulable con otras promociones. Máximo 2 boletos por transacción.",
    mode: "Presencial", exp: "31 Dic 2026",
    img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?w=800&q=80",
    pointsCost: 120, rewardType: "redeem",
  },
  "2": {
    ally: "Librería Porrúa", benefit: "15% de descuento en material escolar",
    desc: "Descuento en toda la línea de cuadernos, plumas, colores y material escolar general.",
    terms: "Aplica solo en material escolar. No incluye libros ni electrónica.",
    mode: "Ambas", exp: "30 Jun 2026",
    img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?w=800&q=80",
    pointsEarn: 15, rewardType: "earn",
  },
  "3": {
    ally: "Museo de Arte Contemporáneo", benefit: "Entrada gratuita los martes",
    desc: "Accede gratuitamente a todas las salas del museo cada martes presentando tu Pasaporte Joven.",
    terms: "Solo martes. Horario regular del museo. No incluye exposiciones especiales.",
    mode: "Presencial", exp: "31 Dic 2026",
    img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?w=800&q=80",
    pointsEarn: 10, rewardType: "earn",
  },
};

function BenefitDetailPage() {
  const navigate = useNavigate();
  const { id = "1" } = useParams();
  const b = benefitDetails[id] || benefitDetails["1"];

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-40">
      <div className="relative h-56">
        <ImageWithFallback
          src={b.img}
          alt={b.ally}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => navigate(-1 as any)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#091201]" />
        </button>
      </div>
      <div className="px-5 -mt-6 relative">
        <GlassCard className="p-5">
          <p
            className="text-[#C5A364]"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {b.ally}
          </p>
          <h1
            className="text-[#091201] mt-1"
            style={{ fontSize: 22, fontWeight: 600 }}
          >
            {b.benefit}
          </h1>
          <div className="flex items-center gap-4 mt-3">
            <span
              className="flex items-center gap-1 text-[#091201]/50"
              style={{ fontSize: 12 }}
            >
              {b.mode === "Presencial" ? (
                <MapPin size={14} />
              ) : (
                <Wifi size={14} />
              )}
              {b.mode}
            </span>
            <span
              className="flex items-center gap-1 text-[#091201]/50"
              style={{ fontSize: 12 }}
            >
              <Clock size={14} />
              Vigente hasta {b.exp}
            </span>
          </div>
        </GlassCard>
      </div>
      <div className="px-5 mt-5">
        <h3
          className="text-[#091201] mb-2"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          Descripción
        </h3>
        <p
          className="text-[#091201]/60"
          style={{ fontSize: 14, lineHeight: 1.7 }}
        >
          {b.desc}
        </p>
      </div>
      <div className="px-5 mt-5">
        <h3
          className="text-[#091201] mb-2"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          Términos y condiciones
        </h3>
        <p
          className="text-[#091201]/50"
          style={{ fontSize: 13, lineHeight: 1.7 }}
        >
          {b.terms}
        </p>
      </div>
      {/* ── Points info ── */}
      {(b.pointsEarn || b.pointsCost) && (
        <div className="px-5 mt-5">
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: b.rewardType === "redeem" ? "rgba(89,2,29,0.08)" : "rgba(197,163,100,0.12)" }}>
                <Star size={18} style={{ color: b.rewardType === "redeem" ? "#59021D" : "#C5A364" }} />
              </div>
              <div className="flex-1">
                {b.rewardType === "earn" && (
                  <>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#C5A364" }}>Gana +{b.pointsEarn} pts</p>
                    <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Al usar este beneficio</p>
                  </>
                )}
                {b.rewardType === "redeem" && (
                  <>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#59021D" }}>Canjeable por {b.pointsCost} pts</p>
                    <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>También disponible con tu pasaporte</p>
                  </>
                )}
                {b.rewardType === "hybrid" && (
                  <>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#091201" }}>Gana +{b.pointsEarn} pts · Mejora por {b.pointsCost} pts</p>
                    <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Usa tu pasaporte o canjea con puntos</p>
                  </>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="px-5 mt-5 flex gap-3">
        <button
          className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <MapPin size={16} /> Ubicación
        </button>
        <button
          className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <Globe size={16} /> Sitio web
        </button>
        <button
          className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <Share2 size={16} /> Compartir
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-5 pb-24 bg-gradient-to-t from-[#F9F7EB] to-transparent">
        {b.rewardType === "redeem" ? (
          <button
            onClick={() => navigate("/points/redeem")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#59021D] to-[#3D0114] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#59021D]/20 active:scale-[0.98] transition-transform"
            style={{ fontSize: 16, fontWeight: 500 }}
          >
            <Star size={18} /> Canjear con puntos
          </button>
        ) : (
          <button
            onClick={() => navigate("/passport/qr")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
            style={{ fontSize: 16, fontWeight: 500 }}
          >
            <QrCode size={20} /> {b.pointsEarn ? `Usar y ganar ${b.pointsEarn} pts` : "Usar con mi pasaporte"}
          </button>
        )}
      </div>
    </div>
  );
}

// 8. Passport — Tier system
const usageHistory = [
  { id: 1, place: "Cinépolis Victoria", benefit: "2x1 en boletos", date: "18 Abr 2026", icon: "🎬" },
  { id: 2, place: "Librería Porrúa", benefit: "15% descuento", date: "10 Abr 2026", icon: "📚" },
  { id: 3, place: "Museo de Arte", benefit: "Entrada gratuita", date: "2 Abr 2026", icon: "🎭" },
  { id: 4, place: "Gym Iron Fitness", benefit: "30% membresía", date: "28 Mar 2026", icon: "💪" },
  { id: 5, place: "Tacos Don Pepe", benefit: "Refresco gratis", date: "20 Mar 2026", icon: "🌮" },
];

type PassportTier = "base" | "gold" | "premium" | "platinum" | "black";

interface TierStyle {
  label: string;
  // Surfaces
  gradient: string;
  gradientBack: string;
  overlay?: string;         // subtle radial/linear overlays (Liquid Glass highlights)
  sheen?: string;           // diagonal top sheen
  shadow: string;
  borderOuter?: string;     // outer subtle border
  // Typography
  textPrimary: string;
  textSecondary: string;
  labelColor: string;
  accent: string;
  // Hero (points) block — slightly elevated
  heroBg: string;
  heroBorder: string;
  heroHighlight: string;    // inner top highlight line
  progressBg: string;
  progressFill: string;
  progressSheen?: string;
  pointsNextLevel: number;
  nextTierLabel: string | null;
  // Data fields
  fieldBg: string;
  fieldBorder: string;
  curpColor: string;        // mono technical color
  curpDivider: string;
  institutionBg: string;
  institutionBorder: string;
  institutionDot: string;
  // Badge (seal)
  badge: null | {
    icon: string;
    bg: string;
    fg: string;
    border: string;
    halo?: string;
  };
  // Wave
  waveOpacity: number;
  // Photo
  photoBorder: string;
  photoBg: string;
  photoText: string;
  // Back face
  qrGlow: string;
  divider: string;
  historyBg: string;
  historyBorder: string;
  hintColor: string;
  folioColor: string;
}

const tierConfig: Record<PassportTier, TierStyle> = {
  base: {
    label: "BÁSICO",
    gradient: "linear-gradient(155deg, #6A0225 0%, #59021D 35%, #2A0611 70%, #091201 100%)",
    gradientBack: "linear-gradient(155deg, #091201 0%, #2A0611 30%, #59021D 70%, #6A0225 100%)",
    overlay: "radial-gradient(ellipse at 15% 10%, rgba(197,163,100,0.08) 0%, transparent 45%)",
    sheen: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.03) 100%)",
    shadow: "0 20px 48px -14px rgba(89,2,29,0.35), 0 4px 16px rgba(9,18,1,0.15)",
    borderOuter: "rgba(197,163,100,0.15)",
    textPrimary: "#FFFFFF", textSecondary: "rgba(255,255,255,0.72)",
    labelColor: "rgba(197,163,100,0.55)", accent: "#C5A364",
    heroBg: "linear-gradient(145deg, rgba(197,163,100,0.12) 0%, rgba(197,163,100,0.04) 100%)",
    heroBorder: "rgba(197,163,100,0.22)",
    heroHighlight: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 60%)",
    progressBg: "rgba(9,18,1,0.35)",
    progressFill: "linear-gradient(90deg, #C5A364, #DBC8A7)",
    progressSheen: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent 60%)",
    pointsNextLevel: 1000, nextTierLabel: "Gold",
    fieldBg: "rgba(255,255,255,0.06)", fieldBorder: "rgba(255,255,255,0.09)",
    curpColor: "rgba(255,255,255,0.82)", curpDivider: "rgba(255,255,255,0.1)",
    institutionBg: "rgba(197,163,100,0.1)", institutionBorder: "rgba(197,163,100,0.22)", institutionDot: "#C5A364",
    badge: null,
    waveOpacity: 0.09,
    photoBorder: "rgba(197,163,100,0.35)", photoBg: "rgba(197,163,100,0.1)", photoText: "#C5A364",
    qrGlow: "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.25)",
    divider: "rgba(255,255,255,0.08)", historyBg: "rgba(255,255,255,0.05)", historyBorder: "rgba(255,255,255,0.06)",
    hintColor: "rgba(255,255,255,0.3)", folioColor: "#C5A364",
  },
  gold: {
    label: "GOLD",
    gradient: "linear-gradient(150deg, #D4A94E 0%, #C5A364 18%, #9A7528 42%, #4A3510 70%, #1C1408 100%)",
    gradientBack: "linear-gradient(150deg, #1C1408 0%, #4A3510 28%, #9A7528 58%, #C5A364 82%, #D4A94E 100%)",
    overlay: "radial-gradient(ellipse at 20% 15%, rgba(255,230,180,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 85%, rgba(197,163,100,0.15) 0%, transparent 55%)",
    sheen: "linear-gradient(125deg, rgba(255,240,210,0.18) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,240,210,0.06) 100%)",
    shadow: "0 22px 55px -14px rgba(197,145,56,0.5), 0 0 80px rgba(197,163,100,0.18), 0 4px 18px rgba(74,53,16,0.35)",
    borderOuter: "rgba(255,230,180,0.28)",
    textPrimary: "#FFFFFF", textSecondary: "rgba(255,245,220,0.82)",
    labelColor: "rgba(255,230,180,0.62)", accent: "#F2D98A",
    heroBg: "linear-gradient(145deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 100%)",
    heroBorder: "rgba(255,230,180,0.3)",
    heroHighlight: "linear-gradient(180deg, rgba(255,240,210,0.14), transparent 55%)",
    progressBg: "rgba(0,0,0,0.35)",
    progressFill: "linear-gradient(90deg, #F2D98A, #D4A94E, #C5A364)",
    progressSheen: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent 55%)",
    pointsNextLevel: 3000, nextTierLabel: "Premium",
    fieldBg: "rgba(0,0,0,0.22)", fieldBorder: "rgba(255,230,180,0.22)",
    curpColor: "rgba(255,245,220,0.88)", curpDivider: "rgba(255,230,180,0.18)",
    institutionBg: "rgba(0,0,0,0.25)", institutionBorder: "rgba(255,230,180,0.28)", institutionDot: "#F2D98A",
    badge: { icon: "★", bg: "linear-gradient(135deg, #F2D98A 0%, #C5A364 100%)", fg: "#2A1F08", border: "rgba(255,245,220,0.4)", halo: "radial-gradient(circle, rgba(242,217,138,0.5), transparent 70%)" },
    waveOpacity: 0.1,
    photoBorder: "rgba(255,230,180,0.5)", photoBg: "rgba(197,163,100,0.15)", photoText: "#F2D98A",
    qrGlow: "0 0 35px rgba(197,163,100,0.5), 0 0 70px rgba(197,145,56,0.25), 0 0 100px rgba(245,230,200,0.15)",
    divider: "rgba(255,230,180,0.2)", historyBg: "rgba(0,0,0,0.2)", historyBorder: "rgba(255,230,180,0.15)",
    hintColor: "rgba(255,245,220,0.4)", folioColor: "#F2D98A",
  },
  premium: {
    label: "PREMIUM",
    gradient: "linear-gradient(150deg, #DD053E 0%, #96051C 35%, #59021D 62%, #1C0209 100%)",
    gradientBack: "linear-gradient(150deg, #1C0209 0%, #59021D 35%, #96051C 70%, #DD053E 100%)",
    overlay: "radial-gradient(ellipse at 15% 12%, rgba(255,255,255,0.1) 0%, transparent 42%), radial-gradient(ellipse at 85% 88%, rgba(197,163,100,0.1) 0%, transparent 50%)",
    sheen: "linear-gradient(130deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 74%, rgba(197,163,100,0.05) 100%)",
    shadow: "0 22px 55px -14px rgba(221,5,62,0.4), 0 0 80px rgba(150,5,28,0.2), 0 4px 18px rgba(28,2,9,0.4)",
    borderOuter: "rgba(197,163,100,0.3)",
    textPrimary: "#FFFFFF", textSecondary: "rgba(255,255,255,0.78)",
    labelColor: "rgba(197,163,100,0.6)", accent: "#C5A364",
    heroBg: "linear-gradient(145deg, rgba(0,0,0,0.3) 0%, rgba(89,2,29,0.2) 100%)",
    heroBorder: "rgba(197,163,100,0.38)",
    heroHighlight: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 55%)",
    progressBg: "rgba(0,0,0,0.38)",
    progressFill: "linear-gradient(90deg, #DD053E, #F2D98A)",
    progressSheen: "linear-gradient(180deg, rgba(255,255,255,0.38), transparent 55%)",
    pointsNextLevel: 6000, nextTierLabel: "Platinum",
    fieldBg: "rgba(255,255,255,0.05)", fieldBorder: "rgba(197,163,100,0.22)",
    curpColor: "rgba(255,255,255,0.85)", curpDivider: "rgba(197,163,100,0.2)",
    institutionBg: "rgba(0,0,0,0.25)", institutionBorder: "rgba(197,163,100,0.3)", institutionDot: "#C5A364",
    badge: { icon: "◆", bg: "linear-gradient(135deg, #59021D 0%, #2A0611 100%)", fg: "#F2D98A", border: "rgba(197,163,100,0.55)", halo: "radial-gradient(circle, rgba(221,5,62,0.4), transparent 70%)" },
    waveOpacity: 0.07,
    photoBorder: "rgba(197,163,100,0.45)", photoBg: "rgba(89,2,29,0.25)", photoText: "#C5A364",
    qrGlow: "0 0 40px rgba(255,255,255,0.5), 0 0 60px rgba(221,5,62,0.2), 0 0 100px rgba(255,255,255,0.15)",
    divider: "rgba(197,163,100,0.18)", historyBg: "rgba(0,0,0,0.25)", historyBorder: "rgba(197,163,100,0.15)",
    hintColor: "rgba(255,255,255,0.3)", folioColor: "#C5A364",
  },
  platinum: {
    label: "PLATINUM",
    gradient: "linear-gradient(150deg, #E8E2D6 0%, #C9C1B2 22%, #9C9488 46%, #706A60 72%, #3C3831 100%)",
    gradientBack: "linear-gradient(150deg, #3C3831 0%, #706A60 28%, #9C9488 54%, #C9C1B2 78%, #E8E2D6 100%)",
    overlay: "radial-gradient(ellipse at 18% 12%, rgba(255,255,255,0.35) 0%, transparent 48%), radial-gradient(ellipse at 82% 80%, rgba(255,240,220,0.2) 0%, transparent 55%)",
    sheen: "linear-gradient(130deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0) 48%, rgba(255,240,220,0.08) 75%, rgba(255,255,255,0.18) 100%)",
    shadow: "0 24px 60px -14px rgba(60,56,49,0.45), 0 0 90px rgba(232,226,214,0.25), 0 4px 20px rgba(156,148,136,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
    borderOuter: "rgba(255,255,255,0.45)",
    textPrimary: "#2A2620", textSecondary: "rgba(42,38,32,0.75)",
    labelColor: "rgba(89,2,29,0.55)", accent: "#59021D",
    heroBg: "linear-gradient(145deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 100%)",
    heroBorder: "rgba(255,255,255,0.65)",
    heroHighlight: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent 55%)",
    progressBg: "rgba(42,38,32,0.15)",
    progressFill: "linear-gradient(90deg, #59021D, #C5A364, #9C9488)",
    progressSheen: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent 55%)",
    pointsNextLevel: 12000, nextTierLabel: "Black",
    fieldBg: "rgba(255,255,255,0.35)", fieldBorder: "rgba(255,255,255,0.55)",
    curpColor: "rgba(42,38,32,0.85)", curpDivider: "rgba(42,38,32,0.12)",
    institutionBg: "rgba(255,255,255,0.5)", institutionBorder: "rgba(255,255,255,0.7)", institutionDot: "#59021D",
    badge: { icon: "✧", bg: "linear-gradient(135deg, #FFFFFF 0%, #E8E2D6 50%, #C9C1B2 100%)", fg: "#59021D", border: "rgba(255,255,255,0.9)", halo: "radial-gradient(circle, rgba(255,255,255,0.7), rgba(232,226,214,0.3) 40%, transparent 70%)" },
    waveOpacity: 0.06,
    photoBorder: "rgba(255,255,255,0.75)", photoBg: "rgba(255,255,255,0.4)", photoText: "#59021D",
    qrGlow: "0 0 40px rgba(232,226,214,0.6), 0 0 80px rgba(255,255,255,0.3), 0 0 120px rgba(197,163,100,0.15)",
    divider: "rgba(42,38,32,0.1)", historyBg: "rgba(255,255,255,0.3)", historyBorder: "rgba(255,255,255,0.5)",
    hintColor: "rgba(42,38,32,0.35)", folioColor: "#59021D",
  },
  black: {
    label: "BLACK",
    gradient: "linear-gradient(150deg, #0E0E0E 0%, #070707 30%, #050505 60%, #000000 100%)",
    gradientBack: "linear-gradient(150deg, #000000 0%, #050505 30%, #070707 65%, #0E0E0E 100%)",
    overlay: "radial-gradient(ellipse at 18% 10%, rgba(197,163,100,0.04) 0%, transparent 45%), radial-gradient(ellipse at 82% 90%, rgba(255,255,255,0.02) 0%, transparent 45%)",
    sheen: "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(197,163,100,0.03) 100%)",
    shadow: "0 28px 70px -10px rgba(0,0,0,0.95), 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
    borderOuter: "rgba(255,255,255,0.09)",
    textPrimary: "#F5F1E8", textSecondary: "rgba(245,241,232,0.62)",
    labelColor: "rgba(197,163,100,0.4)", accent: "#C5A364",
    heroBg: "linear-gradient(145deg, rgba(197,163,100,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    heroBorder: "rgba(197,163,100,0.18)",
    heroHighlight: "linear-gradient(180deg, rgba(197,163,100,0.1), transparent 55%)",
    progressBg: "rgba(255,255,255,0.04)",
    progressFill: "linear-gradient(90deg, #C5A364, rgba(197,163,100,0.5))",
    progressSheen: "linear-gradient(180deg, rgba(255,255,255,0.2), transparent 60%)",
    pointsNextLevel: 20000, nextTierLabel: null,
    fieldBg: "rgba(255,255,255,0.03)", fieldBorder: "rgba(255,255,255,0.06)",
    curpColor: "rgba(245,241,232,0.7)", curpDivider: "rgba(255,255,255,0.06)",
    institutionBg: "rgba(197,163,100,0.06)", institutionBorder: "rgba(197,163,100,0.18)", institutionDot: "#C5A364",
    badge: { icon: "✦", bg: "linear-gradient(135deg, #1A1A1A 0%, #000000 100%)", fg: "#C5A364", border: "rgba(197,163,100,0.35)", halo: "radial-gradient(circle, rgba(197,163,100,0.25), transparent 70%)" },
    waveOpacity: 0.04,
    photoBorder: "rgba(197,163,100,0.2)", photoBg: "rgba(255,255,255,0.03)", photoText: "#C5A364",
    qrGlow: "0 0 50px rgba(197,163,100,0.3), 0 0 100px rgba(255,255,255,0.08), 0 0 140px rgba(255,255,255,0.04)",
    divider: "rgba(197,163,100,0.1)", historyBg: "rgba(255,255,255,0.03)", historyBorder: "rgba(255,255,255,0.05)",
    hintColor: "rgba(245,241,232,0.25)", folioColor: "#C5A364",
  },
};

const tierOrder: PassportTier[] = ["base", "gold", "premium", "platinum", "black"];

const tierPoints: Record<PassportTier, number> = {
  base: 420, gold: 1850, premium: 4200, platinum: 9500, black: 18000,
};

/* ── Tier sub-components ── */

function TierBadge({ t }: { t: TierStyle }) {
  if (!t.badge) return null;
  const { icon, bg, fg, border, halo } = t.badge;
  return (
    <div className="relative inline-flex items-center">
      {halo && (
        <div
          className="absolute pointer-events-none"
          style={{ inset: -6, background: halo, filter: "blur(6px)", borderRadius: 999 }}
        />
      )}
      <div
        className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: 11, color: fg, lineHeight: 1 }}>{icon}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: fg, letterSpacing: 1.2 }}>{t.label}</span>
      </div>
    </div>
  );
}

function PointsMiniHero({ t, points }: { t: TierStyle; points: number }) {
  const pct = Math.min((points / t.pointsNextLevel) * 100, 100);
  const toGo = Math.max(t.pointsNextLevel - points, 0);
  const nextText = t.nextTierLabel
    ? `${toGo.toLocaleString()} pts para ${t.nextTierLabel}`
    : "Nivel máximo alcanzado";
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-4"
      style={{
        background: t.heroBg,
        border: `1px solid ${t.heroBorder}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(0,0,0,0.08)",
      }}
    >
      {/* Inner top highlight (Liquid Glass cue) */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "40%", background: t.heroHighlight, opacity: 0.85 }}
      />
      <div className="relative px-4 py-3">
        <div className="flex items-end justify-between">
          <div>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.2, color: t.labelColor }}>
              NIVEL {t.label}
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, letterSpacing: -0.3, lineHeight: 1 }}>
                {points.toLocaleString()}
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, color: t.textSecondary }}>pts</span>
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 500, color: t.textSecondary, textAlign: "right", maxWidth: 130 }}>
            {nextText}
          </span>
        </div>
        <div
          className="relative mt-2.5 w-full rounded-full overflow-hidden"
          style={{ height: 5, background: t.progressBg }}
        >
          <div
            className="h-full rounded-full relative"
            style={{ width: `${pct}%`, background: t.progressFill }}
          >
            {t.progressSheen && (
              <div
                className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
                style={{ height: "50%", background: t.progressSheen }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataField({
  label, value, t, accent = false, mono = false, flex = 1,
}: {
  label: string; value: string; t: TierStyle;
  accent?: boolean; mono?: boolean; flex?: number;
}) {
  return (
    <div
      className="rounded-xl px-3 py-2 relative overflow-hidden"
      style={{
        flex,
        background: t.fieldBg,
        border: `1px solid ${t.fieldBorder}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <p style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 1, color: t.labelColor }}>{label}</p>
      <p
        className={`mt-0.5 ${mono ? "font-mono" : ""}`}
        style={{
          fontSize: accent ? 16 : 13,
          fontWeight: accent ? 700 : 500,
          color: t.textPrimary,
          letterSpacing: mono ? 0.5 : 0,
          lineHeight: 1.15,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function InstitutionChip({ t }: { t: TierStyle }) {
  return (
    <div
      className="rounded-xl px-3 py-2 flex items-center gap-2.5 flex-1 relative overflow-hidden"
      style={{
        background: t.institutionBg,
        border: `1px solid ${t.institutionBorder}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${t.institutionDot}, rgba(255,255,255,0.1))`,
          boxShadow: `0 1px 3px ${t.institutionDot}33`,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary }}>U</span>
      </div>
      <div className="min-w-0 flex-1">
        <p style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 1, color: t.labelColor }}>INSTITUCIÓN</p>
        <p className="truncate mt-0.5" style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, lineHeight: 1.1 }}>
          UAT — Fac. Ingeniería
        </p>
      </div>
    </div>
  );
}

function CurpStrip({ t }: { t: TierStyle }) {
  return (
    <div
      className="flex items-center gap-3 px-1 py-2"
      style={{
        borderTop: `1px solid ${t.curpDivider}`,
        borderBottom: `1px solid ${t.curpDivider}`,
      }}
    >
      <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 1.4, color: t.labelColor, flexShrink: 0 }}>
        CURP
      </span>
      <span
        className="font-mono flex-1 text-right"
        style={{ fontSize: 11.5, color: t.curpColor, letterSpacing: 1.2 }}
      >
        LOGM030415MTSLPR08
      </span>
    </div>
  );
}

function PassportPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tier, setTier] = useState<PassportTier>("base");
  const navigate = useNavigate();
  const t = tierConfig[tier];

  const cycleTier = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    const idx = tierOrder.indexOf(tier);
    setTier(tierOrder[(idx + 1) % tierOrder.length]);
  };

  const dotColor: Record<PassportTier, string> = {
    base: "#C5A364", gold: "#D4A94E", premium: "#DD053E", platinum: "#C9C1B2", black: "#091201",
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-3">
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-[#091201] text-center" style={{ fontSize: 24, fontWeight: 600 }}>
            Mi Pasaporte
          </h1>
          <button
            onClick={cycleTier}
            className="rounded-full transition-all duration-500"
            style={{
              width: 7, height: 7, marginTop: 2,
              background: dotColor[tier],
              opacity: 0.35,
            }}
            aria-label="Cambiar tipo"
          />
        </div>
        <p className="text-center text-[#091201]/40 mt-1" style={{ fontSize: 12 }}>
          Toca la credencial para {isFlipped ? "ver datos" : "mostrar QR"}
        </p>
      </div>

      <div className="px-5" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tier}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, rotateY: isFlipped ? 180 : 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer"
            style={{ transformStyle: "preserve-3d", minHeight: "calc(100dvh - 220px)" }}
          >
            {/* ─── FRONT FACE ─── */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                boxShadow: t.shadow,
                border: t.borderOuter ? `1px solid ${t.borderOuter}` : undefined,
              }}
            >
              <div className="p-6 h-full flex flex-col relative" style={{ background: t.gradient }}>
                {/* Liquid Glass layers — subtle */}
                {t.overlay && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: t.overlay, zIndex: 1 }} />
                )}
                {t.sheen && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: t.sheen, zIndex: 1 }} />
                )}
                {/* Wave pattern refined */}
                <div className="absolute top-0 right-0 w-48 h-24" style={{ opacity: t.waveOpacity, zIndex: 1 }}>
                  <WavePattern variant="gold" />
                </div>
                {/* ── Header ── */}
                <div className="flex items-center justify-between mb-4" style={{ position: "relative", zIndex: 2 }}>
                  <div className="flex items-center gap-2">
                    <AppLogo color={t.accent} size={24} />
                    <span className="tracking-wider" style={{ fontSize: 10, fontWeight: 600, color: t.accent }}>PASAPORTE JOVEN</span>
                  </div>
                  <TierBadge t={t} />
                </div>

                {/* ── Identity: photo + name + location ── */}
                <div className="flex flex-col items-center mb-4" style={{ position: "relative", zIndex: 2 }}>
                  <div
                    className="w-24 h-28 rounded-2xl overflow-hidden mb-3 flex-shrink-0 mx-auto relative"
                    style={{
                      border: `2px solid ${t.photoBorder}`,
                      background: t.photoBg,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img src={passportPhoto} alt="Foto de perfil" className="w-full h-full object-cover object-center" />
                  </div>
                  <p className="text-center" style={{ fontSize: 19, fontWeight: 600, color: t.textPrimary, lineHeight: 1.2, letterSpacing: -0.2 }}>María Fernanda</p>
                  <p className="text-center" style={{ fontSize: 15, fontWeight: 400, color: t.textSecondary, lineHeight: 1.3 }}>López García</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin size={11} style={{ color: t.labelColor }} />
                    <span style={{ fontSize: 11, color: t.labelColor, letterSpacing: 0.2 }}>Victoria, Tamaulipas</span>
                  </div>
                </div>

                {/* ── Points Mini Hero (status + progress) ── */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <PointsMiniHero t={t} points={tierPoints[tier]} />
                </div>

                {/* ── Main data: Vigencia · Edad · Institución ── */}
                <div className="flex gap-2 mb-2.5" style={{ position: "relative", zIndex: 2 }}>
                  <DataField label="VIGENCIA" value="31/12/2026" t={t} flex={1.1} />
                  <div
                    className="rounded-xl px-2 py-2 flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      width: 54,
                      background: t.fieldBg,
                      border: `1px solid ${t.fieldBorder}`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    <p style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 1, color: t.labelColor }}>EDAD</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, lineHeight: 1, marginTop: 2, letterSpacing: -0.5 }}>23</p>
                  </div>
                </div>

                <div className="flex mb-3" style={{ position: "relative", zIndex: 2 }}>
                  <InstitutionChip t={t} />
                </div>

                {/* ── Admin: Nacimiento + CURP technical strip ── */}
                <div style={{ position: "relative", zIndex: 2 }} className="flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 1.4, color: t.labelColor }}>
                      NACIMIENTO
                    </span>
                    <span className="font-mono" style={{ fontSize: 11.5, color: t.curpColor, letterSpacing: 0.8 }}>
                      15 · 04 · 2003
                    </span>
                  </div>
                  <CurpStrip t={t} />
                </div>

                {/* ── Folio (footer, discrete) ── */}
                <div className="mt-2.5 text-center" style={{ position: "relative", zIndex: 2 }}>
                  <p className="font-mono" style={{ fontSize: 9.5, color: t.folioColor, opacity: 0.55, letterSpacing: 1.8 }}>
                    PJ-TAM-2026-04821
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0" style={{ opacity: t.waveOpacity }}>
                  <WavePattern variant="gold" className="h-10" />
                </div>
              </div>
            </div>

            {/* ─── BACK FACE ─── */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                boxShadow: t.shadow,
                border: t.borderOuter ? `1px solid ${t.borderOuter}` : undefined,
              }}
            >
              <div className="p-6 h-full flex flex-col relative" style={{ background: t.gradientBack }}>
                {t.overlay && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: t.overlay, zIndex: 1 }} />
                )}
                {t.sheen && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: t.sheen, zIndex: 1 }} />
                )}
                <div className="absolute top-0 left-0 right-0 h-28 rotate-180" style={{ opacity: t.waveOpacity, zIndex: 1 }}>
                  <WavePatternWide from={tierWaveColors[tier].from} to={tierWaveColors[tier].to} className="h-full" />
                </div>
                <div className="flex items-center justify-between mb-4" style={{ position: "relative", zIndex: 2 }}>
                  <span className="tracking-wider" style={{ fontSize: 11, fontWeight: 600, color: t.accent }}>CÓDIGO QR</span>
                  <TierBadge t={t} />
                </div>
                <div className="flex items-center justify-center my-2">
                  <div className="w-52 h-52 bg-white rounded-2xl p-3 flex items-center justify-center" style={{ boxShadow: t.qrGlow, filter: "brightness(1.15)" }}>
                    <svg width="180" height="180" viewBox="0 0 220 220" fill="none">
                      <rect x="10" y="10" width="60" height="60" rx="6" fill="#091201" />
                      <rect x="18" y="18" width="44" height="44" rx="3" fill="white" />
                      <rect x="26" y="26" width="28" height="28" rx="2" fill="#091201" />
                      <rect x="150" y="10" width="60" height="60" rx="6" fill="#091201" />
                      <rect x="158" y="18" width="44" height="44" rx="3" fill="white" />
                      <rect x="166" y="26" width="28" height="28" rx="2" fill="#091201" />
                      <rect x="10" y="150" width="60" height="60" rx="6" fill="#091201" />
                      <rect x="18" y="158" width="44" height="44" rx="3" fill="white" />
                      <rect x="26" y="166" width="28" height="28" rx="2" fill="#091201" />
                      {[80, 90, 100, 110, 120, 130].map((x) =>
                        [80, 90, 100, 110, 120, 130, 140, 150, 160, 170].map((y) =>
                          (x + y) % 20 === 0 || (x * y) % 30 < 15 ? (
                            <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                          ) : null,
                        ),
                      )}
                      {[150, 160, 170, 180, 190, 200].map((x) =>
                        [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200].map((y) =>
                          (x + y) % 25 < 10 ? (
                            <rect key={`d${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                          ) : null,
                        ),
                      )}
                    </svg>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <p style={{ fontSize: 14, fontWeight: 500, color: t.textPrimary }}>María Fernanda López García</p>
                  <p className="font-mono mt-1" style={{ fontSize: 12, color: t.folioColor }}>PJ-TAM-2026-04821</p>
                </div>
                <div className="w-full h-px my-2" style={{ background: t.divider }} />
                <div className="flex-1 min-h-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <p className="mb-2" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: t.labelColor }}>HISTORIAL DE USO</p>
                  <div className="space-y-2">
                    {usageHistory.map((u) => (
                      <div key={u.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 border" style={{ background: t.historyBg, borderColor: t.historyBorder }}>
                        <span style={{ fontSize: 18 }}>{u.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: t.textPrimary }}>{u.place}</p>
                          <p style={{ fontSize: 11, color: t.textSecondary, opacity: 0.6 }}>{u.benefit}</p>
                        </div>
                        <span className="flex-shrink-0" style={{ fontSize: 10, color: t.hintColor }}>{u.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2" style={{ color: t.hintColor }}>
                  <CreditCard size={14} />
                  <span style={{ fontSize: 11 }}>Toca para ver datos</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0" style={{ opacity: t.waveOpacity }}>
                  <WavePatternWide from={tierWaveColors[tier].from} to={tierWaveColors[tier].to} className="h-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Discrete check-in access ── */}
      <div className="px-5 mt-4">
        <button
          onClick={() => navigate("/checkin")}
          className="w-full py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/60 active:scale-[0.98] transition-transform"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <QrCode size={16} /> Check-in de evento
        </button>
      </div>
    </div>
  );
}

// 9. QR Fullscreen
function QRFullscreenPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh w-full bg-white flex flex-col items-center justify-between px-6 pt-14 pb-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AppLogo color="#59021D" size={24} />
          <span
            className="text-[#59021D]"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            Pasaporte Joven
          </span>
        </div>
        <button
          onClick={() => navigate(-1 as any)}
          className="w-9 h-9 rounded-full bg-[#F9F7EB] flex items-center justify-center"
        >
          <X size={18} className="text-[#091201]" />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <div className="w-64 h-64 bg-white rounded-3xl border-2 border-[#091201]/5 p-4 shadow-lg flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
            <rect
              x="10"
              y="10"
              width="60"
              height="60"
              rx="6"
              fill="#091201"
            />
            <rect
              x="18"
              y="18"
              width="44"
              height="44"
              rx="3"
              fill="white"
            />
            <rect
              x="26"
              y="26"
              width="28"
              height="28"
              rx="2"
              fill="#091201"
            />
            <rect
              x="150"
              y="10"
              width="60"
              height="60"
              rx="6"
              fill="#091201"
            />
            <rect
              x="158"
              y="18"
              width="44"
              height="44"
              rx="3"
              fill="white"
            />
            <rect
              x="166"
              y="26"
              width="28"
              height="28"
              rx="2"
              fill="#091201"
            />
            <rect
              x="10"
              y="150"
              width="60"
              height="60"
              rx="6"
              fill="#091201"
            />
            <rect
              x="18"
              y="158"
              width="44"
              height="44"
              rx="3"
              fill="white"
            />
            <rect
              x="26"
              y="166"
              width="28"
              height="28"
              rx="2"
              fill="#091201"
            />
            {[80, 90, 100, 110, 120, 130].map((x) =>
              [80, 90, 100, 110, 120, 130, 140, 150, 160, 170].map((y) =>
                (x + y) % 20 === 0 || (x * y) % 30 < 15 ? (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width="8"
                    height="8"
                    rx="1"
                    fill="#091201"
                  />
                ) : null,
              ),
            )}
            {[150, 160, 170, 180, 190, 200].map((x) =>
              [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200].map(
                (y) =>
                  (x + y) % 25 < 10 ? (
                    <rect
                      key={`d${x}-${y}`}
                      x={x}
                      y={y}
                      width="8"
                      height="8"
                      rx="1"
                      fill="#091201"
                    />
                  ) : null,
              ),
            )}
          </svg>
        </div>
        <div className="mt-6 text-center">
          <p
            className="text-[#091201]"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            María Fernanda López
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span
              className="text-green-600"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              Pasaporte Activo
            </span>
          </div>
          <p
            className="text-[#091201]/40 font-mono mt-2"
            style={{ fontSize: 12 }}
          >
            PJ-TAM-2026-04821
          </p>
        </div>
      </motion.div>
      <div className="text-center">
        <p className="text-[#091201]/40" style={{ fontSize: 13 }}>
          Presenta este código para que sea escaneado
        </p>
        <p className="text-[#091201]/25 mt-1" style={{ fontSize: 11 }}>
          El código se actualiza automáticamente
        </p>
      </div>
    </div>
  );
}

// 10. Explore
const exploreTypes = [
  "Todo",
  "Eventos",
  "Cursos",
  "Convocatorias",
  "Actividades",
];

const exploreItems = [
  {
    id: 1, title: "Festival Joven 2026", type: "Eventos", date: "15 May 2026",
    location: "Parque Bicentenario, Victoria", tag: "Próximo", tagColor: "#DD053E",
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80",
    pointsEarn: 25, checkInAvailable: true,
  },
  {
    id: 2, title: "Taller de Programación Web", type: "Cursos", date: "20 May - 15 Jun 2026",
    location: "En línea", tag: "Nuevo", tagColor: "#C5A364",
    img: "https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?w=400&q=80",
    pointsEarn: 20, checkInAvailable: true,
  },
  {
    id: 3, title: "Convocatoria Becas Tamaulipas", type: "Convocatorias", date: "Cierra 30 Abr 2026",
    location: "En línea", tag: "Cierra pronto", tagColor: "#DD053E",
    img: "https://images.unsplash.com/photo-1604186837076-fb47786f63ff?w=400&q=80",
  },
  {
    id: 4, title: "Torneo Deportivo Juvenil", type: "Actividades", date: "10 Jun 2026",
    location: "Centro Deportivo, Reynosa", tag: "Próximo", tagColor: "#59021D",
    img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?w=400&q=80",
    pointsEarn: 25, checkInAvailable: true,
  },
  {
    id: 5, title: "Feria de Empleo Joven", type: "Eventos", date: "25 May 2026",
    location: "Centro de Convenciones, Tampico", tag: "Nuevo", tagColor: "#C5A364",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    pointsEarn: 25, checkInAvailable: true,
  },
];

function ExplorePage() {
  const [activeType, setActiveType] = useState("Todo");
  const navigate = useNavigate();
  const filtered =
    activeType === "Todo"
      ? exploreItems
      : exploreItems.filter((i) => i.type === activeType);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1
          className="text-[#091201]"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          Explora
        </h1>
      </div>
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3">
          <Search size={18} className="text-[#091201]/30" />
          <input
            placeholder="Buscar eventos, cursos..."
            className="flex-1 bg-transparent outline-none text-[#091201] placeholder:text-[#091201]/30"
            style={{ fontSize: 14 }}
          />
        </div>
      </div>
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-none">
        {exploreTypes.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeType === t
                ? "bg-[#59021D] text-white"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {t}
          </button>
        ))}
      </div>
      {activeType === "Todo" && (
        <div className="px-5 mb-5">
          <GlassCard
            className="overflow-hidden"
            onClick={() => navigate("/explore/1")}
          >
            <ImageWithFallback
              src={exploreItems[0].img}
              alt={exploreItems[0].title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 rounded-full text-white"
                  style={{
                    background: exploreItems[0].tagColor,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {exploreItems[0].tag}
                </span>
                <span
                  className="text-[#091201]/40"
                  style={{ fontSize: 11 }}
                >
                  {exploreItems[0].type}
                </span>
              </div>
              <p
                className="text-[#091201]"
                style={{ fontSize: 17, fontWeight: 600 }}
              >
                {exploreItems[0].title}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className="flex items-center gap-1 text-[#091201]/50"
                  style={{ fontSize: 12 }}
                >
                  <Calendar size={13} />
                  {exploreItems[0].date}
                </span>
                <span
                  className="text-[#091201]/50"
                  style={{ fontSize: 12 }}
                >
                  {exploreItems[0].location}
                </span>
                {exploreItems[0].pointsEarn && <PointsBadge amount={exploreItems[0].pointsEarn} />}
              </div>
            </div>
          </GlassCard>
        </div>
      )}
      <div className="px-5 space-y-3">
        <h3
          className="text-[#091201] mb-1"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          {activeType === "Todo" ? "Próximos" : activeType}
        </h3>
        {(activeType === "Todo" ? filtered.slice(1) : filtered).map((item) => (
          <GlassCard
            key={item.id}
            className="flex overflow-hidden"
            onClick={() => navigate(`/explore/${item.id}`)}
          >
            <ImageWithFallback
              src={item.img}
              alt={item.title}
              className="w-24 h-24 object-cover"
            />
            <div className="flex-1 p-3 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    background: `${item.tagColor}15`,
                    color: item.tagColor,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <p
                className="text-[#091201] truncate"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-[#091201]/40" />
                <span
                  className="text-[#091201]/50"
                  style={{ fontSize: 12 }}
                >
                  {item.date}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p
                  className="text-[#091201]/40 truncate"
                  style={{ fontSize: 11 }}
                >
                  {item.location}
                </p>
                {item.pointsEarn && <PointsBadge amount={item.pointsEarn} />}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// 11. Explore Detail
const exploreDetails: Record<
  string,
  {
    title: string; type: string; date: string; location: string;
    desc: string; reqs: string; img: string;
    pointsEarn?: number; checkInAvailable?: boolean;
  }
> = {
  "1": {
    title: "Festival Joven 2026", type: "Evento",
    date: "15 de mayo de 2026, 16:00 hrs", location: "Parque Bicentenario, Cd. Victoria",
    desc: "Un día lleno de música en vivo, actividades recreativas, stands informativos y networking para jóvenes de todo Tamaulipas.",
    reqs: "Tener Pasaporte Joven activo. Registro previo en la app.",
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    pointsEarn: 25, checkInAvailable: true,
  },
  "2": {
    title: "Taller de Programación Web", type: "Curso",
    date: "20 mayo - 15 junio, 2026", location: "En línea (Zoom)",
    desc: "Aprende los fundamentos de HTML, CSS y JavaScript en este curso intensivo de 4 semanas.",
    reqs: "Computadora con acceso a internet. Sin conocimiento previo necesario.",
    img: "https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?w=800&q=80",
    pointsEarn: 20, checkInAvailable: true,
  },
  "3": {
    title: "Convocatoria Becas Tamaulipas", type: "Convocatoria",
    date: "Cierra 30 de abril de 2026", location: "En línea",
    desc: "Programa de becas para jóvenes tamaulipecos que deseen continuar sus estudios de nivel superior.",
    reqs: "Ser residente de Tamaulipas. Promedio mínimo de 8.0. Estar inscrito en nivel superior.",
    img: "https://images.unsplash.com/photo-1604186837076-fb47786f63ff?w=800&q=80",
  },
};

function ExploreDetailPage() {
  const navigate = useNavigate();
  const { id = "1" } = useParams();
  const item = exploreDetails[id] || exploreDetails["1"];

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-40">
      <div className="relative h-52">
        <ImageWithFallback
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          onClick={() => navigate(-1 as any)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#091201]" />
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <span
            className="px-2.5 py-1 rounded-full bg-[#DD053E] text-white"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            {item.type}
          </span>
        </div>
      </div>
      <div className="px-5 mt-5">
        <h1
          className="text-[#091201]"
          style={{ fontSize: 22, fontWeight: 600 }}
        >
          {item.title}
        </h1>
        <div className="flex flex-col gap-2 mt-4">
          <div
            className="flex items-center gap-2 text-[#091201]/60"
            style={{ fontSize: 13 }}
          >
            <Calendar size={16} />
            <span>{item.date}</span>
          </div>
          <div
            className="flex items-center gap-2 text-[#091201]/60"
            style={{ fontSize: 13 }}
          >
            <MapPin size={16} />
            <span>{item.location}</span>
          </div>
        </div>
      </div>
      <div className="px-5 mt-6">
        <h3
          className="text-[#091201] mb-2"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          Descripción
        </h3>
        <p
          className="text-[#091201]/60"
          style={{ fontSize: 14, lineHeight: 1.7 }}
        >
          {item.desc}
        </p>
      </div>
      {item.reqs && (
        <div className="px-5 mt-5">
          <h3
            className="text-[#091201] mb-2"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            Requisitos
          </h3>
          <GlassCard className="p-4">
            <p
              className="text-[#091201]/60"
              style={{ fontSize: 13, lineHeight: 1.7 }}
            >
              {item.reqs}
            </p>
          </GlassCard>
        </div>
      )}
      {/* ── Points for attendance ── */}
      {item.pointsEarn && (
        <div className="px-5 mt-5">
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(197,163,100,0.12)" }}>
              <Star size={18} className="text-[#C5A364]" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 600, color: "#C5A364" }}>Gana +{item.pointsEarn} pts</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>
                {item.checkInAvailable ? "Haz check-in al asistir" : "Al completar esta actividad"}
              </p>
            </div>
            {item.checkInAvailable && (
              <button
                onClick={() => navigate("/checkin")}
                className="px-3 py-1.5 rounded-xl active:scale-[0.97] transition-transform"
                style={{ background: "rgba(197,163,100,0.12)", fontSize: 12, fontWeight: 500, color: "#C5A364" }}
              >
                Check-in
              </button>
            )}
          </GlassCard>
        </div>
      )}

      <div className="px-5 mt-5 flex gap-3">
        <button
          className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <Bookmark size={16} /> Guardar
        </button>
        <button
          className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          <Share2 size={16} /> Compartir
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-5 pb-24 bg-gradient-to-t from-[#F9F7EB] to-transparent">
        <button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          Registrarme
        </button>
      </div>
    </div>
  );
}

// 12. Profile
const profileMenuItems = [
  { icon: Settings, label: "Ajustes", color: "#091201", path: "/settings" },
  { icon: Shield, label: "Privacidad", color: "#091201" },
  { icon: HelpCircle, label: "Ayuda y soporte", color: "#091201" },
  { icon: LogOut, label: "Cerrar sesión", color: "#DD053E", path: "/" },
];

function ProfilePage() {
  const navigate = useNavigate();
  const g = useGamification();

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-6 text-center">
        <h1
          className="text-[#091201]"
          style={{ fontSize: 24, fontWeight: 600 }}
        >
          Perfil
        </h1>
      </div>
      <div className="flex flex-col items-center px-5 mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#CB0723] to-[#6A002C] flex items-center justify-center mb-3 shadow-lg shadow-[#59021D]/20">
          <span
            className="text-white"
            style={{ fontSize: 32, fontWeight: 700 }}
          >
            MF
          </span>
        </div>
        <p
          className="text-[#091201]"
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          María Fernanda López
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-green-600" style={{ fontSize: 13 }}>
            Pasaporte Activo
          </span>
        </div>
      </div>

      {/* ── Points & Activity section ── */}
      <div className="px-5 mb-6">
        <GlassCard className="p-4" onClick={() => navigate("/points")}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(197,163,100,0.12)" }}>
                <Star size={20} className="text-[#C5A364]" />
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#091201" }}>{g.balance.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(9,18,1,0.4)" }}>puntos</span></p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StreakBadge streak={g.streak} compact />
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#091201]/20" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {g.badges.filter(b => b.unlocked).slice(0, 4).map(b => (
              <BadgeIcon key={b.id} badge={b} size="sm" />
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="px-5 mb-6">
        <h3
          className="text-[#091201] mb-3 flex items-center gap-2"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          <Heart size={16} className="text-[#DD053E]" /> Mis intereses
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Cultura", "Tecnología", "Comida", "Deporte"].map((i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 mb-6">
        <GlassCard className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <p
                className="text-[#091201]"
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                12
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>
                Beneficios usados
              </p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p
                className="text-[#091201]"
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                3
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>
                Eventos asistidos
              </p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p
                className="text-[#091201]"
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                8
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>
                Meses activo
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
      <div className="px-5 space-y-2">
        {profileMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={item.label}
              className="p-4 flex items-center gap-3"
              onClick={item.path ? () => navigate(item.path!) : undefined}
            >
              <Icon size={20} style={{ color: item.color }} />
              <span
                className="flex-1"
                style={{ color: item.color, fontSize: 15, fontWeight: 500 }}
              >
                {item.label}
              </span>
              {item.label !== "Cerrar sesión" && (
                <ChevronRight size={18} className="text-[#091201]/20" />
              )}
            </GlassCard>
          );
        })}
      </div>
      <div className="flex flex-col items-center mt-8 gap-2">
        <AppLogo color="#DBC8A7" size={32} />
        <p className="text-[#091201]/20" style={{ fontSize: 11 }}>
          Pasaporte Joven v1.0
        </p>
      </div>
    </div>
  );
}

// 13. Settings
function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1 as any)}
          className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#091201]" />
        </button>
        <h1 className="text-[#091201]" style={{ fontSize: 24, fontWeight: 600 }}>
          Ajustes
        </h1>
      </div>

      {/* Wallet section */}
      <div className="px-5 mb-6">
        <p className="text-[#091201]/50 mb-3" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
          BILLETERAS DIGITALES
        </p>
        <div className="space-y-3">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
              <Smartphone size={22} className="text-[#091201]/60" />
            </div>
            <div className="flex-1">
              <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>
                Añadir a Apple Wallet
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
                Accede a tu pasaporte desde tu billetera
              </p>
            </div>
            <ChevronRight size={18} className="text-[#091201]/20" />
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
              <Wallet size={22} className="text-[#091201]/60" />
            </div>
            <div className="flex-1">
              <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>
                Añadir a Google Wallet
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
                Accede a tu pasaporte desde tu billetera
              </p>
            </div>
            <ChevronRight size={18} className="text-[#091201]/20" />
          </GlassCard>
        </div>
      </div>

      {/* General settings */}
      <div className="px-5 mb-6">
        <p className="text-[#091201]/50 mb-3" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
          GENERAL
        </p>
        <div className="space-y-3">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
              <Bell size={22} className="text-[#091201]/60" />
            </div>
            <div className="flex-1">
              <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>
                Notificaciones
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
                Configura tus alertas
              </p>
            </div>
            <ChevronRight size={18} className="text-[#091201]/20" />
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
              <Globe size={22} className="text-[#091201]/60" />
            </div>
            <div className="flex-1">
              <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>
                Idioma
              </p>
              <p className="text-[#091201]/40" style={{ fontSize: 12 }}>
                Español (México)
              </p>
            </div>
            <ChevronRight size={18} className="text-[#091201]/20" />
          </GlassCard>
        </div>
      </div>

      {/* About */}
      <div className="px-5">
        <p className="text-[#091201]/50 mb-3" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
          ACERCA DE
        </p>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AppLogo color="#59021D" size={32} />
            <div>
              <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Pasaporte Joven</p>
              <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Versión 1.0.0</p>
            </div>
          </div>
          <p className="text-[#091201]/40" style={{ fontSize: 12, lineHeight: 1.6 }}>
            Gobierno de Tamaulipas — Instituto de la Juventud
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

/* ──────────── Router ──────────── */

const ErrorFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#F9F7EB]">
    <div className="text-center px-6">
      <p style={{ fontSize: 16, fontWeight: 600, color: "#091201", marginBottom: 8 }}>
        Algo salió mal
      </p>
      <p style={{ fontSize: 14, color: "rgba(9,18,1,0.6)" }}>
        Por favor, intenta recargar la página
      </p>
    </div>
  </div>
);

const router = createBrowserRouter([
  { path: "/", Component: SplashPage, errorElement: <ErrorFallback /> },
  { path: "/onboarding", Component: OnboardingPage, errorElement: <ErrorFallback /> },
  { path: "/register", Component: RegisterPage, errorElement: <ErrorFallback /> },
  { path: "/profile-setup", Component: ProfileSetupPage, errorElement: <ErrorFallback /> },
  {
    Component: AppLayout,
    errorElement: <ErrorFallback />,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/benefits", Component: BenefitsPage },
      { path: "/benefits/:id", Component: BenefitDetailPage },
      { path: "/passport", Component: PassportPage },
      { path: "/explore", Component: ExplorePage },
      { path: "/explore/:id", Component: ExploreDetailPage },
      { path: "/profile", Component: ProfilePage },
      { path: "/settings", Component: SettingsPage },
      { path: "/points", Component: MisPointsPage },
      { path: "/points/claim", Component: DailyClaimPage },
      { path: "/points/challenges", Component: RetosPage },
      { path: "/points/redeem", Component: CanjePage },
      { path: "/points/redeem/:id", Component: RewardDetailPage },
      { path: "/points/history", Component: HistorialPage },
      { path: "/points/badges", Component: BadgesPage },
      { path: "/checkin", Component: CheckInPage },
      { path: "/checkin/success", Component: CheckInSuccessPage },
    ],
  },
  { path: "/passport/qr", Component: QRFullscreenPage, errorElement: <ErrorFallback /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
