# Handoff: ARISE — Solo Leveling Developer Portfolio

## Overview
ARISE is an immersive, game-like portfolio for full-stack developer **Willian Daniel**, themed after the "System" UI from *Solo Leveling*. The core concept: the **site owner is the fixed S-rank purple "Monarch"**, and the **visitor is a Player who starts at E-rank (cyan-blue)** and levels up by navigating the site — unlocking higher-ranked "Gates" (projects) as they progress. The whole UI shifts from **electric cyan-blue (low rank) toward monarch purple (high rank)** to mirror this journey.

The UI is **bilingual (Portuguese / English)** with a language toggle in every header.

This package documents four screens: the Boot/Entrance, the Home/Hunter Profile, the Gates (projects) grid, and the Skill Tree.

---

## About the Design Files
The files in `designs/` are **design references created in HTML** — prototypes that demonstrate the intended look, motion, and behavior. **They are not production code to copy directly.**

They are authored as "Design Components" (`.dc.html`) that rely on a small runtime (`support.js`) to render `{{ }}` template holes and a logic class. **Do not ship these as-is.** The task is to **recreate these designs in the target codebase's environment** (React, Vue, Svelte, SwiftUI, plain HTML/CSS, etc.) using that project's established patterns, component library, and conventions. If no codebase exists yet, choose an appropriate stack (React + Vite + CSS Modules / Tailwind is a natural fit) and implement there.

When reading a `.dc.html` file: the markup between the logic is standard HTML with inline styles; ignore the `<x-dc>`/`data-props` scaffolding and the `{{ }}` bindings (documented as real values below). Two attributes are custom sugar: `style-hover="…"` = a `:hover` style, and `onClick="{{ fn }}"` = a click handler.

---

## Fidelity
**High-fidelity (hifi).** These are pixel-level mockups with final colors, typography, spacing, glow, and interactions. Recreate the UI faithfully — exact hex values, the angular chamfered panel motif, glow shadows, and animations are all part of the identity. Only substitute where the target codebase has an equivalent primitive (e.g. its own button component) — keep the visual result identical.

---

## Global Design Language (applies to every screen)

### The "System Window" panel motif
Every card/panel is a **double-layer chamfered frame**:
1. Outer wrapper: `padding: 1.5px`, a **gradient background** (the accent), and a `clip-path` polygon that cuts the top-left and bottom-right corners.
2. Inner element: a slightly smaller matching `clip-path`, filled with a near-black translucent gradient, holding the content.

This produces a 1.5px glowing angular border. The standard corner-cut polygon (for a ~Npx cut) is:
```css
clip-path: polygon(Npx 0, 100% 0, 100% calc(100% - Npx), calc(100% - Npx) 100%, 0 100%, 0 Npx);
```
Cut sizes used: 28/26 px (hero card), 18/17 px (side panels), 14/13 px (chips), 12/10/8/6 px (buttons/badges, scaling down with element size). The inner layer uses `Npx − 1`.

**Hexagon** (rank badges): `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)`.
**Diamond** (bullets/pips): `transform: rotate(45deg)` on a small square.

### Backgrounds
- Base page: `#05060A`.
- Blue-themed pages layer: `radial-gradient(120% 90% at 50% -12%, #0c1526 0%, #070c16 45%, #05060a 100%)`.
- Purple-themed page (Hunter Profile): `radial-gradient(130% 90% at 50% -10%, #160f28 0%, #0b0916 46%, #06050a 100%)`.
- Ambient layers stacked on every page (all `pointer-events:none`):
  - **Perspective floor grid** (Hunter Profile): grid lines `transform: perspective(680px) rotateX(75deg)`, masked to fade upward.
  - **Top accent glow**: large blurred radial in the accent color.
  - **Scanlines**: `repeating-linear-gradient(0deg, rgba(255,255,255,.02) 0 1px, transparent 1px 3px)` at ~0.5–0.6 opacity.
  - **Moving scan bar**: a 150px tall accent gradient sweeping top→bottom (`@keyframes scanmove`, 8–9s linear infinite).
  - **Floating particles**: 2–3px dots in accent color with matching `box-shadow` glow, drifting up and fading (`@keyframes floatp`).
  - **Vignette**: `box-shadow: inset 0 0 240px 60px rgba(0,0,0,.7)`.

