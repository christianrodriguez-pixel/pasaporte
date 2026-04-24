import { useState, useEffect, type CSSProperties, type ComponentType } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { Star, Flame, ChevronRight, QrCode, CheckCircle2, ArrowRight, Filter, Clock, MapPin, Calendar, Gift, Target, Ticket, ClipboardList, Sparkles, Award, Landmark, Route, Lock } from "lucide-react";
import { useGamification } from "./state";
import {
  PointsBadge, StreakBadge, BalanceCompact, ChallengeCard,
  RewardCard, HistoryItem, BadgeIcon, StreakCalendar,
  SubPageHeader, SectionHeader,
} from "./components";
import { WavePattern } from "../components/wave-pattern";

/* ════════════════════════════════════════
   1. MIS PUNTOS — Main hub
   ════════════════════════════════════════ */

/* Next milestone calculation */
const POINT_TIERS = [100, 250, 500, 1000, 2500, 5000, 10000];
function getNextMilestone(balance: number): number {
  return POINT_TIERS.find(t => t > balance) || Math.ceil(balance / 1000) * 1000 + 1000;
}

/* Animated count-up number */
function CountUp({ value, duration = 0.8, style }: { value: number; duration?: number; style?: CSSProperties }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [value, duration, mv]);
  return <motion.span style={style}>{rounded}</motion.span>;
}

function BalanceHero({ balance, streak }: { balance: number; streak: number }) {
  const nextGoal = getNextMilestone(balance);
  const prevGoal = POINT_TIERS.filter(t => t <= balance).pop() || 0;
  const span = nextGoal - prevGoal;
  const pct = Math.min(((balance - prevGoal) / span) * 100, 100);
  const toGo = nextGoal - balance;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/50 shadow-[0_4px_24px_rgba(9,18,1,0.08)]"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(249,247,235,0.9) 45%, rgba(219,200,167,0.45) 100%)",
      }}
    >
      {/* Soft halo */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(197,163,100,0.35) 0%, transparent 70%)" }}
      />
      <div className="relative p-0">

        {/* ── Dark wine gradient background — full-bleed within card ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(125deg, #3A0012 0%, #59021D 38%, #7A0228 65%, #4A0118 100%)",
          }}
        />

        {/* ── Liquid glass: top sheen highlight ── */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "48%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)",
          }}
        />

        {/* ── Wave watermark — trama de marca en opacidad muy baja ── */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.055 }}
        >
          <WavePattern variant="red" className="absolute bottom-0 left-0 w-full h-full" />
        </div>

        {/* ── Radial glow behind emblem ── */}
        <div
          className="absolute right-0 top-0 bottom-0 w-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(197,163,100,0.22) 0%, transparent 70%)",
          }}
        />

        {/* ── Streak chip — absolute top-right ── */}
        <div
          className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #CB0723 0%, #DD053E 100%)",
            boxShadow: "0 2px 8px rgba(221,5,62,0.45)",
            zIndex: 10,
          }}
        >
          <Flame size={11} fill="rgba(255,255,255,0.9)" strokeWidth={0} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#FFFFFF", letterSpacing: 0.3 }}>
            Racha: {streak} días
          </span>
        </div>

        {/* ── Two-zone content layout ── */}
        <div className="relative flex items-center px-5 pt-5 pb-5">

          {/* LEFT ZONE */}
          <div className="flex-1 min-w-0 pr-3">

            {/* Label */}
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.1, color: "rgba(249,247,235,0.5)" }}>
              SALDO DISPONIBLE
            </p>

            {/* Balance — cifra dominante */}
            <div className="flex items-end gap-1.5 mt-1.5">
              <CountUp
                value={balance}
                style={{
                  fontSize: 54,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#F9F7EB",
                  letterSpacing: -1.5,
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(249,247,235,0.5)",
                  marginBottom: 6,
                  letterSpacing: 0.2,
                }}
              >
                pts
              </span>
            </div>

            {/* Próximo nivel */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <Star size={11} strokeWidth={0} fill="#C5A364" className="shrink-0" />
              <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(249,247,235,0.6)" }}>
                Próximo nivel:{" "}
                <span style={{ color: "#DBC8A7", fontWeight: 700 }}>
                  {nextGoal.toLocaleString()} pts
                </span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-2.5">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 5, background: "rgba(249,247,235,0.12)" }}
              >
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg, #C5A364 0%, #DBC8A7 85%, #f0deb0 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                >
                  {/* Micro brillo en la barra */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/3"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, transparent 100%)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Meta */}
              <p className="mt-1.5" style={{ fontSize: 10, fontWeight: 500, color: "rgba(249,247,235,0.42)" }}>
                {toGo} pts para llegar a{" "}
                <span style={{ color: "#DBC8A7", fontWeight: 700 }}>Gold</span>
              </p>
            </div>
          </div>

          {/* RIGHT ZONE — emblema circular premium */}
          <div
            className="relative shrink-0 flex items-center justify-center"
            style={{ width: 88, height: 88 }}
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(197,163,100,0.28) 30%, transparent 72%)",
              }}
            />
            {/* Anillo exterior */}
            <div
              className="absolute rounded-full"
              style={{ inset: 0, border: "1px solid rgba(197,163,100,0.22)" }}
            />
            {/* Anillo intermedio giratorio */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: 11, border: "1px dashed rgba(197,163,100,0.32)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            {/* Núcleo dorado */}
            <motion.div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                inset: 21,
                background:
                  "linear-gradient(145deg, #C8A84B 0%, #DBC8A7 50%, #C5A364 100%)",
                boxShadow:
                  "0 0 18px rgba(197,163,100,0.55), inset 0 2px 6px rgba(255,255,255,0.40), inset 0 -2px 4px rgba(0,0,0,0.14)",
              }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star size={20} fill="#FFFFFF" strokeWidth={0} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionTile({
  label,
  subtitle,
  hint,
  icon: Icon,
  iconColor,
  iconBackground,
  borderColor,
  onClick,
}: {
  label: string;
  subtitle: string;
  hint: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: CSSProperties }>;
  iconColor: string;
  iconBackground: string;
  borderColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[126px] flex-col justify-between rounded-[24px] border bg-white/72 px-4 py-4 text-left shadow-[0_12px_28px_rgba(9,18,1,0.05)] backdrop-blur-sm active:scale-[0.98] transition-transform"
      style={{ borderColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: iconBackground }}
        >
          <Icon size={20} strokeWidth={1.9} className={""} style={{ color: iconColor } as CSSProperties} />
        </div>
        <ChevronRight size={16} style={{ color: "rgba(9,18,1,0.22)" }} />
      </div>

      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#091201", lineHeight: 1.15 }}>
          {label}
        </p>
        <p style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: iconColor, lineHeight: 1.15 }}>
          {subtitle}
        </p>
        <p style={{ marginTop: 4, fontSize: 11, fontWeight: 500, color: "rgba(9,18,1,0.45)", lineHeight: 1.3 }}>
          {hint}
        </p>
      </div>
    </button>
  );
}

