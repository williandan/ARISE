import type { ReactNode } from "react";

/**
 * Badge hexagonal (dupla-camada) — usado em ranks e códigos de atributo.
 * Ref.: handoff "Hexagon (rank badges)".
 */

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

export function Hexagon({
  label,
  sub,
  color,
  size = 64,
  labelClassName = "",
  locked = false,
  children,
}: {
  /** Letra/código central (ex.: "S", "E", "STR"). Ignorado se `children`. */
  label?: string;
  /** Rótulo pequeno abaixo (ex.: "RANK"). */
  sub?: string;
  /** Cor principal (rank/accent). */
  color: string;
  /** Largura em px (altura ≈ 1.12×). */
  size?: number;
  labelClassName?: string;
  locked?: boolean;
  children?: ReactNode;
}) {
  const height = Math.round(size * 1.12);
  const tone = locked ? "#6b7c94" : color;

  return (
    <span
      style={{
        width: size,
        height,
        clipPath: HEX,
        background: `linear-gradient(160deg, ${tone}, color-mix(in srgb, ${tone} 50%, #05060a))`,
        padding: 2,
        display: "inline-flex",
        filter: locked
          ? "none"
          : `drop-shadow(0 0 8px color-mix(in srgb, ${tone} 45%, transparent))`,
      }}
    >
      <span
        style={{
          clipPath: HEX,
          background: "radial-gradient(120% 120% at 50% 25%, #1a1030, #0b0916 70%)",
          color: tone,
        }}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        {children ?? (
          <>
            <span className={`font-numeric leading-none font-bold ${labelClassName}`}>{label}</span>
            {sub && (
              <span className="font-display mt-0.5 text-[8px] font-semibold tracking-[0.15em] text-current/70">
                {sub}
              </span>
            )}
          </>
        )}
      </span>
    </span>
  );
}