### Layout container
Content sits in a centered column: `width:100%; max-width:1600px; margin:0 auto; padding:28–30px 48px …`. On tall pages the container is `min-height:100vh; display:flex; flex-direction:column` so content stretches to fill the viewport (grids/lists use `flex:1`) and footers/achievements anchor the bottom — **no empty band at the bottom**.

---

## Design Tokens

### Rank colors (E→S journey, blue→purple→gold)
| Rank | Meaning | Primary | Light | Deep |
|---|---|---|---|---|
| E — Awakened | gray | `#C5CCD8` | `#AAB3C2` | `#5B6577` |
| D — Scout | green | `#34D399` | `#6EE7B7` | `#159A6A` |
| C — Vanguard | blue | `#38BDF8` | `#7CC4FF` | `#2F7FD6` |
| B — Elite | purple | `#8B5CF6` | `#C99BFF` | `#7C3AED` |
| A — National | orange | `#F59E0B` | `#F5C98A` | `#C47D10` |
| S — Monarch | red/gold | `#F5C542` (gold) + `#D9633F` (red) | — | `#C83C32` |

### Core accent palette
- **Visitor cyan (low rank):** primary `#38BDF8`, light `#7CC4FF` / `#9DD3FF`, deep `#2F7FD6`. Glow: `rgba(56,168,255,.55)`.
- **Monarch purple (owner):** primary `#A855F7`, light `#C99BFF`, deep `#7C3AED`. Mid-violet `#8B5CF6`. Glow: `rgba(168,85,247,.6)`.
- **Gold accent (S-rank / max / achievements):** `#D9B64F` / `#F5C542`.
- **Success check:** `#59E0A3`. **Mute slash / alert:** `#FF6B6B`.

### Neutrals & text
- Headings on dark: `#F2F7FF` / `#F4EEFF` / `#EEF4FF`.
- Body: `#C6D2E4` (blue pages) / `#D0C6E4` (purple page).
- Muted: `#8EA3BF`, `#7F97B3`, `#5F7D9E`, `#66788F`, `#8A6EA8` (purple-muted).
- Panel fills: `rgba(20,14,34,.94)`→`rgba(9,7,16,.97)` (purple), `rgba(12,18,30,.95)`→`rgba(7,10,17,.97)` (blue).
- Track (unfilled bars): `rgba(255,255,255,.05)` with border `rgba(120,160,220,.25–.3)`.

### Typography
- **Display / UI / titles:** `'Chakra Petch', sans-serif` (weights 400/500/600/700). Used for headings, labels, buttons, badges. Titles use heavy letter-spacing (2–8px).
- **Numeric / stat readouts:** `'Orbitron', sans-serif` (weights 500/700/900) — levels, XP numbers, rank letters, attribute scores.
- **Body copy:** `'Inter', sans-serif` (400/500/600/700).
- **Typed/terminal line (Boot only):** `'JetBrains Mono', monospace` (400/500).
- Load via Google Fonts. Type sizes are listed per screen below.

### Spacing / radius / motion
- Panel padding: 16–50px depending on size. Grid gaps: 16–28px.
- Corners are **chamfered (clip-path), not rounded** — border-radius is only used on the small square toggle buttons (2px) and particle dots (50%).
- Glow shadows: `0 0 20–46px <glow>` on panels; `0 0 90–130px <glow-soft>` as an outer halo on the hero card.
- Animations (all defined as `@keyframes`):
  - `blink` — 1s steps(1) infinite (cursor `▮` / `_`).
  - `pulse` — 1.8–2.2s (opacity .45↔1) for status dots/diamonds.
  - `scanmove` — 8–9s linear infinite (scan bar).
  - `floatp` — 6–9s ease-in infinite (particles).
  - `shine` — 3–3.4s linear infinite (a 50–64px white gradient sweeping across filled XP/level bars).
  - `winglow` — 4.2s ease-in-out (Boot window breathing glow).
  - `appear` — 0.6–0.75s (opacity+translateY fade-in), staggered by `animation-delay` for the Boot sequence.
  - `lockpulse` — 2.4s (locked padlock drop-shadow breathing).
- Card hover (Gates): `transform: translateY(-4px)`, transition `.18s ease` + stronger box-shadow.

