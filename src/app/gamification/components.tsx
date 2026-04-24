import { type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Flame, Star, ChevronRight, CheckCircle2, Lock,
  MapPin, Zap, Compass, Route, Sparkles, Award,
  Gift, Target, Ticket, ClipboardList,
  type LucideIcon,
} from "lucide-react";
import type { Challenge, Reward, PointsHistoryEntry, Badge, DailyReward } from "./state";

/* ── Colors ── */
const EARN_COLOR = "#C5A364";
const EARN_SOFT = "#DBC8A7";
const SPEND_COLOR = "#59021D";
const ENERGY = "#DD053E";
const INK = "#091201";

/* ── Badge → lucide icon map (premium, no emoji) ── */
const badgeIconMap: Record<string, LucideIcon> = {
  "first-checkin": MapPin,
  "streak-7": Flame,
  "active": Zap,
  "explorer": Compass,
  "route": Route,
  "benefactor": Sparkles,
};
function iconForBadge(id: string): LucideIcon {
  return badgeIconMap[id] || Award;
}

/* ── Challenge → lucide icon map (tonal circle container) ── */
const challengeIconMap: Record<number, LucideIcon> = {
  1: MapPin, 2: Star, 3: Gift, 4: Ticket, 5: Sparkles,
  6: Zap, 7: Award, 8: Target, 9: MapPin, 10: Flame,
};
function iconForChallenge(id: number): LucideIcon {
  return challengeIconMap[id] || Target;
}

/* ── Points Badge (small chip) ── */
export function PointsBadge({ amount, type = "earn", size = "sm" }: {
  amount: number; type?: "earn" | "spend"; size?: "sm" | "md";
}) {
  const isEarn = type === "earn";
  const bg = isEarn ? "rgba(197,163,100,0.14)" : "rgba(89,2,29,0.1)";
  const color = isEarn ? EARN_COLOR : SPEND_COLOR;
  const fs = size === "sm" ? 10 : 12;
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: bg, fontSize: fs, fontWeight: 600, color }}>
      <Star size={fs - 1} />
      {isEarn ? "+" : ""}{amount} pts
    </span>
  );
}

/* ── Streak Badge ── */
export function StreakBadge({ streak, compact = false }: { streak: number; compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(221,5,62,0.08)", fontSize: 10, fontWeight: 600, color: ENERGY }}>
        <Flame size={10} /> {streak}
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(221,5,62,0.1)" }}>
        <Flame size={14} className="text-[#DD053E]" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: INK }}>{streak} días</p>
        <p style={{ fontSize: 10, color: "rgba(9,18,1,0.4)" }}>Racha actual</p>
      </div>
    </div>
  );
}

/* ── Balance Display (compact) ── */
export function BalanceCompact({ balance }: { balance: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(197,163,100,0.15)" }}>
        <Star size={14} className="text-[#C5A364]" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: INK }}>{balance.toLocaleString()}</p>
        <p style={{ fontSize: 10, color: "rgba(9,18,1,0.4)" }}>Puntos</p>
      </div>
    </div>
  );
}

