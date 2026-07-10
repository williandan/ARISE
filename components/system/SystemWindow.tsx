import type { ReactNode } from "react";

/**
 * Janela azul do Sistema — o card icônico: borda com glow, cantos chanfrados,
 * título em caps, fundo "vidro". Base visual de toasts e do Quest Log.
 * Ref.: docs/PLANO.md §7.3.
 */

type Tone = "cyan" | "purple";

const TONE_TITLE: Record<Tone, string> = {
  cyan: "text-system-cyan border-system-cyan/25",
  purple: "text-monarch border-monarch/25",
};

// Cantos chanfrados (bevel) via clip-path.
const BEVEL = {
  clipPath:
    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
};

export function SystemWindow({
  title,
  tone = "cyan",
  children,
  className = "",
}: {
  title?: ReactNode;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      style={BEVEL}
      className={`bg-bg-panel/90 ${tone === "purple" ? "glow-purple" : "glow-cyan"} backdrop-blur-sm ${className}`}
    >
      {title != null && (
        <div
          className={`font-display border-b px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase ${TONE_TITLE[tone]}`}
        >
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