### Language toggle mechanic
Root element carries `data-lang="en" | "pt"`. Every translatable string is authored as two sibling spans:
```html
<span class="lang-en">English text</span><span class="lang-pt">Texto em português</span>
```
CSS: `.lang-pt{display:none}` and `[data-lang="pt"] .lang-pt{display:inline}` / `[data-lang="pt"] .lang-en{display:none}`. In a real app, replace with the project's i18n solution (all PT/EN strings are in the "Copy" tables below).

---

## Screens / Views

### 1. Boot / Entrance (`Boot Entrance.dc.html`) — CYAN
**Purpose:** The first thing a visitor sees — the moment the System "chooses" them as a Player. Fully cyan-blue (visitor starts low-rank). Links forward into the Home.

**Layout:** Full-viewport flex column, centered vertically and horizontally, `gap:26px`. Near-black radial background centered at 42%. EN/PT toggle pinned top-right (`position:absolute; top:30px; right:36px`).

**Reveal sequence** (staggered `appear` animation): typed line (delay .15s) → RANK E badge (.9s) → System window (.45s, then `winglow` loops from 1.3s) → skip link (1.3s).

**Components (top→bottom):**
- **Typed line** — JetBrains Mono 14px, `#5F7D9E`, letter-spacing 1.5px. `> Detecting visitor qualification..._` — the `>` and blinking `_` are `#38BDF8`.
- **[ RANK E ] badge** — Chakra Petch 11px, letter-spacing 5px, `#5F8BB5`; chamfered border `rgba(56,168,255,.28)`, fill `rgba(56,168,255,.04)`; pulsing diamond dot.
- **System window** — 660px wide (`max-width:90vw`). Outer gradient `linear-gradient(160deg,#9dd3ff,#2f7fd6)`, 30px corner cut, `winglow` breathing shadow. Inner fill `rgba(11,19,33,.95)`→`rgba(6,10,18,.98)`, `backdrop-filter:blur(8px)`, padding `38px 46px 42px`. Contains:
  - Header row: `◆ SYSTEM` (13px, letter-spacing 5px, `#38BDF8`, pulsing diamond) + `NOTIFICATION` (right, 11px, `#5F7D9E`). Divider: 1px cyan→transparent gradient.
  - Title: Chakra Petch 25px/500, `#DBE8F8` — "You have acquired the qualification to become a **Player**." ("Player" is 700, `#7CC4FF`).
  - Big line: Chakra Petch 38px/700, `#F2F8FF`, glow text-shadow — "Accept?"
  - An animated inner light `sweep` diagonal.
  - **Buttons row** (`gap:16px`, both `flex:1`, 12px corner cut):
    - **ACCEPT** — primary, fill `linear-gradient(120deg,#9dd3ff,#2f7fd6)`, text `#05060A` 16px/700 letter-spacing 4px, glow shadow; hover intensifies glow. Links to Home.
    - **DECLINE** — ghost, transparent, border `rgba(96,150,220,.35)`, text `#7F97B3` 15px/600; hover brightens.
- **SKIP INTRO ▸** — ghost link, Chakra Petch 12px, letter-spacing 3px, `#4E6885`; hover `#7CC4FF`. Links to Home.

**Copy:** EN "Detecting visitor qualification..." / PT "Detectando qualificação do visitante...". Title PT "Você adquiriu a qualificação para se tornar um **Jogador**." / "Aceita?". Buttons ACCEPT=SIM, DECLINE=NÃO, SKIP INTRO=PULAR INTRO.

---

### 2. Home / Hunter Profile (`Hunter Profile.dc.html`) — PURPLE
**Purpose:** The landing/status page. **Two distinct identities:**
- **Left card = the owner (Willian Daniel), fixed S-rank purple Monarch.** Never changes/progresses.
- **Right column = the visitor**, starting at E-rank cyan, meant to fill up as they navigate.

**Layout:** Full-viewport flex column. Header row, then a `.hp-main` **CSS grid 60/40**: `grid-template-columns: minmax(0,1.55fr) minmax(0,1fr); gap:28px; align-items:stretch`. Below 980px collapses to one column. Right column is a flex column with `gap:22px` where the Rank Path panel uses `flex:1` to stretch and match the left card's height.

**Header:** ARISE logo (hex diamond mark + "ARISE" 23px letter-spacing 7px + "THE MONARCH" 10px purple) on the left; on the right: EN/PT segmented toggle + square mute button (speaker SVG; red slash appears when muted).

