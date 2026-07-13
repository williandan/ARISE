/**
 * Barra de progresso do design: trilho + preenchimento com gradiente, varredura
 * "shine" e (opcional) overlay segmentado. Server-safe (sem hooks).
 * O shine para automaticamente com prefers-reduced-motion (regra global em globals.css).
 */
export function Bar({
  value,
  fill,
  height = 8,
  segmented = false,
  glow,
  shine = true,
  className = "",
}: {
  /** 0–100. */
  value: number;
  /** Cor/gradiente do preenchimento. */
  fill: string;
  height?: number;
  segmented?: boolean;
  glow?: string;
  shine?: boolean;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-white/8 ${className}`}
      style={{ height }}
    >
      <div
        className="relative h-full overflow-hidden rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, background: fill, boxShadow: glow }}
      >
        {shine && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              animation: "shine 3s linear infinite",
            }}
          />
        )}
      </div>
      {segmented && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0 32px, rgba(0,0,0,0.35) 32px 34px)",
          }}
        />
      )}
    </div>
  );
}
