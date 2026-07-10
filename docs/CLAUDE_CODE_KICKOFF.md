# Arranque no Claude Code — ARISE

Guia para iniciar a construção do portfólio com o **Claude Code**, rodando na pasta do projeto (`ARISE/`). Leia antes o `CLAUDE.md` (raiz) e o `docs/PLANO.md`.

## Antes de começar

1. Abra o terminal na pasta `ARISE/` e rode `claude` (Claude Code).
2. Garanta que Node.js LTS está instalado (`node -v`).
3. O Claude Code vai ler o `CLAUDE.md` automaticamente — ele já tem todo o contexto do projeto e a decisão dos dois papéis (dono = Monarca S-rank fixo; visitante = HUD que sobe de E→S).

## Referência visual

As 4 telas foram desenhadas no Claude Design (Home, Boot, Gates, Skill Tree). Para o Claude Code reproduzir o visual com fidelidade, faça UMA das opções:

- **Exportar do Claude Design:** use o handoff/export (HTML ou imagens) e salve em `docs/design/`. Assim o Claude Code tem a referência exata de layout.
- **Ou** guie pelos specs de cor/tipografia no `CLAUDE.md` (seção "Design system") e pelos prompts em `docs/BRIEF_CLAUDE_DESIGN.md`, que descrevem cada tela.

> Dica: colar um print de cada tela na conversa do Claude Code ajuda muito a bater o pixel.

## Prompt inicial (cole no Claude Code)

```
Leia o CLAUDE.md e o docs/PLANO.md deste repositório antes de tudo. Vamos começar a Fase 0 e a Fase 1 do roadmap.

Contexto: portfólio full-stack com tema Solo Leveling, onde o VISITANTE é o jogador que sobe de nível navegando. O dono (Willian) é o Monarca S-rank fixo; o visitante começa em E-rank/nível 1 e vive no HUD persistente (azul → roxo conforme sobe). Já temos o design de 4 telas aprovado (Home/Hunter Profile, Boot, Gates, Skill Tree).

FASE 0 — Fundação:
1. Crie um projeto Next.js (App Router) + TypeScript + Tailwind CSS na raiz deste repo (sem apagar os arquivos existentes: CLAUDE.md, README.md, docs/, .gitignore).
2. Configure ESLint + Prettier.
3. Configure next-intl (ou i18next) para PT/EN, com arquivos messages/pt.json e messages/en.json. Nenhum texto de UI hardcoded.
4. Adicione as fontes: display sci-fi (Rajdhani/Orbitron/Chakra Petch) + corpo (Inter).
5. Defina no Tailwind os tokens de cor do design system (fundo #05060A/#0A0E1A, ciano #38BDF8, roxo #6D28D9/#8B5CF6, cores de rank E–S) e utilidades de "glow".
6. Deixe rodando em dev e confirme o build.

FASE 1 — Engine do Sistema:
1. Crie a store Zustand do estado do jogo (nível, XP, rank do visitante, missões concluídas), com persistência em localStorage.
2. Implemente o HUD persistente (nível, barra de XP, rank, botão Quest Log) — começa em E-rank/nível 1, cor azul, migrando pra roxo conforme o XP sobe.
3. Sistema de notificações "janela azul" (toast de missão/level-up).
4. Integração de som com Howler.js (SFX de notificação/level-up + toggle mudo, começa mudo).
5. Respeite prefers-reduced-motion e ofereça "pular intro".

Trabalhe em commits pequenos e em português. Comece pela Fase 0, me mostrando os comandos antes de rodar. Ao terminar cada fase, valide com build/lint.
```

## Ordem sugerida depois

- Fase 2: esqueleto das páginas (Home, Gates, Skill Tree, Sobre, Contato) com o conteúdo real do CV.
- Fase 3: camada de jogo (missões ligadas à navegação, desbloqueio de Gates, tela de boot, easter egg).
- Fase 4: i18n completo + polish visual.
- Fase 5: construir os Gates (projetos) — começar por E, D, C.
- Fase 6: SEO, performance, domínio, analytics, lançamento.

## Lembretes de convenção

- Textos de UI sempre via arquivos de tradução (nunca hardcoded).
- Commits em português, claros e pequenos.
- Legibilidade e performance acima do efeito visual.
- Nunca confundir os dois papéis: dono = Monarca S fixo; visitante = HUD que sobe.