**Left — Monarch Profile card** (purple, 28/26px cut, outer `linear-gradient(160deg,#c99bff,#7c3aed)`, halo `0 0 46px … , 0 0 130px …`, padding `44px 50px`, inner is a flex column):
- Top label row: `◆ MONARCH PROFILE` (13px letter-spacing 5px, `#A855F7`, pulsing diamond) + `ID · WD-0001` (right, `#8A6EA8`).
- Identity row (`gap:32px`): **S hexagon badge** 120×134px (purple gradient border, inner radial `#1a1030`→`#0b0916`, "S" Orbitron 62px `#A855F7` glow, "RANK" gold label) + name block: gold pill "S-RANK MONARCH", **H1 "WILLIAN / DANIEL"** Chakra Petch 700, `clamp(48px,5.2vw,72px)`, letter-spacing 3px, `#F7F2FF`, line-height .98; role "Full Stack Developer" 19px letter-spacing 6px `#C99BFF`.
- Tagline sub-window: left border 2px `#A855F7`, faint purple gradient fill, 15px `#CABBE0` + blinking `▮` — "The System bends to your will. Every gate has fallen."
- **Static status plaque** (replaces a progress bar — owner is done): border `#D9B64F` gold, fill `linear-gradient(90deg, rgba(217,182,79,.16), rgba(168,85,247,.10) 55%, transparent)`, `◆ MONARCH · SOVEREIGN` (Chakra Petch 17px letter-spacing 5px `#F7F2FF`) + `MAX` (Orbitron 22px gold, right). Caption: "All gates conquered · status locked at the summit".
- **Owner stats row** (two chambered cells): `GATES CLEARED 24 / 24` and `SKILLS 28 / 28` (Orbitron 26px).
- **CTA row:** primary **EXPLORE THE GATES ▸** (purple gradient, `#06050A` text) + ghost **VIEW RÉSUMÉ**.

**Right column (visitor):**
- **Visitor HUD** (cyan, 18/17px cut, outer `linear-gradient(160deg,#7cc4ff,#2f7fd6)`): header `● PLAYER · VISITOR` (cyan pulsing dot) + `RANK E` pill; row with **E hexagon** (cyan) + LEVEL `01` (Orbitron 22px) over a thin cyan XP bar at **8% width** + `40 / 500 XP` caption; **▸ QUEST LOG** button (cyan outline).
- **Rank Path panel** (`flex:1`, cyan→purple gradient border): title "RANK PATH" + sub "Climb from E to the Monarch". Six rows, distributed `justify-content:space-between`:
  - **S / A / B / C / D** shown dimmed (opacity .5–.62) with **padlock icons** (`#6B7C94`) — future/locked ranks. Hexes colored per rank (S purple, A `#9A4DF0`, B `#8E5CF6`, C `#7472FF`, D `#5691FF`).
  - **E — AWAKENED** highlighted: cyan chamfered row, cyan hex with `#06050A` "E", label "YOU" (PT "VOCÊ"). This is the visitor's current position.
- **Stats row:** two cells — `GATES CLEARED 03 / 24` style is NOT here (owner stats are on the left); right side stats were moved to the left card. *(Right column currently: HUD → Rank Path → Active Quest.)*
- **Active Quest card** (gold-bordered, `linear-gradient(160deg,#d9b64f,#7c3aed)` outer): header `◆ ACTIVE QUEST` (gold) + `+50 XP` chip; title "Explore the first Gate"; thin progress bar at **40%** (`linear-gradient(90deg,#c99bff,#d9b64f)`); caption "2 of 5 objectives complete".

**Copy (PT):** MONARCH PROFILE=PERFIL DO MONARCA; S-RANK MONARCH=MONARCA RANK S; Full Stack Developer=Desenvolvedor Full Stack; tagline "O Sistema se curva à sua vontade. Todos os gates caíram."; plaque caption "Todos os gates conquistados · status fixo no topo"; GATES CLEARED=GATES LIMPOS; EXPLORE THE GATES=EXPLORAR OS GATES; VIEW RÉSUMÉ=VER CURRÍCULO; PLAYER · VISITOR=JOGADOR · VISITANTE; QUEST LOG=MISSÕES; RANK PATH=CAMINHO DE RANK; "Climb from E to the Monarch"=" Suba de E até o Monarca"; YOU=VOCÊ; ACTIVE QUEST=MISSÃO ATIVA; "Explore the first Gate"="Explore o primeiro Gate"; "2 of 5 objectives complete"="2 de 5 objetivos concluídos".

