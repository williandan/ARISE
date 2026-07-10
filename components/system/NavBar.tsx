"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

/** Navegação principal — pílula de vidro fixa no topo. */

const LINKS = [
  { href: "/", key: "home", match: (p: string) => p === "/" },
  { href: "/gates", key: "gates", match: (p: string) => p.startsWith("/gates") },
  { href: "/skills", key: "skills", match: (p: string) => p.startsWith("/skills") },
  { href: "/about", key: "about", match: (p: string) => p.startsWith("/about") },
  { href: "/contact", key: "contact", match: (p: string) => p.startsWith("/contact") },
] as const;

export function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:top-4 sm:bottom-auto">
      <ul className="bg-bg-panel/70 flex items-center gap-1 rounded-full border border-white/5 px-2 py-1 backdrop-blur-sm">
        {LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-display block rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                  active
                    ? "text-system-cyan text-glow-cyan bg-system-cyan/10"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {t(link.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
