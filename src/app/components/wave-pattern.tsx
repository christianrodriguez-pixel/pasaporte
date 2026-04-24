import { useRef } from "react";
import svgPaths from "../../imports/svg-4upcoz5h0a";
import svgWidePaths from "../../imports/svg-0ojnmki5c8";

// ─── WavePattern ──────────────────────────────────────────────────────────────
// Fuente de verdad compartida. Usar useRef para IDs de gradiente estables
// (evita el bug de "wave gigante" por IDs duplicados entre instancias).

interface WavePatternProps {
  variant?: "dark" | "gold" | "red";
  className?: string;
}

const gradients = {
  dark: { from: "#091201", to: "#DD053E" },
  gold: { from: "#C59138", to: "#DBC8A7" },
  red:  { from: "#DD053E", to: "#96051C" },
};

export function WavePattern({ variant = "gold", className = "" }: WavePatternProps) {
  const g = gradients[variant];
  // ID estable por instancia — generado una sola vez al montar
  const uid = useRef(`wave-${variant}-${Math.random().toString(36).slice(2, 6)}`);
  const id = uid.current;

  return (
    <svg
      className={`w-full ${className}`}
      fill="none"
      viewBox="0 0 316.647 203.372"
      preserveAspectRatio="none"
    >
      {[svgPaths.p126941c0, svgPaths.p13e4f470, svgPaths.p3c4d0980, svgPaths.p2d4433f0].map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}-${i})`} />
      ))}
      <defs>
        {[30.69, 78.69, 124.69, 172.69].map((y, i) => (
          <linearGradient key={i} gradientUnits="userSpaceOnUse" id={`${id}-${i}`} x1="0" x2="316.64" y1={y} y2={y}>
            <stop stopColor={g.from} />
            <stop offset="1" stopColor={g.to} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

// ─── WavePatternWide ──────────────────────────────────────────────────────────
// Variante ancha para la credencial de pasaporte (viewBox 548×203).
// Recibe colores arbitrarios (from/to) para adaptarse a cada tier.

export function WavePatternWide({
  from,
  to,
  className = "",
}: {
  from: string;
  to: string;
  className?: string;
}) {
  const uid = useRef(`wwide-${Math.random().toString(36).slice(2, 6)}`);
  const id = uid.current;

  return (
    <svg className={`w-full ${className}`} fill="none" viewBox="0 0 548 203" preserveAspectRatio="none">
      {[svgWidePaths.p2d493a80, svgWidePaths.p3b035480, svgWidePaths.p32136180, svgWidePaths.p3fc7000].map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}-${i})`} />
      ))}
      <defs>
        {[30.5, 78.5, 124.5, 172.5].map((y, i) => (
          <linearGradient key={i} gradientUnits="userSpaceOnUse" id={`${id}-${i}`} x1="0" x2="548" y1={y} y2={y}>
            <stop stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
