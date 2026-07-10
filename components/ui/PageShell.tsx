import type { ReactNode } from "react";

/** Moldura padrão das páginas de conteúdo — header + espaçamento que limpa o NavBar. */
export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-36 pb-24 sm:pt-28">
      <header className="mb-10 text-center">
        <h1 className="font-display text-system-cyan text-glow-cyan text-3xl font-bold tracking-[0.12em] break-words uppercase sm:text-5xl sm:tracking-[0.2em]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-ink-dim mx-auto mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </header>
      {children}
    </main>
  );
}