---

### 3. Gates / Projects (`Gates.dc.html`) — CYAN header, rank-colored cards
**Purpose:** The projects page. Each project is a "dungeon gate" with a rank; low ranks are unlocked and glow in their color, high ranks are locked behind level progress.

**Layout:** Full-viewport flex column (`min-height:100vh`). Header row (with persistent visitor HUD) → page header → **grid** `.gates-grid` (`flex:1; grid-template-columns:repeat(3,1fr); grid-auto-rows:minmax(310px,1fr); gap:24px`) → full-width footer strip. Responsive: 2 cols ≤1180px, 1 col ≤720px.

**Header:** ARISE logo (cyan "THE SYSTEM" subtitle) + on the right a **persistent visitor HUD chip** (E hex, LEVEL 01, 118px cyan XP bar at 8%, RANK E pill) + EN/PT toggle + mute button.

**Page header row:** big **GATES** (Chakra Petch 700, 52px, letter-spacing 8px, `#F2F7FF`) + "06 DETECTED" chip; subtitle "Each project is a dungeon. Clear Gates to earn XP." On the right, a legend: ◇ UNLOCKED / 🔒 LOCKED.

**Gate card (unlocked)** — outer gradient = rank light→deep, 22/21px cut, hover lifts `translateY(-4px)`. Inner near-black fill. Contents:
- **Corner rank hexagon** (`position:absolute; top:20px; right:22px`, 58×64px) with the rank letter (Orbitron 26px, rank color) + "RANK".
- `GATE 0N` eyebrow (10px letter-spacing 3px, rank-muted).
- Title (Chakra Petch 700, 24px) with right margin 60px to clear the badge.
- One-line description (Inter 13px, muted).
- Tech tags — small square chips, `rgba(<rank>,.08)` fill, `rgba(<rank>,.3)` border, Chakra Petch 11px.
- Footer row (`margin-top:auto`): **difficulty pips** — 5 diamonds, filled = rank color, empty = `rgba(255,255,255,.1)` + **ENTER GATE ▸** button (rank gradient fill, dark text, 9px cut).

**Gate card (locked)** — dimmed. Outer gradient uses low-alpha rank colors; inner has a faint diagonal hatch `repeating-linear-gradient(45deg, transparent 0 18px, rgba(<rank>,.03) 18px 20px)`. Title/desc at ~0.7 opacity, muted rank-tinted text. Footer replaced by: a **pulsing padlock icon** (`lockpulse`, rank color) + "REACH RANK X TO UNLOCK" + a subtle "view anyway ▸" ghost link (underlined, rank-muted → brightens on hover).

**The 6 gates:**
| # | Rank | Title (EN / PT) | Description (EN) | Tags | Difficulty | State |
|---|---|---|---|---|---|---|
| 01 | E (gray) | The Awakening / O Despertar | Daily quest tracker — habits, streaks and XP for real-life goals. | React, Vite, CSS | 1/5 | Unlocked |
| 02 | D (green) | The Lesser Gate / O Portal Menor | Secure REST API with JWT auth, roles and a relational database. | Node, JWT, SQL | 2/5 | Unlocked |
| 03 | C (blue) | Integration Dungeon / Dungeon de Integração | Dashboard aggregating several external APIs into one live view. | React, TypeScript, REST | 3/5 | Unlocked |
| 04 | B (purple) | Real-Time Battlefield / Campo de Batalha em Tempo Real | Live multiplayer app powered by WebSockets and presence sync. | (Socket.io) | — | **Locked** — "REACH RANK B TO UNLOCK" |
| 05 | A (orange) | The Automated Forge / A Forja Automatizada | Report automation platform with scheduled jobs and full CI/CD. | (Cypress, CI/CD) | — | **Locked** — "REACH RANK A TO UNLOCK" |
| 06 | S (gold/red, "BOSS" tag) | The Final Boss / O Boss Final | A complete full-stack SaaS — the highest gate ever cleared. | — | — | **Locked** — "REACH RANK S TO UNLOCK" |