/* ── Challenge Card — icon in tonal circle, lateral accent ── */
export function ChallengeCard({ challenge, onAction }: {
  challenge: Challenge; onAction?: () => void;
}) {
  const completed = challenge.progress >= challenge.total;
  const pct = Math.min((challenge.progress / challenge.total) * 100, 100);
  const Icon = iconForChallenge(challenge.id);
  return (
    <div className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] p-4 overflow-hidden">
      {/* Lateral accent */}
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{
        background: completed ? EARN_COLOR : `linear-gradient(180deg, ${EARN_COLOR}, ${EARN_SOFT})`,
        opacity: completed ? 1 : 0.7,
      }} />
      <div className="flex items-start gap-3 pl-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(197,163,100,0.14)" }}
        >
          <Icon size={18} className="text-[#C5A364]" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate" style={{ fontSize: 14, fontWeight: 600, color: INK }}>{challenge.name}</p>
            <PointsBadge amount={challenge.points} />
          </div>
          <p className="mt-0.5" style={{ fontSize: 12, color: "rgba(9,18,1,0.55)" }}>{challenge.desc}</p>
          {challenge.total > 1 && (
            <div className="mt-2">
              <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "rgba(9,18,1,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: completed ? EARN_COLOR : `linear-gradient(90deg, ${EARN_COLOR}, ${EARN_SOFT})` }} />
              </div>
              <p className="mt-1" style={{ fontSize: 10, color: "rgba(9,18,1,0.4)" }}>{challenge.progress}/{challenge.total}</p>
            </div>
          )}
          {!completed && onAction && (
            <button
              onClick={onAction}
              className="mt-2 px-3 py-1.5 rounded-xl active:scale-[0.97] transition-transform"
              style={{ background: "rgba(197,163,100,0.14)", fontSize: 12, fontWeight: 500, color: EARN_COLOR }}
            >
              {challenge.cta}
            </button>
          )}
          {completed && (
            <div className="mt-2 flex items-center gap-1" style={{ color: EARN_COLOR }}>
              <CheckCircle2 size={14} />
              <span style={{ fontSize: 12, fontWeight: 500 }}>Completado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Reward Card ── */
export function RewardCard({ reward, onClick }: { reward: Reward; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_2px_16px_rgba(9,18,1,0.06)] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
    >
      <img src={reward.img} alt={reward.name} className="w-full h-28 object-cover" />
      <div className="p-3">
        <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(9,18,1,0.4)" }}>{reward.brand}</p>
        <p className="mt-0.5 line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: INK }}>{reward.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(89,2,29,0.08)", fontSize: 12, fontWeight: 600, color: SPEND_COLOR }}>
            <Star size={11} /> {reward.cost} pts
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── History Item — bolder amounts ── */
export function HistoryItem({ entry }: { entry: PointsHistoryEntry }) {
  const isEarn = entry.type === "earn";
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#091201]/5 last:border-0">
      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
        background: isEarn ? "rgba(197,163,100,0.14)" : "rgba(89,2,29,0.08)"
      }}>
        {isEarn ? (
          <Star size={15} className="text-[#C5A364]" strokeWidth={2.2} />
        ) : (
          <Ticket size={15} className="text-[#59021D]" strokeWidth={2.2} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: INK }}>{entry.label}</p>
        <p style={{ fontSize: 11, color: "rgba(9,18,1,0.4)" }}>{entry.date}</p>
      </div>
      <span style={{ fontSize: 15, fontWeight: 700, color: isEarn ? EARN_COLOR : SPEND_COLOR, letterSpacing: 0.2 }}>
        {isEarn ? "+" : "−"}{entry.amount}
      </span>
    </div>
  );
}

