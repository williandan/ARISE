import type { Rank } from "@/lib/leveling";

/** Selo de rank com a cor do design system (E–S) e glow. */

const RANK_CLASS: Record<Rank, string> = {
  E: "text-rank-e",
  D: "text-rank-d",
  C: "text-rank-c",
  B: "text-rank-b",
  A: "text-rank-a",
  S: "text-rank-s",
};

const SIZE_CLASS = {
  sm: "h-8 w-8 text-sm",
  md: "h-11 w-11 text-xl",
  lg: "h-16 w-16 text-4xl",
} as const;

export function RankBadge({
  rank,
  size = "md",
  locked = false,
  className = "",
}: {
  rank: Rank;
  size?: keyof typeof SIZE_CLASS;
  locked?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-display bg-bg-panel/60 glow-rank inline-flex items-center justify-center rounded-md font-bold ${
        locked ? "text-ink-faint" : RANK_CLASS[rank]
      } ${SIZE_CLASS[size]} ${className}`}
    >
      {locked ? "🔒" : rank}
    </span>
  );
}