function BadgeMedal({
  label,
  statusText,
  state,
  icon: Icon,
  progressPct,
  isNew = false,
}: {
  label: string;
  statusText: string;
  state: "unlocked" | "progress" | "locked";
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: CSSProperties }>;
  progressPct?: number;
  isNew?: boolean;
}) {
  const progress = Math.max(progressPct ?? 0, 8);
  const ringBackground =
    state === "unlocked"
      ? "linear-gradient(135deg, #E4C36F 0%, #B88537 100%)"
      : state === "progress"
        ? `conic-gradient(from 220deg, #DD053E 0 ${progress}%, rgba(221,5,62,0.14) ${progress}% 100%)`
        : "rgba(9,18,1,0.09)";

  const innerBackground =
    state === "unlocked"
      ? "linear-gradient(145deg, rgba(255,248,229,0.98) 0%, rgba(241,221,180,0.94) 100%)"
      : state === "progress"
        ? "linear-gradient(145deg, rgba(255,248,245,0.98) 0%, rgba(250,237,231,0.96) 100%)"
        : "linear-gradient(145deg, rgba(240,236,227,0.96) 0%, rgba(230,224,211,0.94) 100%)";

  const iconColor =
    state === "unlocked"
      ? "#8A6428"
      : state === "progress"
        ? "#9A042F"
        : "rgba(9,18,1,0.28)";

  const statusColor =
    state === "unlocked"
      ? "#8A6428"
      : state === "progress"
        ? "#DD053E"
        : "rgba(9,18,1,0.42)";

  return (
    <div
      className="min-w-[98px] flex-shrink-0 rounded-[24px] border border-white/55 bg-white/72 px-3.5 py-3.5 text-center shadow-[0_12px_28px_rgba(9,18,1,0.05)] backdrop-blur-sm"
    >
      <div className="relative mx-auto h-16 w-16">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: ringBackground,
            boxShadow: state === "unlocked" ? "0 8px 20px rgba(197,163,100,0.18)" : "none",
          }}
        />
        <div
          className="absolute inset-[3px] rounded-full border flex items-center justify-center"
          style={{
            background: innerBackground,
            borderColor: state === "locked" ? "rgba(9,18,1,0.07)" : "rgba(255,255,255,0.55)",
          }}
        >
          <Icon size={24} strokeWidth={2} style={{ color: iconColor } as CSSProperties} />
        </div>

        {isNew && (
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-[3px]"
            style={{
              background: "linear-gradient(135deg, #CB0723 0%, #DD053E 100%)",
              boxShadow: "0 4px 10px rgba(221,5,62,0.22)",
            }}
          >
            <span style={{ fontSize: 8, fontWeight: 800, color: "#FFFFFF", letterSpacing: 0.3 }}>
              NUEVA
            </span>
          </div>
        )}

        {state === "locked" && (
          <div
            className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border bg-[#F9F7EB]"
            style={{ borderColor: "rgba(9,18,1,0.12)" }}
          >
            <Lock size={10} strokeWidth={2.3} style={{ color: "rgba(9,18,1,0.42)" } as CSSProperties} />
          </div>
        )}
      </div>

      <p
        style={{
          marginTop: 12,
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1.25,
          color: state === "locked" ? "rgba(9,18,1,0.58)" : "#091201",
        }}
      >
        {label}
      </p>
      <p style={{ marginTop: 5, fontSize: 10, fontWeight: 700, lineHeight: 1.1, color: statusColor }}>
        {statusText}
      </p>
    </div>
  );
}