/* ── Badge Icon — lucide, premium, no emoji ── */
export function BadgeIcon({ badge, size = "md", progress }: {
  badge: Badge; size?: "sm" | "md"; progress?: number;
}) {
  const s = size === "sm" ? 48 : 60;
  const iconSize = size === "sm" ? 20 : 24;
  const Icon = iconForBadge(badge.id);
  const inProgress = !badge.unlocked && typeof progress === "number" && progress > 0;

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ width: s + 18 }}>
      <div className="relative" style={{ width: s, height: s }}>
        {/* Outer ring for unlocked */}
        {badge.unlocked && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${EARN_COLOR}, ${EARN_SOFT}, ${EARN_COLOR})`,
              padding: 2,
            }}
          >
            <div className="w-full h-full rounded-full" style={{ background: "#F9F7EB" }} />
          </div>
        )}
        {/* Progress ring for in-progress */}
        {inProgress && (
          <svg className="absolute inset-0" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
            <circle cx={s/2} cy={s/2} r={s/2 - 2} fill="none" stroke="rgba(9,18,1,0.06)" strokeWidth={2} />
            <circle
              cx={s/2} cy={s/2} r={s/2 - 2} fill="none"
              stroke={EARN_COLOR} strokeWidth={2} strokeLinecap="round"
              strokeDasharray={2 * Math.PI * (s/2 - 2)}
              strokeDashoffset={2 * Math.PI * (s/2 - 2) * (1 - (progress! / 100))}
              transform={`rotate(-90 ${s/2} ${s/2})`}
            />
          </svg>
        )}
        {/* Icon container */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            inset: badge.unlocked ? 3 : 0,
            background: badge.unlocked
              ? `linear-gradient(135deg, ${EARN_COLOR}, ${EARN_SOFT})`
              : "rgba(9,18,1,0.04)",
            border: badge.unlocked ? "none" : "1px solid rgba(9,18,1,0.08)",
          }}
        >
          <Icon
            size={iconSize}
            strokeWidth={2}
            color={badge.unlocked ? "#FFFFFF" : "rgba(9,18,1,0.28)"}
          />
          {!badge.unlocked && !inProgress && (
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white/90 border border-[#091201]/10 flex items-center justify-center">
              <Lock size={9} className="text-[#091201]/40" strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
      <p className="text-center" style={{
        fontSize: 10, fontWeight: 500,
        color: badge.unlocked ? INK : "rgba(9,18,1,0.4)", lineHeight: 1.2,
      }}>
        {badge.name}
      </p>
    </div>
  );
}

/* ── Daily Streak — connected track, sober day-7 accent ── */
export function StreakCalendar({ dailyRewards }: { dailyRewards: DailyReward[] }) {
  const dayLabels = ["L", "M", "X", "J", "V", "S", "D"];
  const claimedIdx = dailyRewards.reduce((acc, d, i) => d.claimed ? i : acc, -1);
  const trackPct = ((claimedIdx + 1) / (dailyRewards.length - 1)) * 100;

  return (
    <div className="relative px-1">
      {/* Connecting track */}
      <div
        className="absolute left-4 right-4 rounded-full"
        style={{ top: 24, height: 3, background: "rgba(9,18,1,0.06)" }}
      />
      <motion.div
        className="absolute left-4 rounded-full"
        style={{
          top: 24, height: 3,
          background: `linear-gradient(90deg, ${EARN_COLOR}, ${EARN_SOFT})`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `calc((100% - 32px) * ${trackPct / 100})` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-1">
        {dailyRewards.map((d, i) => {
          const isDay7 = i === dailyRewards.length - 1;
          return (
            <div key={d.day} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
              <span style={{ fontSize: 10, color: "rgba(9,18,1,0.4)", fontWeight: isDay7 ? 600 : 400 }}>
                {dayLabels[i]}
              </span>
              <div className="relative" style={{ width: 36, height: 36 }}>
                {/* Double ring for day 7 bonus */}
                {isDay7 && !d.claimed && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: -4,
                      border: `1.5px dashed ${EARN_COLOR}`,
                      opacity: 0.6,
                    }}
                  />
                )}
                {/* Pulsing ring for today */}
                {d.today && !d.claimed && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ inset: -3, border: `2px solid ${SPEND_COLOR}` }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: d.claimed
                      ? `linear-gradient(135deg, ${EARN_COLOR}, ${EARN_SOFT})`
                      : d.today
                        ? "rgba(89,2,29,0.08)"
                        : isDay7
                          ? "rgba(197,163,100,0.1)"
                          : "rgba(9,18,1,0.04)",
                    border: d.today && !d.claimed
                      ? `1.5px solid ${SPEND_COLOR}`
                      : isDay7 && !d.claimed
                        ? `1.5px solid ${EARN_COLOR}`
                        : "1.5px solid transparent",
                  }}
                >
                  {d.claimed ? (
                    <CheckCircle2 size={16} className="text-white" strokeWidth={2.4} />
                  ) : (
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: d.today ? SPEND_COLOR : isDay7 ? EARN_COLOR : "rgba(9,18,1,0.3)",
                    }}>
                      +{d.points}
                    </span>
                  )}
                </motion.div>
              </div>
              {isDay7 && !d.claimed && (
                <span
                  className="px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(197,163,100,0.14)",
                    fontSize: 8, fontWeight: 700, color: EARN_COLOR, letterSpacing: 0.3,
                  }}
                >
                  BONUS
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Section Header (reusable) ── */
export function SectionHeader({ title, action, onAction }: {
  title: string; action?: string; onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 style={{ fontSize: 18, fontWeight: 600, color: INK }}>{title}</h3>
      {action && (
        <button onClick={onAction} className="flex items-center gap-0.5" style={{ fontSize: 13, fontWeight: 500, color: ENERGY }}>
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

/* ── SubPage Header (back arrow + title) ── */
export function SubPageHeader({ title, onBack, right }: {
  title: string; onBack: () => void; right?: ReactNode;
}) {
  return (
    <div className="px-5 pt-14 pb-4 flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center"
      >
        <span className="text-[#091201]" style={{ fontSize: 20 }}>&#8592;</span>
      </button>
      <h1 className="flex-1" style={{ fontSize: 22, fontWeight: 600, color: INK }}>{title}</h1>
      {right}
    </div>
  );
}