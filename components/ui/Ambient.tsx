import { BG_CYAN, BG_PURPLE, CYAN, MONARCH } from "@/lib/colors";

/**
 * Camadas de fundo do "Sistema": gradiente por tema, glow de topo, grid em
 * perspectiva (opcional), scanlines, scan bar animada, partículas e vinheta.
 * Todas pointer-events:none. Ref.: handoff "Backgrounds".
 */

// Partículas determinísticas (evita mismatch de hidratação; sem Math.random).
const PARTICLES = [
  { left: "12%", delay: "0s", dur: "7s", size: 3 },
  { left: "27%", delay: "2.4s", dur: "8.5s", size: 2 },
  { left: "43%", delay: "1.1s", dur: "6.5s", size: 3 },
  { left: "61%", delay: "3.2s", dur: "9s", size: 2 },
  { left: "74%", delay: "0.7s", dur: "7.8s", size: 3 },
  { left: "88%", delay: "4s", dur: "8s", size: 2 },
];

export function Ambient({
  tone = "cyan",
  grid = false,
}: {
  tone?: "cyan" | "purple";
  grid?: boolean;
}) {
  const accent = tone === "purple" ? MONARCH : CYAN;
  const bg = tone === "purple" ? BG_PURPLE : BG_CYAN;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* gradiente base */}
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* glow de topo */}
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${accent}22, transparent)` }}
      />

      {/* grid em perspectiva (Home) */}
      {grid && (
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-40"
          style={{
            backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            transform: "perspective(680px) rotateX(75deg)",
            transformOrigin: "bottom",
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      )}

      {/* scanlines */}
      <div className="scanlines absolute inset-0 opacity-60" />

      {/* scan bar */}
      <div
        className="absolute inset-x-0 top-0 h-[150px]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${accent}14, transparent)`,
          animation: "scanmove 8.5s linear infinite",
        }}
      />

      {/* partículas */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
            animation: `floatp ${p.dur} ease-in infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* vinheta */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 240px 60px rgba(0,0,0,0.7)" }}
      />
    </div>
  );
}