**Footer strip** (full width, cyan→purple chamfered border `linear-gradient(90deg,#2f7fd6,#6d5cd0 55%,#8b5cf6)`, 14/13px cut): `◆ GATES CLEARED 0 / 6` (Orbitron 22px) + a thin 6-segment XP bar (at ~2%, effectively empty) + hint "Clear unlocked Gates to rank up and open the next ones."

**Copy (PT):** GATES CLEARED=GATES LIMPOS; DETECTED=DETECTADOS; UNLOCKED=DESBLOQUEADO; LOCKED=BLOQUEADO; ENTER GATE=ENTRAR; DIFF=DIF; "REACH RANK X TO UNLOCK"="ALCANCE O RANK X PARA DESBLOQUEAR"; "view anyway"="ver mesmo assim"; subtitle "Cada projeto é uma dungeon. Limpe os Gates para ganhar XP."; footer hint "Limpe os Gates desbloqueados para subir de rank e abrir os próximos."

---

### 4. Skill Tree (`Skill Tree.dc.html`) — PURPLE-leaning
**Purpose:** The developer's skills as RPG attributes with level bars, plus earned "achievement" badges.

**Layout:** Full-viewport flex column. Header (with visitor HUD) → page header → **attributes list** (`flex:1; flex-direction:column; gap:16px` — each row `flex:1` so they stretch to fill height; INT uses `flex:1.15` to stand out) → unlocked-skills grid.

**Page header:** **SKILL TREE** (Chakra Petch 700, 48px, letter-spacing 7px) + "05 ATTRIBUTES" chip (purple) + subtitle "The Hunter's attributes." On the right: `◆ MONARCH MASTERY` marker (purple).

