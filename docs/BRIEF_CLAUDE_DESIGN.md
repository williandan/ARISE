# Brief para o Claude Design — Portfólio "ARISE" (tema Solo Leveling)

> Como usar: abra o Claude Design, cole o bloco **PROMPT PRINCIPAL** abaixo. Depois refine com os prompts extras de cada tela. As instruções de UI já estão prontas; ajuste o que quiser.

---

## PROMPT PRINCIPAL (cole isto primeiro)

```
Design an immersive developer portfolio website inspired by the "System" UI from the anime/manhwa Solo Leveling. This is a full-stack developer's portfolio (name: Willian Daniel) where the VISITOR is the player: they gain XP and level up by navigating the site, unlocking higher-ranked "Gates" (projects) as they progress.

VISUAL STYLE:
- Dark, cinematic sci-fi "System" interface. Deep near-black navy background (#05060A to #0A0E1A).
- Primary accent: electric cyan-blue (#4EA8FF / #38BDF8) with a soft glow, like the classic Solo Leveling blue notification windows.
- Secondary accent: monarch purple (#8B5CF6 to #6D28D9) for the highest "S-rank" elements.
- Rank accent colors: E=gray, D=green, C=blue, B=purple, A=orange, S=red/gold.
- UI panels look like holographic "System windows": glowing cyan borders, subtle glassmorphism, chamfered/angular corners, faint scanlines and particles.
- Typography: geometric sci-fi display font (like Rajdhani, Orbitron, or Chakra Petch) for titles and UI; clean readable font (like Inter) for body text.
- Bilingual UI (Portuguese/English) with a language toggle in the header.

KEY SCREENS TO DESIGN:
1. Boot/entrance screen — a black screen with a glowing blue System window that reads "You have acquired the qualification to become a Player. Accept? [Yes] [No]", with a "skip intro" option.
2. Home / "Hunter Profile" — a status-window style hero with the developer's name, level, rank badge, and an XP progress bar. Persistent HUD in a corner showing level, XP bar, current rank, and a "Quest Log" button.
3. Gates (Projects) grid — cards styled as dungeon gates, each showing a rank badge (E–S) and difficulty; high-rank cards appear locked with a padlock until the visitor levels up.
4. Skill Tree — the developer's skills shown as RPG-style attributes (STR, AGI, INT, VIT, PER) with level bars.

TONE: powerful, mysterious, game-like — but still clean and usable for a recruiter in a hurry. Never sacrifice readability for effect.
```

---

## Prompt — Tela 1: Boot / Entrada

```
Design the entrance "boot" screen. Full black background. A single glowing cyan System window appears centered with an angular border and soft glow. Inside, monospace-style text as if typed:
Line 1 (small, muted): "Detecting visitor qualification..."
Line 2 (title): the classic blue-window message.
Two buttons: a bright cyan "Yes / Sim" and a dimmer "No / Não". Below, a small "Skip intro / Pular" link.
Add faint floating particles and a subtle vignette. Show both a Portuguese and an English version of the text.
```

Textos de UI (PT / EN):
- Título: **"Você adquiriu a qualificação para se tornar um Jogador. Aceita?"** / *"You have acquired the qualification to become a Player. Accept?"*
- Botões: **Sim** / **Yes** · **Não** / **No**
- Link: **Pular intro** / **Skip intro**

---

## Prompt — Tela 2: Home / Hunter Profile

```
Design the home screen as a "Hunter Profile" status window. Large hero area with:
- The name "WILLIAN DANIEL" in the sci-fi display font.
- A subtitle role: "Full Stack Developer".
- A rank badge (start at "E-RANK") with a colored glow.
- A large horizontal XP progress bar labeled "LEVEL 1", partly filled, with glow.
- A short tagline in a blue System window.
Include a persistent HUD pinned to the top-right corner: small level number, thin XP bar, rank letter, and a "Quest Log" icon button.
Include a header with a PT/EN language toggle and a mute/sound toggle.
Keep it dark, cinematic, with cyan glow accents. Show a version where the visitor has leveled up to C-RANK to demonstrate the progression state.
```

Textos de UI (PT / EN):
- Cargo: **Desenvolvedor Full Stack** / **Full Stack Developer**
- HUD: **Nível** / **Level** · **Missões** / **Quests**
- CTA: **Explorar os Gates** / **Explore the Gates**

---

## Prompt — Tela 3: Gates (grade de projetos)

```
Design a grid of project cards styled as "dungeon gates". Each card is a glowing angular panel showing:
- A large rank badge in the corner (E, D, C, B, A, or S) using rank colors (E=gray, D=green, C=blue, B=purple, A=orange, S=red/gold).
- The project title and a one-line description.
- A "difficulty" indicator and small tech-stack tags (React, Node, TypeScript, etc.).
- High-rank cards (A and S) shown as LOCKED: darkened, with a glowing padlock icon and text "Reach Rank A to unlock", plus a small "view anyway" link.
Arrange 6 cards. Show the visual difference between unlocked and locked gates clearly.
```

Exemplos de Gates (usar como conteúdo dos cards):
- **E — O Despertar** / *The Awakening* · Daily Quest Tracker (React)
- **D — O Portal Menor** / *The Lesser Gate* · REST API + Auth (Node, JWT, SQL)
- **C — A Dungeon de Integração** / *Integration Dungeon* · API aggregator dashboard
- **B — Campo de Batalha em Tempo Real** / *Real-Time Battlefield* · WebSockets app
- **A — A Forja Automatizada** / *The Automated Forge* · Report automation platform (locked)
- **S — O Boss Final** / *The Final Boss* · Full-stack SaaS (locked)

---

## Prompt — Tela 4: Skill Tree

```
Design a "Skill Tree" screen showing the developer's skills as RPG attributes. Five main attribute rows, each with a name, an icon, and a glowing level bar:
- STR (Back-end): Node.js, Express, REST, SQL
- AGI (Front-end): React, TypeScript, Styled Components
- INT (Integrations & Automation): highest bar — Microsoft Graph, GLPI, automation
- VIT (Quality & DevOps): Cypress, CI/CD, Git
- PER (Data Analysis): automated reports
Below, a row of "unlocked skill" badges with icons (e.g., "90% automation", "Branch Guardian"). Dark theme, cyan glow, System-window framing.
```

---

## Dica de handoff
Quando o visual estiver aprovado no Claude Design, use o recurso de **handoff pro Claude Code** pra gerar o projeto Next.js + React seguindo o `Plano_Portfolio_Solo_Leveling.md`. Assim fecha o ciclo: design → protótipo → código.
