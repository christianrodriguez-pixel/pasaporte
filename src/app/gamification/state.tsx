import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface PointsHistoryEntry {
  id: number;
  type: "earn" | "spend";
  amount: number;
  label: string;
  date: string;
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  desc: string;
}

export interface Challenge {
  id: number;
  name: string;
  desc: string;
  points: number;
  progress: number;
  total: number;
  category: "hoy" | "semana" | "especiales" | "logros";
  cta: string;
  icon: string;
}

export interface Reward {
  id: number;
  name: string;
  brand: string;
  cost: number;
  desc: string;
  conditions: string;
  expiry: string;
  img: string;
  category: string;
}

export interface DailyReward {
  day: number;
  points: number;
  claimed: boolean;
  today: boolean;
}

interface GamificationState {
  balance: number;
  streak: number;
  dailyClaimed: boolean;
  dailyRewards: DailyReward[];
  history: PointsHistoryEntry[];
  badges: Badge[];
  challenges: Challenge[];
  rewards: Reward[];
  claimDaily: () => void;
  spendPoints: (amount: number, label: string) => boolean;
  earnPoints: (amount: number, label: string, icon?: string) => void;
  completeCheckIn: (eventName: string, points: number) => void;
}

const GamificationContext = createContext<GamificationState | null>(null);

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be inside GamificationProvider");
  return ctx;
}

/* ── Initial mock data ── */

const initialHistory: PointsHistoryEntry[] = [
  { id: 1, type: "earn", amount: 10, label: "Reclamo diario", date: "19 Abr 2026", icon: "+" },
  { id: 2, type: "earn", amount: 25, label: "Check-in: Festival Joven", date: "18 Abr 2026", icon: "+" },
  { id: 3, type: "spend", amount: 120, label: "Canje: Cinépolis 2x1", date: "15 Abr 2026", icon: "-" },
  { id: 4, type: "earn", amount: 15, label: "Uso de beneficio: Librería Porrúa", date: "12 Abr 2026", icon: "+" },
  { id: 5, type: "earn", amount: 10, label: "Reclamo diario", date: "11 Abr 2026", icon: "+" },
  { id: 6, type: "earn", amount: 30, label: "Reto completado: Usa un beneficio", date: "10 Abr 2026", icon: "+" },
  { id: 7, type: "earn", amount: 25, label: "Check-in: Taller de Programación", date: "8 Abr 2026", icon: "+" },
  { id: 8, type: "spend", amount: 80, label: "Canje: Entrada preferente", date: "5 Abr 2026", icon: "-" },
];

const initialBadges: Badge[] = [
  { id: "first-checkin", name: "Primer check-in", icon: "📍", unlocked: true, desc: "Hiciste tu primer check-in en un evento" },
  { id: "streak-7", name: "Racha de 7 días", icon: "🔥", unlocked: true, desc: "Mantuviste una racha de 7 días consecutivos" },
  { id: "active", name: "Participante activo", icon: "⚡", unlocked: true, desc: "Asististe a 3 eventos en un mes" },
  { id: "explorer", name: "Explorador cultural", icon: "🎭", unlocked: false, desc: "Visita 5 eventos culturales diferentes" },
  { id: "route", name: "Ruta completada", icon: "🗺️", unlocked: false, desc: "Completa una ruta temática de actividades" },
  { id: "benefactor", name: "Beneficiario estrella", icon: "⭐", unlocked: false, desc: "Usa 10 beneficios diferentes" },
];

const initialChallenges: Challenge[] = [
  { id: 1, name: "Haz check-in en una actividad", desc: "Asiste a cualquier evento y registra tu llegada", points: 25, progress: 0, total: 1, category: "hoy", cta: "Ir a check-in", icon: "📍" },
  { id: 2, name: "Guarda una actividad", desc: "Marca como favorita cualquier evento o curso", points: 5, progress: 0, total: 1, category: "hoy", cta: "Explorar", icon: "🔖" },
  { id: 3, name: "Reclama tus puntos diarios", desc: "Entra cada día y reclama tu recompensa", points: 10, progress: 0, total: 1, category: "hoy", cta: "Reclamar", icon: "🎁" },
  { id: 4, name: "Usa un beneficio esta semana", desc: "Presenta tu pasaporte y usa cualquier beneficio", points: 30, progress: 0, total: 1, category: "semana", cta: "Ver beneficios", icon: "🎟️" },
  { id: 5, name: "Asiste a 2 eventos esta semana", desc: "Haz check-in en al menos 2 eventos", points: 50, progress: 1, total: 2, category: "semana", cta: "Explorar eventos", icon: "🎪" },
  { id: 6, name: "Comparte un beneficio", desc: "Comparte cualquier beneficio con un amigo", points: 10, progress: 0, total: 1, category: "semana", cta: "Compartir", icon: "📤" },
  { id: 7, name: "Completa 3 actividades del mes", desc: "Participa en 3 actividades diferentes este mes", points: 80, progress: 2, total: 3, category: "especiales", cta: "Ver actividades", icon: "🏆" },
  { id: 8, name: "Acumula 500 puntos", desc: "Llega a 500 puntos en tu saldo total", points: 100, progress: 420, total: 500, category: "especiales", cta: "Seguir ganando", icon: "💎" },
  { id: 9, name: "Primer check-in", desc: "Realiza tu primer check-in en cualquier evento", points: 25, progress: 1, total: 1, category: "logros", cta: "Completado", icon: "📍" },
  { id: 10, name: "Racha de 7 días", desc: "Reclama puntos durante 7 días consecutivos", points: 50, progress: 5, total: 7, category: "logros", cta: "Sigue así", icon: "🔥" },
];