**Attribute panel** (horizontal, 18/17px cut, each row's border tinted from cyan (STR) shifting through blue→violet down to purple (PER), matching the blue→purple progression). Inner is a flex row `gap:26px; padding:0 30px`:
- **Hex code badge** 66×74px (70×80 for INT) — attribute code (STR/AGI/INT/VIT/PER) in Orbitron 22px, accent color, glow.
- **Name block** (fixed 260px): full name (Chakra Petch 700, 20–21px) + related tech (Inter 12px, muted; hidden ≤900px via `.attr-tech`). INT also has a gold "HIGHEST" tag.
- **Level bar** (`flex:1`): 16px tall (18px for INT), chamfered, accent gradient fill with `shine` sweep and a segmented overlay `repeating-linear-gradient(90deg, transparent 0 33px, rgba(0,0,0,.3) 33px 34px)`.
- **Score** (fixed 76px, right): Orbitron 900, 30px (34px for INT), accent color glow, + "/100" in muted.

**The 5 attributes:**
| Code | Name (EN / PT) | Tech | Level | Accent |
|---|---|---|---|---|
| STR | Back-end / Back-end | Node.js · Express · REST · SQL | **80** | cyan `#7CC4FF`/`#2F7FD6` |
| AGI | Front-end / Front-end | React · TypeScript · Styled Components | **78** | blue-violet `#93B0FF`/`#4257D6` |
| INT | Integrations & Automation / Integrações & Automação | Microsoft Graph · GLPI · TrueNAS · TOTVS | **92 (HIGHEST)** | purple→gold `#C99BFF`/`#7C3AED`, bar ends in `#F5C542` |
| VIT | Quality & DevOps / Qualidade & DevOps | Cypress · CI/CD · Git/GitLab · Postman | **75** | violet `#B09CFF`/`#6247D6` |
| PER | Data Analysis / Análise de Dados | Automated reports · performance indicators | **70** | violet `#BD9BFF`/`#7042E0` |

INT is visually the hero: taller row, brightest glow, an inner light sweep, and the only one that ends its bar in gold.

**Unlocked Skills** — heading `◇ UNLOCKED SKILLS` (gold). Grid `repeat(4,1fr); gap:16px` (2 cols ≤1000px, 1 col ≤620px). Each chip (14/13px cut, themed border) = a 42×42 chamfered icon tile (accent-tinted, with an inline SVG glyph) + title (Chakra Petch 700, 15px) + a stat subtitle (Inter 11px, muted):
| Icon | Title (EN / PT) | Subtitle (EN) | Theme |
|---|---|---|---|
| ⚡ bolt | 90% automation / 90% automação | account creation | cyan |
| 🛡 shield-check | Branch Guardian / Guardião de Branch | blocked 60% of non-compliant PRs | green |
| 🗑 trash | Artifact Purge / Expurgo de Artefatos | 100% storage reduction on GitLab | orange |
| 👁 eye | Monarch's Insight / Visão do Monarca | 100% accurate sprint report classification | gold→purple |

**Copy (PT):** ATTRIBUTES=ATRIBUTOS; "The Hunter's attributes."="Os atributos do Hunter."; MONARCH MASTERY=MAESTRIA DO MONARCA; HIGHEST=MAIOR; UNLOCKED SKILLS=HABILIDADES DESBLOQUEADAS.

---

## Interactions & Behavior
- **Language toggle** — clicking EN/PT sets `lang` state; the active segment fills accent color. All copy swaps instantly (documented above). Persist the choice (localStorage) in the real app.
- **Sound/mute toggle** — toggles a `muted` boolean; a red slash overlays the speaker icon when muted. (Wire to ambient audio in the real app.)
- **Navigation** — Boot's ACCEPT and SKIP INTRO link to the Home. Home's EXPLORE THE GATES → Gates page. Gates' ENTER GATE → individual project detail (not designed yet). Locked gates' "view anyway" → same detail, bypassing the lock.
- **Hover states** — buttons intensify their glow shadow; ghost buttons brighten border+text; gate cards lift 4px; ghost links shift to a lighter accent.
- **Animations** — see Motion tokens. Respect `prefers-reduced-motion` in production (disable scan/particle/shine loops).
- **Responsive** — Home 60/40 grid → 1 col ≤980px; Gates grid 3→2→1 col; Skill Tree hides tech sublines ≤900px and reflows the achievements grid.

## State Management (the "leveling" system — core product logic to build)
The prototypes show fixed states; the real product is meant to track visitor progress:
- **Visitor state:** `level` (start 1), `xp` (start ~40) and `xpToNext` (500), `rank` (start "E"). As the visitor navigates/interacts, award XP; on threshold, level up and advance rank E→D→C→B→A→S.
- **Derived theme:** the visitor HUD, XP bars, and Rank Path accent should **interpolate from cyan toward purple** as rank rises (the Home screen already demonstrates both endpoints). Consider a rank→color map and lerp between adjacent ranks by XP fraction.
- **Gate unlocking:** each gate has a `requiredRank`; `locked = visitorRank < requiredRank`. Locked cards render the padlock treatment; "Gates Cleared" and the footer bar reflect completed gates.
- **Quests:** an active quest with objective progress feeds XP.
- **Owner (Willian) is constant** — always S-rank Monarch, MAX; never derived from visitor state.
- Persist visitor progress in localStorage so leveling survives reloads.

## Design Tokens
All values are enumerated in the **Design Tokens** and per-screen sections above (colors, rank palette, typography, spacing, radius/chamfer, shadows, motion).

## Assets
- **Fonts:** Google Fonts — Chakra Petch, Orbitron, Inter, JetBrains Mono. No licensed/brand assets.
- **Icons:** all inline SVG (speaker, padlock, check, bolt, shield, trash, eye) — stroke-based, `stroke-width:1.8–2.4`, `currentColor`/accent. Swap for the codebase's icon set (e.g. Lucide — these match Lucide's style) if desired.
- **Imagery:** none (no photos/logos). Rank badges, glows, and grids are all CSS.
- No external images to migrate.

## Screenshots
Rendered reference images of each screen live in `screenshots/` — use these as the visual source of truth:
- `screenshots/1-boot-entrance.png` — Boot / Entrance (cyan)
- `screenshots/2-hunter-profile.png` — Home / Hunter Profile (purple)
- `screenshots/3-gates.png` — Gates / Projects grid
- `screenshots/4-skill-tree.png` — Skill Tree

## Files
In `designs/`:
- `Boot Entrance.dc.html` — screen 1 (cyan entrance).
- `Hunter Profile.dc.html` — screen 2 (purple home / dual identity).
- `Gates.dc.html` — screen 3 (projects grid).
- `Skill Tree.dc.html` — screen 4 (RPG attributes + achievements).
- `support.js` — the prototype runtime (reference only; **do not port** — it exists purely so the `.dc.html` files render in a browser).

> To view a prototype as intended, open any `.dc.html` in a browser (it loads `support.js` alongside). The logic classes are trivial (only the `lang` and `muted` toggles) — all real values are hard-coded in the markup and documented above.
