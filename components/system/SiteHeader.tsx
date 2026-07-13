"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUiStore } from "@/store/uiStore";
import { HudChip } from "./HudChip";
import { LanguageToggle } from "./LanguageToggle";
import { SoundToggle } from "./SoundToggle";

const LINKS = [
  { href: "/", key: "home", match: (p: string) => p === "/" },
  { href: "/gates", key: "gates", match: (p: string) => p.startsWith("/gates") },
  { href: "/skills", key: "skills", match: (p: string) => p.startsWith("/skills") },
  { href: "/about", key: "about", match: (p: string) => p.startsWith("/about") },
  { href: "/contact", key: "contact", match: (p: string) => p.startsWith("/contact") },
] as const;

/** Cabeçalho global: logo ARISE + navegação + HUD + toggles. */
export function SiteHeader() {
  const t = useTranslations("nav");
  const th = useTranslations("hud");
  const pathname = usePathname();
  const openQuestLog = useUiStore((s) => s.openQuestLog);

  const isHome = pathname === "/";
  const accent = isHome ? "var(--color-monarch)" : "var(--color-cyan)";
  const tagline = isHome ? "THE MONARCH" : "THE SYSTEM";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span
              className="inline-block h-5 w-5 rotate-45 rounded-[3px]"
              style={{
                background: "transparent",
                border: `2px solid ${accent}`,
                boxShadow: `0 0 12px ${accent}`,
              }}
            >
              <span
                className="block h-1.5 w-1.5 translate-x-[5px] translate-y-[5px] rounded-[1px]"
                style={{ background: accent }}
              />
            </span>
            <span className="leading-none">
              <span className="font-display text-ink block text-lg font-bold tracking-[0.35em]">
                ARISE
              </span>
              <span
                className="font-display block text-[9px] font-semibold tracking-[0.3em]"
                style={{ color: accent }}
              >
                {tagline}
              </span>
            </span>
          </Link>

          {/* Direita */}
          <div className="flex items-center gap-3">
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {LINKS.map((l) => {
                  const active = l.match(pathname);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={`font-display block rounded-sm px-2.5 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                          active
                            ? "text-cyan text-glow-cyan bg-cyan/10"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {t(l.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {!isHome && <HudChip />}

            <button
              type="button"
              onClick={openQuestLog}
              title={th("questLog")}
              aria-label={th("questLog")}
              className="border-cyan/25 text-cyan hover:bg-cyan/10 hidden h-8 items-center gap-1.5 rounded-sm border bg-white/3 px-2.5 text-[11px] font-semibold tracking-widest uppercase transition-colors sm:flex"
            >
              ◈<span className="hidden xl:inline">{th("questLog")}</span>
            </button>

            <LanguageToggle />
            <SoundToggle />
          </div>
        </div>
      </header>

      {/* Navegação mobile (rodapé) */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-black/60 backdrop-blur-md lg:hidden">
        <ul className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {LINKS.map((l) => {
            const active = l.match(pathname);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-display block px-1.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                    active ? "text-cyan text-glow-cyan" : "text-muted"
                  }`}
                >
                  {t(l.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
