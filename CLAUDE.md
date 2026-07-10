# CLAUDE.md — ARISE Portfolio

Contexto do projeto para o Claude (Claude Code / Cowork) em sessões futuras. Leia este arquivo antes de começar qualquer tarefa.

## O que é

Portfólio de desenvolvedor full-stack do **Willian Daniel**, com tema visual e de interação baseado em **Solo Leveling**. O diferencial: **o visitante é o jogador**. Conforme ele navega pelo site, cumpre missões, ganha XP e sobe de nível/rank (E → S), desbloqueando os "Gates" (projetos) de rank mais alto. A progressão é o fio condutor que leva o visitante a descobrir os projetos.

Regra de ouro: a gamificação nunca pode atrapalhar um recrutador com pressa. Todo conteúdo essencial (projetos, contato, currículo) deve ser acessível mesmo sem "jogar". A camada de jogo é um bônus, não um muro.

## Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Estilo:** Tailwind CSS (decisão preliminar; Styled Components é alternativa que o Willian já domina)
- **Animação:** Framer Motion + GSAP (timeline da tela de boot)
- **Estado do jogo:** Zustand + persistência em `localStorage`
- **Som:** Howler.js (SFX + trilha, começa mudo, com toggle)
- **i18n:** next-intl ou i18next — site bilíngue PT/EN
- **Back-end:** Node.js (API Routes do Next ou serviço Express) onde necessário
- **Deploy:** Vercel

## Conceito do "Sistema" (game design)

- Loop: entrar → receber missão → navegar → ganhar XP → janela azul de progresso → subir de nível → desbloquear Gates superiores.
- Ranks do visitante: E (nível 1–4) → D → C → B → A → S (nível 25+).
- XP vem de: visitar seções, abrir Gates (projetos), ler detalhes técnicos, interagir com a Skill Tree, achar easter eggs.
- HUD persistente: nível, barra de XP, rank, botão de Quest Log.
- Missões principais guiam o percurso; missões secundárias (trocar idioma, mutar som, etc.) engajam.
- Progresso salvo em `localStorage` (volta de onde parou).

## Mapeamento Solo Leveling → portfólio

| Portfólio | Sistema |
|-----------|---------|
| Visitante | O Jogador (sobe de nível) |
| Home | Tela de Status / Hunter Profile |
| Cada projeto | Um Gate / Dungeon (rank E–S) |
| Seção de skills | Skill Tree (atributos STR/AGI/INT/VIT/PER) |
| Sobre | História do Hunter |
| Contato | "Convocar o Hunter" |
| Currículo (PDF) | Grimório / Registro Oficial (download) |

## Os Gates (projetos a construir)

Construir de baixo pra cima; começar o lançamento com 3 (E, D, C).

- **E — O Despertar:** Daily Quest Tracker (React, estado local)
- **D — O Portal Menor:** API REST + CRUD com JWT (Node, SQL) + front React
- **C — A Dungeon de Integração:** dashboard agregador de APIs externas (a praia do Willian)
- **B — Campo de Batalha em Tempo Real:** app com WebSockets (Socket.io)
- **A — A Forja Automatizada:** plataforma de automação de relatórios + Cypress + CI/CD
- **S — O Boss Final:** SaaS full-stack completo (auth, banco, testes E2E, CI/CD)

## Skill Tree (baseada no CV real)

- **STR (Back-end):** Node.js, Express, REST, SQL
- **AGI (Front-end):** React, TypeScript, Styled Components
- **INT (Integrações & Automação):** Microsoft Graph, TrueNAS, GLPI, TOTVS, Skymail — atributo mais alto
- **VIT (Qualidade & DevOps):** Cypress, testes de integração, CI/CD, Git/GitLab, Postman
- **PER (Análise de dados):** relatórios automatizados, indicadores de performance

## Design system

- Fundo: preto/azul-noite (#05060A → #0A0E1A)
- Primária: ciano elétrico (#4EA8FF / #38BDF8) com glow (janelas azuis do Sistema)
- Secundária: roxo Monarca (#8B5CF6 → #6D28D9) para rank S
- Ranks: E=cinza, D=verde, C=azul, B=roxo, A=laranja, S=vermelho/dourado
- Tipografia: display sci-fi (Rajdhani/Orbitron/Chakra Petch) + corpo legível (Inter)
- Acessibilidade: respeitar `prefers-reduced-motion`; som mudo por padrão; modo "pular intro".

## Roadmap (fases)

0. Fundação: setup Next+TS+Tailwind, ESLint/Prettier, deploy inicial na Vercel.
1. Engine do Sistema: store Zustand (XP/nível/rank/missões) + HUD + notificações + som.
2. Esqueleto das páginas + conteúdo real do CV.
3. Camada de jogo: missões ligadas à navegação, desbloqueio de Gates, tela de boot, easter egg.
4. i18n PT/EN + polish visual.
5. Construir os Gates (projetos) de forma incremental.
6. SEO, performance, domínio, analytics, lançamento.

## Documentos de referência

- `docs/PLANO.md` — plano completo do projeto.
- `docs/BRIEF_CLAUDE_DESIGN.md` — brief para gerar o visual no Claude Design.

## Convenções

- Textos de UI nunca hardcoded — sempre via arquivos de tradução (`messages/pt.json`, `messages/en.json`).
- Commits em português, claros e pequenos.
- Priorizar legibilidade e performance sobre efeito visual.