export function MisPointsPage() {
  const navigate = useNavigate();
  const g = useGamification();

  const activeRetosCount = g.challenges.filter(c => c.category === "hoy" && c.progress < c.total).length;
  const rewardsCount = g.rewards.length;
  const quickActions = [
    {
      label: "Retos",
      subtitle: `${activeRetosCount} activos`,
      hint: "Ver progreso",
      icon: Target,
      iconColor: "#9A042F",
      iconBackground: "rgba(221,5,62,0.10)",
      borderColor: "rgba(221,5,62,0.14)",
      onClick: () => navigate("/points/challenges"),
    },
    {
      label: "Canjear",
      subtitle: "Desde 100 pts",
      hint: `${rewardsCount} premios disponibles`,
      icon: Ticket,
      iconColor: "#B65E18",
      iconBackground: "rgba(197,163,100,0.14)",
      borderColor: "rgba(197,163,100,0.18)",
      onClick: () => navigate("/points/redeem"),
    },
    {
      label: "Historial",
      subtitle: "Movimientos",
      hint: "Ver actividad",
      icon: ClipboardList,
      iconColor: "#6C6354",
      iconBackground: "rgba(9,18,1,0.05)",
      borderColor: "rgba(9,18,1,0.08)",
      onClick: () => navigate("/points/history"),
    },
  ] as const;

  const showcaseBadges = [
    { id: "checkin", label: "Primer check-in", statusText: "Completada", state: "unlocked", icon: MapPin, isNew: true },
    { id: "racha7", label: "Racha de 7 días", statusText: "5/7", state: "progress", icon: Flame, progressPct: (5 / 7) * 100 },
    { id: "active", label: "Participante activo", statusText: "Completada", state: "unlocked", icon: Award },
    { id: "explor", label: "Explorador cultural", statusText: "2/5", state: "progress", icon: Landmark, progressPct: (2 / 5) * 100 },
    { id: "ruta", label: "Ruta completada", statusText: "0/3", state: "locked", icon: Route },
    { id: "estrella", label: "Beneficiario estrella", statusText: "0/10", state: "locked", icon: Star },
  ] as const;

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Mis puntos" onBack={() => navigate(-1 as any)} />

      {/* Hero */}
      <div className="px-5 mb-4">
        <BalanceHero balance={g.balance} streak={g.streak} />
      </div>

      {/* ── Quick Actions ── */}
      <div className="px-5 mb-5">
        {(() => {
          const tiles = [
            {
              id: "claim",
              title: "Reclamo",
              subtitle: "Reclama tus pts",
              chip: "Hoy",
              kind: "primary" as const,
              onClick: () => navigate("/points/claim"),
            },
            {
              id: "challenges",
              title: "Retos",
              pill: `${activeRetosCount} activos`,
              kind: "active" as const,
              onClick: () => navigate("/points/challenges"),
            },
            {
              id: "redeem",
              title: "Canjear",
              subtitle: "Desde 100 pts",
              kind: "value" as const,
              onClick: () => navigate("/points/redeem"),
            },
            {
              id: "history",
              title: "Historial",
              subtitle: "Ver movimientos",
              kind: "neutral" as const,
              onClick: () => navigate("/points/history"),
            },
          ] as const;

          function renderArtwork(id: string) {
            switch (id) {
              case "claim":
                return (
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                    <defs>
                      <linearGradient id="claim-box" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F15B76" />
                        <stop offset="1" stopColor="#BA0B30" />
                      </linearGradient>
                      <linearGradient id="claim-lid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#FF738E" />
                        <stop offset="1" stopColor="#D8133E" />
                      </linearGradient>
                      <linearGradient id="claim-ribbon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F2D88B" />
                        <stop offset="1" stopColor="#BA8D35" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="23" cy="33" rx="13" ry="3.2" fill="rgba(186,11,48,0.10)" />
                    <rect x="9" y="19" width="28" height="17" rx="3" fill="url(#claim-box)" />
                    <rect x="8" y="15" width="30" height="7" rx="2.2" fill="url(#claim-lid)" />
                    <rect x="21" y="15" width="4" height="21" fill="url(#claim-ribbon)" />
                    <path d="M23 15 C17.5 10.3 15.2 7.7 16.7 6.4 C18.4 4.9 21.2 8.7 23 13.4 Z" fill="url(#claim-ribbon)" />
                    <path d="M23 15 C28.5 10.3 30.8 7.7 29.3 6.4 C27.6 4.9 24.8 8.7 23 13.4 Z" fill="url(#claim-ribbon)" />
                    <circle cx="23" cy="15" r="1.8" fill="#94691F" />
                    <rect x="11" y="21" width="2" height="12" rx="1" fill="rgba(255,255,255,0.22)" />
                  </svg>
                );
              case "challenges":
                return (
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                    <defs>
                      <radialGradient id="retos-core" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#FF758E" />
                        <stop offset="1" stopColor="#CC0D38" />
                      </radialGradient>
                      <linearGradient id="retos-arrow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#6DC7E8" />
                        <stop offset="1" stopColor="#378FC9" />
                      </linearGradient>
                    </defs>
                    <circle cx="21" cy="24" r="15" fill="#FFFFFF" stroke="#D71944" strokeWidth="2.3" />
                    <circle cx="21" cy="24" r="10.5" fill="none" stroke="#F04B68" strokeWidth="2.1" />
                    <circle cx="21" cy="24" r="5.8" fill="#FDE5EA" stroke="#CB113C" strokeWidth="1.7" />
                    <circle cx="21" cy="24" r="2.7" fill="url(#retos-core)" />
                    <line x1="24.5" y1="20.5" x2="35.5" y2="10.3" stroke="#763A28" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M33.3 8.8 L39.2 8.2 L38.7 14.1 Z" fill="url(#retos-arrow)" />
                    <path d="M19 24 L25 20 L22.7 24.1 L27.3 24.1 L21 27.6 Z" fill="#B90831" />
                  </svg>
                );
              case "redeem":
                return (
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                    <defs>
                      <linearGradient id="ticket-main" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#FF6E84" />
                        <stop offset="0.55" stopColor="#EB405D" />
                        <stop offset="1" stopColor="#C20D37" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="23" cy="32.5" rx="13" ry="3" fill="rgba(194,13,55,0.10)" />
                    <path
                      d="M8 16.5 Q8 14 10.5 14 H35.5 Q38 14 38 16.5 V20.3 Q34.2 21.4 34.2 23 Q34.2 24.6 38 25.7 V29.5 Q38 32 35.5 32 H10.5 Q8 32 8 29.5 V25.7 Q11.8 24.6 11.8 23 Q11.8 21.4 8 20.3 Z"
                      fill="url(#ticket-main)"
                    />
                    <line x1="20.5" y1="14.5" x2="20.5" y2="31.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" strokeDasharray="2 2.2" />
                    <path
                      d="M28.5 17.3 L30.1 20.8 L33.9 21.2 L31.1 23.8 L31.8 27.5 L28.5 25.7 L25.2 27.5 L25.9 23.8 L23.1 21.2 L26.9 20.8 Z"
                      fill="#FFE5A4"
                      stroke="#93651D"
                      strokeWidth="0.85"
                      strokeLinejoin="round"
                    />
                    <rect x="11" y="16.5" width="2" height="13" rx="1" fill="rgba(255,255,255,0.20)" />
                  </svg>
                );
              case "history":
                return (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <defs>
                      <linearGradient id="hist-sheet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#FCF8EE" />
                        <stop offset="1" stopColor="#E6DDCA" />
                      </linearGradient>
                    </defs>
                    <rect x="11" y="8.5" width="22" height="27" rx="3" fill="url(#hist-sheet)" stroke="#B29F77" strokeWidth="1" />
                    <rect x="17" y="6" width="10" height="5.2" rx="1.5" fill="#D7C39A" stroke="#A88B59" strokeWidth="0.8" />
                    <rect x="19" y="7.2" width="6" height="2.4" rx="0.6" fill="#8F7240" />
                    <circle cx="15.5" cy="17" r="1.2" fill="#8A6D3D" />
                    <line x1="18" y1="17" x2="28.5" y2="17" stroke="#A69776" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="15.5" cy="22" r="1.2" fill="#B39C70" />
                    <line x1="18" y1="22" x2="29.5" y2="22" stroke="#B7AA8D" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="15.5" cy="27" r="1.2" fill="#B39C70" />
                    <line x1="18" y1="27" x2="27.5" y2="27" stroke="#C1B79F" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                );
              default:
                return null;
            }
          }

          return (
            <div className="grid grid-cols-4 gap-[10px]">
              {tiles.map((tile) => {
                const isPrimary = tile.kind === "primary";
                const isActive = tile.kind === "active";
                const isValue = tile.kind === "value";
                const bg = isPrimary
                  ? "linear-gradient(165deg, rgba(255,239,243,0.98) 0%, rgba(255,250,248,0.96) 56%, rgba(249,247,235,0.94) 100%)"
                  : "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(250,248,242,0.92) 100%)";
                const borderColor = isPrimary
                  ? "rgba(221,5,62,0.18)"
                  : isActive
                    ? "rgba(221,5,62,0.12)"
                    : isValue
                      ? "rgba(197,163,100,0.18)"
                      : "rgba(9,18,1,0.08)";
                const shadow = isPrimary
                  ? "0 10px 24px rgba(221,5,62,0.12), inset 0 1px 0 rgba(255,255,255,0.8)"
                  : "0 8px 20px rgba(9,18,1,0.05), inset 0 1px 0 rgba(255,255,255,0.72)";
                const wrapperBackground = isPrimary
                  ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.96) 0%, rgba(255,223,229,0.80) 48%, rgba(255,204,215,0.45) 100%)"
                  : isActive
                    ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.96) 0%, rgba(255,231,235,0.70) 52%, rgba(255,213,220,0.28) 100%)"
                    : isValue
                      ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.96) 0%, rgba(255,234,237,0.66) 52%, rgba(255,215,220,0.24) 100%)"
                      : "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92) 0%, rgba(241,236,226,0.72) 52%, rgba(226,219,204,0.30) 100%)";
                const subtitleColor = isPrimary
                  ? "#DD053E"
                  : isValue
                    ? "#DD053E"
                    : "rgba(9,18,1,0.42)";

                return (
                  <button
                    key={tile.id}
                    onClick={tile.onClick}
                    className="relative flex min-h-[156px] flex-col items-center justify-start rounded-[24px] px-1.5 pt-5 pb-4 text-center active:scale-[0.97] transition-transform"
                    style={{
                      background: bg,
                      border: `1px solid ${borderColor}`,
                      boxShadow: shadow,
                    }}
                  >
                    {tile.chip && (
                      <div
                        className="absolute top-2 right-2 rounded-full px-1.5 py-[3px]"
                        style={{
                          background: "linear-gradient(135deg, #CB0723 0%, #DD053E 100%)",
                          boxShadow: "0 3px 7px rgba(221,5,62,0.24)",
                        }}
                      >
                        <span style={{ fontSize: 8.5, fontWeight: 700, color: "#FFFFFF", letterSpacing: 0.2 }}>
                          {tile.chip}
                        </span>
                      </div>
                    )}

                    <div className="relative mb-3" style={{ width: 62, height: 62 }}>
                      {isPrimary && (
                        <div
                          className="absolute rounded-full"
                          style={{
                            inset: -6,
                            background: "radial-gradient(circle, rgba(255,120,150,0.22) 0%, transparent 72%)",
                            filter: "blur(1.5px)",
                          }}
                        />
                      )}
                      <div
                        className="relative flex h-full w-full items-center justify-center rounded-full"
                        style={{
                          background: wrapperBackground,
                          boxShadow: isPrimary
                            ? "inset 0 0 0 1px rgba(221,5,62,0.10), 0 12px 28px rgba(221,5,62,0.10)"
                            : isValue
                              ? "inset 0 0 0 1px rgba(221,5,62,0.08), 0 8px 20px rgba(221,5,62,0.06)"
                              : "inset 0 0 0 1px rgba(9,18,1,0.06)",
                        }}
                      >
                        {renderArtwork(tile.id)}
                      </div>
                    </div>

                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#091201", lineHeight: 1.1 }}>
                      {tile.title}
                    </span>

                    {"pill" in tile ? (
                      <div
                        className="mt-2 rounded-full px-2 py-[4px]"
                        style={{
                          background: "rgba(221,5,62,0.10)",
                          border: "1px solid rgba(221,5,62,0.14)",
                        }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#DD053E", lineHeight: 1 }}>
                          {tile.pill}
                        </span>
                      </div>
                    ) : (
                      <span
                        style={{
                          marginTop: 6,
                          fontSize: 9.2,
                          fontWeight: tile.kind === "neutral" ? 500 : 600,
                          color: subtitleColor,
                          lineHeight: 1.08,
                          whiteSpace: "nowrap",
                          letterSpacing: -0.1,
                        }}
                      >
                        {tile.subtitle}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Insignias */}
      <div className="px-5 mb-5">
        <SectionHeader title="Insignias" action="Ver todas" onAction={() => navigate("/points/badges")} />
        {(() => {
          const badges = [
            { id: "checkin", name: "Primer check-in", statusText: "Completada", state: "unlocked", glyph: "pin", isNew: true },
            { id: "racha7", name: "Racha de 7 días", statusText: "5/7", state: "progress", glyph: "flame", progress: 71, tone: "wine" },
            { id: "active", name: "Participante activo", statusText: "Completada", state: "unlocked", glyph: "bolt" },
            { id: "explor", name: "Explorador cultural", statusText: "2/5", state: "progress", glyph: "museum", progress: 40, tone: "gold" },
            { id: "route", name: "Ruta completada", statusText: "0/3", state: "locked", glyph: "route" },
            { id: "benefactor", name: "Beneficiario estrella", statusText: "0/10", state: "locked", glyph: "star" },
          ] as const;

          type BadgeConfig = typeof badges[number];
          const emblemSize = 56;
          const hexPath = "M28 3 L49 15 L49 41 L28 53 L7 41 L7 15 Z";
          const hexPerimeter = 6 * 24.4;

          function renderGlyph(badge: BadgeConfig) {
            const baseColor =
              badge.state === "locked"
                ? "rgba(9,18,1,0.28)"
                : badge.state === "progress" && badge.tone === "wine"
                  ? "#FFF7F8"
                  : badge.state === "progress"
                    ? "#7D4A14"
                    : "#6B4B18";

            switch (badge.glyph) {
              case "pin":
                return <MapPin size={20} strokeWidth={2} style={{ color: baseColor } as CSSProperties} />;
              case "flame":
                return <Flame size={20} strokeWidth={2} style={{ color: baseColor } as CSSProperties} />;
              case "museum":
                return <Landmark size={20} strokeWidth={1.9} style={{ color: baseColor } as CSSProperties} />;
              case "route":
                return <Route size={20} strokeWidth={1.9} style={{ color: baseColor } as CSSProperties} />;
              case "star":
                return <Star size={20} strokeWidth={1.9} style={{ color: baseColor } as CSSProperties} />;
              case "bolt":
                return (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 2.5 L6 13 H11 L10.2 21.2 L18 10.8 H13.4 Z"
                      fill={badge.state === "locked" ? "rgba(9,18,1,0.28)" : "#6B4B18"}
                      stroke={badge.state === "locked" ? "rgba(9,18,1,0.15)" : "#C5A364"}
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                );
              default:
                return null;
            }
          }

          function Emblem({ badge }: { badge: BadgeConfig }) {
            const gradientId = `${badge.id}-fill`;
            const progressId = `${badge.id}-progress`;
            const isUnlocked = badge.state === "unlocked";
            const isProgress = badge.state === "progress";
            const isLocked = badge.state === "locked";

            const fillTop = isUnlocked
              ? "#F2D991"
              : isProgress && badge.tone === "wine"
                ? "#DD204E"
                : isProgress
                  ? "#F8ECD7"
                  : "#ECE6DB";

            const fillBottom = isUnlocked
              ? "#B8873B"
              : isProgress && badge.tone === "wine"
                ? "#7B0227"
                : isProgress
                  ? "#D9B06A"
                  : "#C5BCAC";

            const borderColor = isUnlocked
              ? "#8A6428"
              : isProgress && badge.tone === "wine"
                ? "#B60C35"
                : isProgress
                  ? "#B68A44"
                  : "rgba(9,18,1,0.15)";

            const progressColor = badge.tone === "wine" ? "#F6D6DE" : "#DD053E";
            const progressDash = isProgress ? ((badge.progress ?? 0) / 100) * hexPerimeter : 0;

            return (
              <div className="relative" style={{ width: emblemSize, height: emblemSize, opacity: isLocked ? 0.82 : 1 }}>
                {(isUnlocked || isProgress) && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: -4,
                      background: isProgress && badge.tone === "wine"
                        ? "radial-gradient(circle, rgba(221,5,62,0.18) 0%, transparent 72%)"
                        : "radial-gradient(circle, rgba(197,163,100,0.22) 0%, transparent 72%)",
                      filter: "blur(2px)",
                    }}
                  />
                )}

                <svg width={emblemSize} height={emblemSize} viewBox="0 0 56 56" className="relative">
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor={fillTop} />
                      <stop offset="1" stopColor={fillBottom} />
                    </linearGradient>
                    <linearGradient id={progressId} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor={progressColor} />
                      <stop offset="1" stopColor={badge.tone === "wine" ? "#FFD9E1" : "#F0C36A"} />
                    </linearGradient>
                  </defs>

                  <path
                    d={hexPath}
                    fill={`url(#${gradientId})`}
                    stroke={borderColor}
                    strokeWidth="1.35"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M28 7 L45 17 L45 27 L28 18 L11 27 L11 17 Z"
                    fill="rgba(255,255,255,0.22)"
                  />

                  <path
                    d="M28 11 L41 18.5 L41 37.5 L28 45 L15 37.5 L15 18.5 Z"
                    fill={isLocked ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)"}
                  />

                  {isProgress && (
                    <path
                      d={hexPath}
                      fill="none"
                      stroke={`url(#${progressId})`}
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeDasharray={`${progressDash} ${hexPerimeter}`}
                    />
                  )}
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  {renderGlyph(badge)}
                </div>

                {badge.isNew && (
                  <div
                    className="absolute rounded-full px-1.5 py-[2px]"
                    style={{
                      top: -4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #CB0723 0%, #DD053E 100%)",
                      boxShadow: "0 3px 8px rgba(221,5,62,0.22)",
                    }}
                  >
                    <span style={{ fontSize: 7, fontWeight: 800, color: "#FFFFFF", letterSpacing: 0.25 }}>
                      Nueva
                    </span>
                  </div>
                )}

                {isLocked && (
                  <div
                    className="absolute flex h-[15px] w-[15px] items-center justify-center rounded-full"
                    style={{
                      right: -1,
                      bottom: -1,
                      background: "rgba(249,247,235,0.95)",
                      border: "1px solid rgba(9,18,1,0.14)",
                    }}
                  >
                    <Lock size={8} strokeWidth={2.4} style={{ color: "rgba(9,18,1,0.38)" } as CSSProperties} />
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="grid grid-cols-6 gap-1 pt-1">
              {badges.map((badge) => (
                <div key={badge.id} className="flex min-w-0 flex-col items-center">
                  <Emblem badge={badge} />
                  <span
                    className="text-center"
                    style={{
                      marginTop: 7,
                      fontSize: 8.8,
                      fontWeight: 600,
                      lineHeight: 1.18,
                      color: badge.state === "locked" ? "rgba(9,18,1,0.58)" : "#091201",
                      minHeight: 22,
                    }}
                  >
                    {badge.name}
                  </span>
                  <span
                    style={{
                      marginTop: 2,
                      fontSize: 8.6,
                      fontWeight: 700,
                      lineHeight: 1,
                      color: badge.state === "unlocked" ? "#8A6428" : badge.state === "progress" ? "#DD053E" : "rgba(9,18,1,0.42)",
                    }}
                  >
                    {badge.statusText}
                  </span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Active challenges */}
      <div className="px-5 mb-5">
        <SectionHeader title="Retos activos" action="Ver todos" onAction={() => navigate("/points/challenges")} />
        <div className="space-y-3">
          {g.challenges.filter(c => c.category === "hoy").slice(0, 2).map(c => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </div>

      {/* Recent history */}
      <div className="px-5">
        <SectionHeader title="Movimientos recientes" action="Ver todo" onAction={() => navigate("/points/history")} />
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] px-4 py-2">
          {g.history.slice(0, 4).map(h => (
            <HistoryItem key={h.id} entry={h} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   2. RECLAMO DIARIO
   ════════════════════════════════════════ */
/* Reward Spotlight — concentric rings, halo, premium emblem */
function RewardSpotlight({ claimed, points }: { claimed: boolean; points: number }) {
  return (
    <div className="relative mx-auto" style={{ width: 168, height: 168 }}>
      {/* Radial halo */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(197,163,100,0.35) 0%, rgba(197,163,100,0.08) 45%, transparent 70%)",
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 12,
          border: "1px solid rgba(197,163,100,0.4)",
        }}
        animate={claimed ? {} : { scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 28,
          border: "1.5px dashed rgba(197,163,100,0.5)",
        }}
        animate={claimed ? {} : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* Emblem core */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: 44,
          background: claimed
            ? "linear-gradient(135deg, #C5A364 0%, #DBC8A7 100%)"
            : "linear-gradient(135deg, #C5A364 0%, #DBC8A7 100%)",
          boxShadow:
            "0 10px 30px rgba(197,163,100,0.4), inset 0 2px 8px rgba(255,255,255,0.35)",
        }}
        animate={claimed ? { scale: 1 } : { scale: [1, 1.03, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {claimed ? (
          <CheckCircle2 size={44} className="text-white" strokeWidth={2.2} />
        ) : (
          <Star size={44} className="text-white" strokeWidth={1.8} fill="white" />
        )}
      </motion.div>
      {/* Discreet sparkle accents */}
      {!claimed && (
        <>
          <motion.div
            className="absolute"
            style={{ top: 18, right: 32 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
          >
            <Sparkles size={12} className="text-[#C5A364]" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ bottom: 28, left: 22 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
          >
            <Sparkles size={10} className="text-[#C5A364]" />
          </motion.div>
        </>
      )}
    </div>
  );
}

export function DailyClaimPage() {
  const navigate = useNavigate();
  const g = useGamification();
  const [justClaimed, setJustClaimed] = useState(false);
  const todayReward = g.dailyRewards.find(d => d.today);
  const todayPts = todayReward?.points || 10;
  const tomorrowReward = g.dailyRewards.find(d => !d.claimed && !d.today);
  const day7 = g.dailyRewards[g.dailyRewards.length - 1];
  const isClaimed = g.dailyClaimed || justClaimed;

  const handleClaim = () => {
    if (g.dailyClaimed) return;
    g.claimDaily();
    setJustClaimed(true);
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Reclamo diario" onBack={() => navigate(-1 as any)} />

      <div className="px-5">
        {/* Reward Spotlight (central block) */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/50 shadow-[0_4px_24px_rgba(9,18,1,0.08)] mb-5"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(249,247,235,0.9) 50%, rgba(219,200,167,0.35) 100%)",
          }}
        >
          <div className="relative px-5 pt-6 pb-5 text-center">
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(9,18,1,0.45)", letterSpacing: 0.6 }}>
              {isClaimed ? "RECLAMADO HOY" : "RECOMPENSA DE HOY"}
            </p>

            <div className="my-3">
              <RewardSpotlight claimed={isClaimed} points={todayPts} />
            </div>

            <AnimatePresence mode="wait">
              {!isClaimed ? (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-end justify-center gap-1">
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#C5A364", lineHeight: 1, marginBottom: 8 }}>+</span>
                    <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, color: "#091201", letterSpacing: -1 }}>
                      {todayPts}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(9,18,1,0.5)", marginBottom: 10 }}>pts</span>
                  </div>
                  <p className="mt-1" style={{ fontSize: 13, color: "rgba(9,18,1,0.5)" }}>
                    Tu recompensa por volver hoy
                  </p>

                  <motion.button
                    onClick={handleClaim}
                    className="mt-5 w-full py-3.5 rounded-2xl text-white active:scale-[0.98] transition-transform"
                    style={{
                      background: "linear-gradient(135deg, #C5A364 0%, #DBC8A7 100%)",
                      boxShadow: "0 8px 22px rgba(197,163,100,0.35)",
                      fontSize: 16, fontWeight: 600, letterSpacing: 0.2,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reclamar puntos
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="claimed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-end justify-center gap-1">
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#C5A364", lineHeight: 1, marginBottom: 6 }}>+</span>
                    <CountUp
                      value={todayPts}
                      duration={1.1}
                      style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, color: "#091201", letterSpacing: -0.8 }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(9,18,1,0.5)", marginBottom: 8 }}>pts</span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1"
                    style={{ fontSize: 13, color: "#C5A364", fontWeight: 600 }}
                  >
                    ¡Sumado a tu saldo!
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5 w-full py-3.5 rounded-2xl flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(197,163,100,0.14)",
                      border: "1px solid rgba(197,163,100,0.3)",
                      fontSize: 15, fontWeight: 600, color: "#C5A364",
                    }}
                  >
                    <CheckCircle2 size={18} strokeWidth={2.4} />
                    Reclamado
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Context row — saldo + mañana */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_10px_rgba(9,18,1,0.04)] p-3">
            <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(9,18,1,0.45)", letterSpacing: 0.5 }}>
              SALDO ACTUAL
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Star size={14} className="text-[#C5A364]" strokeWidth={2.2} fill="#C5A364" />
              <CountUp
                value={g.balance}
                style={{ fontSize: 20, fontWeight: 700, color: "#091201", lineHeight: 1 }}
              />
              <span style={{ fontSize: 11, color: "rgba(9,18,1,0.4)", marginBottom: 1 }}>pts</span>
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_10px_rgba(9,18,1,0.04)] p-3">
            <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(9,18,1,0.45)", letterSpacing: 0.5 }}>
              {tomorrowReward ? "MAÑANA" : "COMPLETASTE LA SEMANA"}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Gift size={14} className="text-[#59021D]" strokeWidth={2.2} />
              <span style={{ fontSize: 20, fontWeight: 700, color: "#091201", lineHeight: 1 }}>
                +{tomorrowReward?.points ?? day7.points}
              </span>
              <span style={{ fontSize: 11, color: "rgba(9,18,1,0.4)", marginBottom: 1 }}>pts</span>
            </div>
          </div>
        </div>

        {/* Streak calendar */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(9,18,1,0.45)", letterSpacing: 0.5 }}>
                RACHA SEMANAL
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Flame size={18} className="text-[#59021D]" strokeWidth={2.2} />
                <span style={{ fontSize: 18, fontWeight: 700, color: "#091201" }}>
                  {g.streak} días
                </span>
              </div>
            </div>
            <div
              className="px-2.5 py-1.5 rounded-xl text-right"
              style={{ background: "rgba(197,163,100,0.14)" }}
            >
              <p style={{ fontSize: 9, fontWeight: 600, color: "#C5A364", letterSpacing: 0.4 }}>
                BONUS DÍA 7
              </p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#C5A364", lineHeight: 1 }}>
                +{day7.points} pts
              </p>
            </div>
          </div>
          <StreakCalendar dailyRewards={g.dailyRewards} />
          {!isClaimed ? (
            <p className="text-center mt-4" style={{ fontSize: 11, color: "rgba(9,18,1,0.45)" }}>
              Reclama hoy para seguir tu racha
            </p>
          ) : (
            <p className="text-center mt-4" style={{ fontSize: 11, color: "rgba(9,18,1,0.45)" }}>
              Vuelve mañana para tu próxima recompensa
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   3. RETOS
   ════════════════════════════════════════ */
const retosTabs = ["Hoy", "Semana", "Especiales", "Logros"] as const;
const retosTabMap: Record<string, string> = { "Hoy": "hoy", "Semana": "semana", "Especiales": "especiales", "Logros": "logros" };

export function RetosPage() {
  const navigate = useNavigate();
  const g = useGamification();
  const [tab, setTab] = useState<string>("Hoy");
  const filtered = g.challenges.filter(c => c.category === retosTabMap[tab]);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Retos" onBack={() => navigate(-1 as any)} />

      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-none">
        {retosTabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              tab === t
                ? "bg-[#091201] text-white"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        {filtered.map(c => (
          <ChallengeCard key={c.id} challenge={c} onAction={() => {
            if (c.cta === "Ir a check-in") navigate("/checkin");
            else if (c.cta === "Explorar" || c.cta === "Explorar eventos" || c.cta === "Ver actividades") navigate("/explore");
            else if (c.cta === "Ver beneficios") navigate("/benefits");
            else if (c.cta === "Reclamar") navigate("/points/claim");
          }} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ fontSize: 14, color: "rgba(9,18,1,0.35)" }}>No hay retos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   4. CHECK-IN
   ════════════════════════════════════════ */
const checkInEvents = [
  { id: 1, name: "Festival Joven 2026", date: "15 May 2026, 16:00", location: "Parque Bicentenario, Victoria", points: 25 },
  { id: 2, name: "Taller de Programación Web", date: "20 May 2026, 10:00", location: "En línea (Zoom)", points: 20 },
  { id: 3, name: "Feria de Empleo Joven", date: "25 May 2026, 09:00", location: "Centro de Convenciones, Tampico", points: 25 },
];

export function CheckInPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Check-in" onBack={() => navigate(-1 as any)} />

      {/* QR Scanner area */}
      <div className="px-5 mb-6">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#091201]/5 mx-auto flex items-center justify-center mb-3">
            <QrCode size={32} className="text-[#091201]/40" />
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#091201" }}>Escanear código QR</p>
          <p className="mt-1" style={{ fontSize: 12, color: "rgba(9,18,1,0.4)" }}>
            Escanea el código QR del evento para registrar tu asistencia
          </p>
          <button
            className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
            style={{ fontSize: 14, fontWeight: 500 }}
          >
            Abrir escáner
          </button>
        </div>
      </div>

      {/* Available events */}
      <div className="px-5">
        <h3 className="mb-3" style={{ fontSize: 16, fontWeight: 600, color: "#091201" }}>Eventos disponibles</h3>
        <div className="space-y-3">
          {checkInEvents.map(ev => (
            <div
              key={ev.id}
              onClick={() => navigate("/checkin/success", { state: { event: ev } })}
              className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-4 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#091201" }}>{ev.name}</p>
                  <div className="flex items-center gap-1.5 mt-1" style={{ fontSize: 12, color: "rgba(9,18,1,0.4)" }}>
                    <Clock size={12} /> {ev.date}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5" style={{ fontSize: 12, color: "rgba(9,18,1,0.4)" }}>
                    <MapPin size={12} /> {ev.location}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <PointsBadge amount={ev.points} />
                  <button
                    className="px-3 py-1.5 rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #CB0723, #DD053E)", fontSize: 11, fontWeight: 500 }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   5. CHECK-IN EXITOSO
   ════════════════════════════════════════ */
export function CheckInSuccessPage() {
  const navigate = useNavigate();
  const g = useGamification();
  const [done, setDone] = useState(false);

  const eventName = "Festival Joven 2026";
  const eventPoints = 25;

  useEffect(() => {
    if (!done) {
      g.completeCheckIn(eventName, eventPoints);
      setDone(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center"
      >
        <motion.div
          className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-5"
          style={{ background: "rgba(197,163,100,0.12)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 12 }}
        >
          <CheckCircle2 size={48} className="text-[#C5A364]" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 24, fontWeight: 700, color: "#091201" }}
        >
          Check-in exitoso
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-2"
          style={{ fontSize: 14, color: "rgba(9,18,1,0.5)" }}
        >
          {eventName}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl"
          style={{ background: "rgba(197,163,100,0.12)" }}
        >
          <Star size={20} className="text-[#C5A364]" />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#C5A364" }}>+{eventPoints} pts</span>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-3"
          style={{ fontSize: 13, color: "rgba(9,18,1,0.4)" }}
        >
          Nuevo saldo: {g.balance.toLocaleString()} puntos
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col gap-3 w-full"
        >
          <button
            onClick={() => navigate("/points/challenges")}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A364] to-[#DBC8A7] text-white shadow-lg shadow-[#C5A364]/20 active:scale-[0.98] transition-transform"
            style={{ fontSize: 15, fontWeight: 500 }}
          >
            Ver mis retos
          </button>
          <button
            onClick={() => navigate("/explore")}
            className="w-full py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70 active:scale-[0.98] transition-transform"
            style={{ fontSize: 15, fontWeight: 500 }}
          >
            Seguir explorando
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════
   6. CANJE DE PUNTOS
   ════════════════════════════════════════ */
const rewardCategories = ["Todo", "Entretenimiento", "Eventos", "Educación", "Deporte", "Comida", "Cultura"];

export function CanjePage() {
  const navigate = useNavigate();
  const g = useGamification();
  const [cat, setCat] = useState("Todo");
  const filtered = cat === "Todo" ? g.rewards : g.rewards.filter(r => r.category === cat);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader
        title="Canjear puntos"
        onBack={() => navigate(-1 as any)}
        right={
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "rgba(197,163,100,0.12)" }}>
            <Star size={13} className="text-[#C5A364]" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#C5A364" }}>{g.balance.toLocaleString()}</span>
          </div>
        }
      />

      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-none">
        {rewardCategories.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              cat === c
                ? "bg-[#59021D] text-white"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map(r => (
          <RewardCard key={r.id} reward={r} onClick={() => navigate(`/points/redeem/${r.id}`)} />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   7. DETALLE DE RECOMPENSA
   ════════════════════════════════════════ */
export function RewardDetailPage() {
  const navigate = useNavigate();
  const g = useGamification();
  const id = parseInt(window.location.pathname.split("/").pop() || "1");
  const reward = g.rewards.find(r => r.id === id) || g.rewards[0];
  const [redeemed, setRedeemed] = useState(false);
  const canAfford = g.balance >= reward.cost;

  const handleRedeem = () => {
    if (!canAfford || redeemed) return;
    const success = g.spendPoints(reward.cost, `Canje: ${reward.name}`);
    if (success) setRedeemed(true);
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-40">
      <div className="relative h-48">
        <img src={reward.img} alt={reward.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => navigate(-1 as any)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-[#091201]" style={{ fontSize: 20 }}>&#8592;</span>
        </button>
      </div>

      <div className="px-5 -mt-5 relative">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-5">
          <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(9,18,1,0.4)" }}>{reward.brand}</p>
          <h1 className="mt-1" style={{ fontSize: 20, fontWeight: 600, color: "#091201" }}>{reward.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: "rgba(89,2,29,0.08)", fontSize: 14, fontWeight: 600, color: "#59021D" }}>
              <Star size={14} /> {reward.cost} pts
            </span>
            <span style={{ fontSize: 12, color: canAfford ? "rgba(9,18,1,0.4)" : "#DD053E" }}>
              {canAfford ? `Disponible (tienes ${g.balance.toLocaleString()})` : `Necesitas ${(reward.cost - g.balance).toLocaleString()} pts más`}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 className="mb-2" style={{ fontSize: 16, fontWeight: 600, color: "#091201" }}>Descripción</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(9,18,1,0.6)" }}>{reward.desc}</p>
      </div>

      <div className="px-5 mt-5">
        <h3 className="mb-2" style={{ fontSize: 16, fontWeight: 600, color: "#091201" }}>Condiciones</h3>
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-4">
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(9,18,1,0.5)" }}>{reward.conditions}</p>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center gap-2" style={{ fontSize: 12, color: "rgba(9,18,1,0.35)" }}>
          <Clock size={14} />
          <span>Vigente hasta {reward.expiry}</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 pb-24 bg-gradient-to-t from-[#F9F7EB] to-transparent">
        <AnimatePresence mode="wait">
          {!redeemed ? (
            <motion.button
              key="redeem"
              onClick={handleRedeem}
              disabled={!canAfford}
              className={`w-full py-4 rounded-2xl text-white shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform ${
                canAfford
                  ? "bg-gradient-to-r from-[#59021D] to-[#3D0114] shadow-[#59021D]/20"
                  : "bg-[#DBC8A7] shadow-none"
              }`}
              style={{ fontSize: 16, fontWeight: 500 }}
            >
              <Star size={18} /> Canjear por {reward.cost} puntos
            </motion.button>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-4 rounded-2xl bg-[#C5A364]/10 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} className="text-[#C5A364]" />
              <span style={{ fontSize: 16, fontWeight: 600, color: "#C5A364" }}>Canjeado con éxito</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   8. HISTORIAL DE PUNTOS
   ════════════════════════════════════════ */
export function HistorialPage() {
  const navigate = useNavigate();
  const g = useGamification();
  const [filter, setFilter] = useState<"all" | "earn" | "spend">("all");
  const filtered = filter === "all" ? g.history : g.history.filter(h => h.type === filter);

  const totalEarned = g.history.filter(h => h.type === "earn").reduce((s, h) => s + h.amount, 0);
  const totalSpent = g.history.filter(h => h.type === "spend").reduce((s, h) => s + h.amount, 0);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Historial" onBack={() => navigate(-1 as any)} />

      {/* Summary */}
      <div className="px-5 mb-5">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-4">
          <div className="flex justify-around text-center">
            <div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#091201" }}>{g.balance.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Saldo actual</p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#C5A364" }}>+{totalEarned}</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Ganados</p>
            </div>
            <div className="w-px bg-[#091201]/10" />
            <div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#59021D" }}>-{totalSpent}</p>
              <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>Canjeados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-5 mb-4">
        {([["all", "Todo"], ["earn", "Ganados"], ["spend", "Canjeados"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === key
                ? "bg-[#091201] text-white"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-5">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] px-4 py-2">
          {filtered.map(h => (
            <HistoryItem key={h.id} entry={h} />
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center">
              <p style={{ fontSize: 14, color: "rgba(9,18,1,0.35)" }}>Sin movimientos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BadgesPage() {
  const navigate = useNavigate();

  const insignias = [
    { id: "checkin", name: "Primer check-in", desc: "Realizaste tu primer check-in", status: "unlocked", progress: null, isNew: true, symbol: "pin" },
    { id: "racha7",  name: "Racha de 7 días", desc: "Mantén una racha de 7 días consecutivos", status: "progress", progress: { cur: 5, max: 7 }, symbol: "flame" },
    { id: "active",  name: "Participante activo", desc: "Participa en 10 actividades", status: "unlocked", progress: null, symbol: "bolt" },
    { id: "explor",  name: "Explorador cultural", desc: "Visita 5 espacios culturales diferentes", status: "progress", progress: { cur: 2, max: 5 }, symbol: "museum" },
    { id: "ruta",    name: "Ruta completada", desc: "Completa 3 rutas culturales", status: "locked", progress: { cur: 0, max: 3 }, symbol: "route" },
    { id: "estrella",name: "Beneficiario estrella", desc: "Usa 10 beneficios diferentes", status: "locked", progress: { cur: 0, max: 10 }, symbol: "star" },
    { id: "social",  name: "Embajador social", desc: "Comparte 5 experiencias", status: "locked", progress: { cur: 0, max: 5 }, symbol: "share" },
    { id: "early",   name: "Madrugador", desc: "Realiza check-in antes de las 9 AM", status: "locked", progress: { cur: 0, max: 1 }, symbol: "sun" },
  ] as const;

  const Hex = ({ children, fillA, fillB, borderColor, glow, opacity = 1, progressPct }: {
    children: React.ReactNode;
    fillA: string; fillB: string; borderColor: string; glow?: string; opacity?: number;
    progressPct?: number;
  }) => {
    const size = 72;
    return (
      <div className="relative" style={{ width: size, height: size, opacity }}>
        {glow && (
          <div className="absolute pointer-events-none" style={{ inset: -6, background: glow, filter: "blur(3px)" }} />
        )}
        <svg width={size} height={size} viewBox="0 0 60 60" style={{ position: "relative" }}>
          <defs>
            <linearGradient id={`hg-${fillA}-${fillB}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={fillA} />
              <stop offset="1" stopColor={fillB} />
            </linearGradient>
          </defs>
          <path
            d="M30 3 L53 16 L53 44 L30 57 L7 44 L7 16 Z"
            fill={`url(#hg-${fillA}-${fillB})`}
            stroke={borderColor}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M30 7 L49 18 L49 30 L30 19 L11 30 L11 18 Z"
            fill="rgba(255,255,255,0.22)"
          />
          {progressPct != null && (() => {
            const perim = 6 * 26.9;
            const dash = (progressPct / 100) * perim;
            return (
              <path
                d="M30 3 L53 16 L53 44 L30 57 L7 44 L7 16 Z"
                fill="none"
                stroke="#DD053E"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${perim}`}
              />
            );
          })()}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  const renderSymbol = (sym: string, tone: "gold" | "red" | "muted") => {
    const c = tone === "gold" ? "#6B4B18" : tone === "red" ? "#8A0520" : "#6E6A5C";
    const accent = tone === "gold" ? "#E8C880" : tone === "red" ? "#DD053E" : "#B8B2A0";
    switch (sym) {
      case "pin":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 C7.6 2 4 5.6 4 10 C4 16 12 22 12 22 C12 22 20 16 20 10 C20 5.6 16.4 2 12 2 Z" fill={c} />
            <circle cx="12" cy="10" r="3" fill={accent} />
          </svg>
        );
      case "flame":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 C12 6 7 8 7 13 C7 17 9.5 20 12 20 C14.5 20 17 17 17 13 C17 10 15 9 14 6 C13 8 12 7 12 3 Z" fill={c} />
            <path d="M12 9 C12 11 10 12 10 14 C10 16 11 17 12 17 C13 17 14 16 14 14 C14 12.5 13 12 12.5 11 C12.3 11.5 12 11 12 9 Z" fill={accent} />
          </svg>
        );
      case "bolt":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M13 2 L5 13 L11 13 L10 22 L19 10 L13 10 Z" fill={c} stroke={accent} strokeWidth="0.8" strokeLinejoin="round" />
          </svg>
        );
      case "museum":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 9 L12 3 L21 9 L21 11 L3 11 Z M5 11 L5 19 M9 11 L9 19 M12 11 L12 19 M15 11 L15 19 M19 11 L19 19 M3 19 L21 19 L21 21 L3 21 Z" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="6" r="1.2" fill={accent} />
          </svg>
        );
      case "route":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M4 6 L4 8 C4 9 4.5 10 6 10 L18 10 C19.5 10 20 11 20 12 L20 14 M20 18 L20 16" stroke={c} strokeWidth="2" strokeLinecap="round" />
            <circle cx="4" cy="4" r="2.5" fill={accent} />
            <circle cx="20" cy="20" r="2.5" fill={accent} />
          </svg>
        );
      case "star":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L15 9 L22 10 L17 15 L18.5 22 L12 18 L5.5 22 L7 15 L2 10 L9 9 Z" fill={c} stroke={accent} strokeWidth="0.6" />
          </svg>
        );
      case "share":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" fill={c} />
            <circle cx="6" cy="12" r="3" fill={c} />
            <circle cx="18" cy="19" r="3" fill={c} />
            <path d="M8.5 13.5 L15.5 17.5 M8.5 10.5 L15.5 6.5" stroke={accent} strokeWidth="1.8" />
          </svg>
        );
      case "sun":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill={c} />
            <path d="M12 2 L12 6 M12 18 L12 22 M22 12 L18 12 M6 12 L2 12 M19 19 L16.5 16.5 M7.5 7.5 L5 5 M19 5 L16.5 7.5 M7.5 16.5 L5 19" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      default:
        return <div style={{ width: 32, height: 32 }} />;
    }
  };

  const unlocked = insignias.filter(b => b.status === "unlocked");
  const inProgress = insignias.filter(b => b.status === "progress");
  const locked = insignias.filter(b => b.status === "locked");

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <SubPageHeader title="Insignias" onBack={() => navigate(-1 as any)} />

      <div className="px-5 space-y-6">
        {/* Unlocked Badges */}
        {unlocked.length > 0 && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#091201", marginBottom: 12 }}>
              Desbloqueadas ({unlocked.length})
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {unlocked.map(badge => (
                <div key={badge.id} className="flex flex-col items-center">
                  <Hex
                    fillA="#E8C880"
                    fillB="#B08840"
                    borderColor="#6B4B18"
                    glow="radial-gradient(circle, rgba(232,200,128,0.4) 0%, transparent 70%)"
                  >
                    {renderSymbol(badge.symbol, "gold")}
                  </Hex>
                  <div className="mt-2 text-center">
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#091201", lineHeight: 1.2 }}>
                      {badge.name}
                    </p>
                    {badge.isNew && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#DD053E" }}>
                        ¡Nuevo!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Badges */}
        {inProgress.length > 0 && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#091201", marginBottom: 12 }}>
              En progreso ({inProgress.length})
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {inProgress.map(badge => {
                const pct = badge.progress ? (badge.progress.cur / badge.progress.max) * 100 : 0;
                return (
                  <div key={badge.id} className="flex flex-col items-center">
                    <Hex
                      fillA="#FDECE8"
                      fillB="#F8D8D0"
                      borderColor="#DD053E"
                      progressPct={pct}
                    >
                      {renderSymbol(badge.symbol, "red")}
                    </Hex>
                    <div className="mt-2 text-center">
                      <p style={{ fontSize: 11, fontWeight: 600, color: "#091201", lineHeight: 1.2 }}>
                        {badge.name}
                      </p>
                      {badge.progress && (
                        <p style={{ fontSize: 9, fontWeight: 500, color: "rgba(9,18,1,0.5)" }}>
                          {badge.progress.cur}/{badge.progress.max}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {locked.length > 0 && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#091201", marginBottom: 12 }}>
              Bloqueadas ({locked.length})
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {locked.map(badge => (
                <div key={badge.id} className="flex flex-col items-center">
                  <Hex
                    fillA="#E8E4D8"
                    fillB="#D0CBC0"
                    borderColor="#9A9488"
                    opacity={0.6}
                  >
                    {renderSymbol(badge.symbol, "muted")}
                  </Hex>
                  <div className="mt-2 text-center">
                    <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(9,18,1,0.5)", lineHeight: 1.2 }}>
                      {badge.name}
                    </p>
                    {badge.progress && (
                      <p style={{ fontSize: 9, fontWeight: 500, color: "rgba(9,18,1,0.35)" }}>
                        {badge.progress.cur}/{badge.progress.max}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
