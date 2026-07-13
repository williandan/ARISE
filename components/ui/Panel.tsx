import type { CSSProperties, ReactNode } from "react";

/**
 * "System Window" — painel chanfrado de dupla-camada (borda gradiente 1.5px).
 * Corta o canto superior-esquerdo e o inferior-direito (clip-path).
 * Ref.: handoff "The System Window panel motif".
 */

export type PanelTone = "cyan" | "purple" | "gold" | "cyanPurple" | "neutral";

function chamfer(cut: number): string {
  return `polygon(${cut}px 0, 100% 0, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0 100%, 0 ${cut}px)`;
}

const TONE_BORDER: Record<PanelTone, string> = {
  cyan: "linear-gradient(160deg, #7cc4ff, #2f7fd6)",
  purple: "linear-gradient(160deg, #c99bff, #7c3aed)",
  gold: "linear-gradient(160deg, #f5c542, #7c3aed)",
  cyanPurple: "linear-gradient(90deg, #2f7fd6, #6d5cd0 55%, #8b5cf6)",
  neutral: "linear-gradient(160deg, rgba(150,170,210,0.4), rgba(90,110,150,0.25))",
};

const TONE_GLOW: Record<PanelTone, string> = {
  cyan: "0 0 26px -6px rgba(56,189,248,0.45)",
  purple: "0 0 30px -6px rgba(168,85,247,0.5)",
  gold: "0 0 28px -6px rgba(245,197,66,0.4)",
  cyanPurple: "0 0 26px -6px rgba(139,92,246,0.4)",
  neutral: "none",
};

const TONE_FILL: Record<PanelTone, string> = {
  purple: "linear-gradient(160deg, rgba(20,14,34,0.94), rgba(9,7,16,0.97))",
  gold: "linear-gradient(160deg, rgba(20,16,10,0.94), rgba(9,8,6,0.97))",
  cyan: "linear-gradient(160deg, rgba(12,18,30,0.95), rgba(7,10,17,0.97))",
  cyanPurple: "linear-gradient(160deg, rgba(12,15,30,0.95), rgba(7,9,17,0.97))",
  neutral: "linear-gradient(160deg, rgba(12,15,24,0.9), rgba(7,9,15,0.95))",
};

export function Panel({
  tone = "cyan",
  cut = 18,
  border,
  fill,
  glow,
  className = "",
  innerClassName = "",
  style,
  innerStyle,
  children,
}: {
  tone?: PanelTone;
  cut?: number;
  /** Sobrescreve a borda gradiente (ex.: cor de rank). */
  border?: string;
  fill?: string;
  glow?: string;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        clipPath: chamfer(cut),
        background: border ?? TONE_BORDER[tone],
        padding: 1.5,
        boxShadow: glow ?? TONE_GLOW[tone],
        ...style,
      }}
    >
      <div
        className={innerClassName}
        style={{
          clipPath: chamfer(Math.max(1, cut - 1)),
          background: fill ?? TONE_FILL[tone],
          backdropFilter: "blur(8px)",
          height: "100%",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