const initialRewards: Reward[] = [
  { id: 1, name: "2x1 en boletos de cine", brand: "Cinépolis", cost: 120, desc: "Obtén dos boletos por el precio de uno en cualquier sala estándar.", conditions: "Válido de lunes a jueves. No acumulable.", expiry: "31 Dic 2026", img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?w=400&q=80", category: "Entretenimiento" },
  { id: 2, name: "Acceso preferente a evento", brand: "Pasaporte Joven", cost: 200, desc: "Acceso VIP al próximo evento oficial de Pasaporte Joven.", conditions: "Sujeto a disponibilidad. Un canje por persona.", expiry: "30 Jun 2026", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80", category: "Eventos" },
  { id: 3, name: "Descuento extra 10% en librería", brand: "Librería Porrúa", cost: 80, desc: "Descuento adicional del 10% sobre tu compra de libros.", conditions: "No acumulable con otros descuentos. Compra mínima $200.", expiry: "30 Sep 2026", img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?w=400&q=80", category: "Educación" },
  { id: 4, name: "Mes gratis de gimnasio", brand: "Gym Iron Fitness", cost: 300, desc: "Un mes de membresía completamente gratis.", conditions: "Solo para nuevos miembros o membresías vencidas.", expiry: "31 Dic 2026", img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?w=400&q=80", category: "Deporte" },
  { id: 5, name: "Combo especial gratis", brand: "Tacos Don Pepe", cost: 60, desc: "Un combo especial (3 tacos + refresco) totalmente gratis.", conditions: "Válido en sucursales participantes. Una vez por persona.", expiry: "28 Feb 2027", img: "https://images.unsplash.com/photo-1666307551254-eacbfaff5369?w=400&q=80", category: "Comida" },
  { id: 6, name: "Entrada gratis al museo", brand: "Museo de Arte Contemporáneo", cost: 50, desc: "Entrada gratuita cualquier día de la semana (incluye exposiciones especiales).", conditions: "Un canje por semana.", expiry: "31 Dic 2026", img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?w=400&q=80", category: "Cultura" },
];

const initialDailyRewards: DailyReward[] = [
  { day: 1, points: 5, claimed: true, today: false },
  { day: 2, points: 5, claimed: true, today: false },
  { day: 3, points: 10, claimed: true, today: false },
  { day: 4, points: 5, claimed: true, today: false },
  { day: 5, points: 10, claimed: false, today: true },
  { day: 6, points: 15, claimed: false, today: false },
  { day: 7, points: 30, claimed: false, today: false },
];

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(420);
  const [streak, setStreak] = useState(5);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [dailyRewards, setDailyRewards] = useState(initialDailyRewards);
  const [history, setHistory] = useState(initialHistory);
  const [badges] = useState(initialBadges);
  const [challenges] = useState(initialChallenges);
  const [rewards] = useState(initialRewards);

  const addHistory = useCallback((type: "earn" | "spend", amount: number, label: string) => {
    setHistory(prev => [{
      id: Date.now(),
      type,
      amount,
      label,
      date: "20 Abr 2026",
      icon: type === "earn" ? "+" : "-",
    }, ...prev]);
  }, []);

  const claimDaily = useCallback(() => {
    if (dailyClaimed) return;
    const todayReward = dailyRewards.find(d => d.today);
    const pts = todayReward?.points || 10;
    setBalance(b => b + pts);
    setStreak(s => s + 1);
    setDailyClaimed(true);
    setDailyRewards(prev => prev.map(d => d.today ? { ...d, claimed: true } : d));
    addHistory("earn", pts, "Reclamo diario");
  }, [dailyClaimed, dailyRewards, addHistory]);

  const spendPoints = useCallback((amount: number, label: string) => {
    if (balance < amount) return false;
    setBalance(b => b - amount);
    addHistory("spend", amount, label);
    return true;
  }, [balance, addHistory]);

  const earnPoints = useCallback((amount: number, label: string) => {
    setBalance(b => b + amount);
    addHistory("earn", amount, label);
  }, [addHistory]);

  const completeCheckIn = useCallback((eventName: string, points: number) => {
    setBalance(b => b + points);
    addHistory("earn", points, `Check-in: ${eventName}`);
  }, [addHistory]);

  return (
    <GamificationContext.Provider value={{
      balance, streak, dailyClaimed, dailyRewards, history,
      badges, challenges, rewards,
      claimDaily, spendPoints, earnPoints, completeCheckIn,
    }}>
      {children}
    </GamificationContext.Provider>
  );
}
