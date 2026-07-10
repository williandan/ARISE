# ⚔️ ARISE — Portfólio Full Stack de Willian Daniel

### Plano completo do projeto · Tema: Solo Leveling (experiência imersiva de "Sistema")

> *"Você adquiriu a qualificação para se tornar um Jogador. Aceita?"*

Este documento é o blueprint completo do portfólio. Ele define o **conceito de jogo**, a **arquitetura técnica**, os **projetos a construir**, o **design visual** e um **roadmap** em fases. Nada de código ainda — primeiro fechamos o plano, depois construímos.

---

## 1. Visão geral

Um portfólio onde **o visitante é o jogador**. Ao entrar, ele recebe o "Sistema" e, conforme navega pelo site, cumpre **missões**, ganha **XP** e sobe de **nível** — exatamente como o Sung Jin Woo evoluindo de E-rank a Monarca. A progressão é o fio condutor que leva o visitante a descobrir os projetos: cada projeto é um **Gate** com um rank (E → S), e os Gates mais fortes só se desbloqueiam quando o visitante atinge nível suficiente.

O foco não é a biografia do Willian — é a **experiência de subir de nível explorando o trabalho dele**. A recompensa por explorar é ver os projetos de rank mais alto.

**Princípio de ouro:** a gamificação nunca pode atrapalhar um recrutador com pressa. Todo conteúdo essencial (projetos, contato, currículo) tem que ser acessível mesmo pra quem não quer "jogar" — a camada de jogo é um bônus que engaja, não um muro.

---

## 2. O Sistema — game design da navegação

### 2.1 Loop principal

```
Entrar → Receber missão → Navegar/interagir → Ganhar XP → Janela azul de progresso
   → Subir de nível → Desbloquear Gates de rank superior → Repetir
```

### 2.2 Níveis e ranks do visitante

O visitante começa no **Nível 1 · Rank E** e evolui:

| Rank | Nível | Como chega lá | O que desbloqueia |
|------|-------|---------------|-------------------|
| **E** | 1–4 | Só de entrar | Home, projetos rank E |
| **D** | 5–9 | Explorar a Hunter Profile | Projetos rank D |
| **C** | 10–14 | Abrir 2 Gates (projetos) | Projetos rank C |
| **B** | 15–19 | Ler detalhes técnicos de um projeto | Projetos rank B |
| **A** | 20–24 | Completar a "Skill Tree" (seção de skills) | Projetos rank A |
| **S** | 25+ | Completar missões-chave do site | Projeto rank S + easter egg |

> Os números são um ponto de partida — a gente calibra pra que um visitante que "explora tudo" chegue perto de S sem grinding chato. A ideia é que **explorar o portfólio inteiro ≈ virar S-rank**.

### 2.3 Fontes de XP (ações que dão pontos)

- **Primeira visita a uma seção** (Home, Projetos, Skills, Sobre, Contato) → XP médio
- **Abrir um Gate** (entrar num projeto) → XP alto
- **Ler os detalhes técnicos** de um projeto (expandir "análise da Dungeon") → XP alto
- **Interagir com a Skill Tree** (passar/clicar nos atributos) → XP baixo, mas soma
- **Achar easter eggs** → XP bônus
- **Trocar idioma, mutar/desmutar som** → micro-XP (recompensa por explorar a UI)

### 2.4 Missões (Quests)

Duas categorias, mostradas numa **janela azul de "Quest Log"** acessível a qualquer momento:

**Missões principais (Main Quests)** — guiam o percurso:

1. *"Desperte como Jogador"* — complete a tela de entrada
2. *"Explore o primeiro Gate"* — abra um projeto
3. *"Analise uma Dungeon"* — leia os detalhes técnicos de um projeto
4. *"Domine suas habilidades"* — visite a Skill Tree
5. *"Enfrente o Boss"* — desbloqueie e abra o projeto rank S
6. *"Convoque o Hunter"* — chegue na seção de contato

**Missões secundárias (Side Quests)** — engajamento:

- *"Poliglota"* — troque o idioma
- *"Caçador silencioso / barulhento"* — mute e desmute o som
- *"Explorador"* — visite todas as seções
- *"Segredo do Monarca"* — encontre o easter egg escondido

Cada missão concluída dispara uma **notificação azul** com som e recompensa em XP.

### 2.5 Ranking de projetos (os Gates)

Cada projeto recebe um **rank de dificuldade** baseado na complexidade técnica real (não em marketing):

- **Rank E/D** — projetos menores, foco em fundamentos (CRUD, front consumindo API)
- **Rank C/B** — full-stack completo, autenticação, integração com serviços externos
- **Rank A/S** — arquitetura mais robusta: tempo real, automação, testes E2E, CI/CD

Gates de rank superior aparecem **bloqueados com cadeado** até o visitante ter nível — criando curiosidade e incentivo a explorar. (Sempre com um botão discreto "ver mesmo assim" pra não travar recrutador.)

### 2.6 Persistência

O progresso (nível, XP, missões) fica salvo em `localStorage`, então se o visitante voltar, continua de onde parou — e pode ver uma notificação *"Bem-vindo de volta, Jogador de Rank C."*

---

## 3. Arquitetura técnica

### 3.1 Stack escolhida

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Framework** | **Next.js (App Router) + React + TypeScript** | SSR/SSG pra SEO, ótimo pra animações, deploy trivial na Vercel. TS porque você já usa. |
| **Estilo** | **Tailwind CSS + CSS custom** (ou Styled Components, que você domina) | Tailwind acelera; SC é opção se preferir o que já usa. Decidimos na fase 0. |
| **Animação** | **Framer Motion** + **GSAP** (para a tela de boot) | Motion pros componentes React; GSAP pra timeline da entrada cinematográfica. |
| **Estado do jogo** | **Zustand** + `localStorage` | Store global leve pra XP/nível/missões, com persistência. |
| **Som** | **Howler.js** | Controle fácil de SFX e trilha, com toggle de mudo. |
| **i18n** | **next-intl** ou **i18next** | Toggle PT/EN. |
| **Back-end** | **Node.js (API Routes do Next ou serviço Express separado)** | Onde os projetos precisarem de back real. Para o portfólio em si, um back leve pro formulário de contato e para servir dados dos projetos. |
| **Banco (se preciso)** | **PostgreSQL** (Supabase/Neon) ou **SQLite** | Só se um projeto exigir; o portfólio pode ser majoritariamente estático + dados em JSON/MDX. |
| **Deploy** | **Vercel** | SSR nativo, HTTPS, domínio, preview por PR, grátis pra começar. |

### 3.2 Por que Next.js (e não SPA pura)

Você pediu tema **total/imersivo** *e* deixou o SEO na minha mão. Uma SPA React pura renderiza vazio pro Google. Next.js entrega HTML pronto (bom pra recrutadores acharem você) e ainda aguenta as animações pesadas. Melhor dos dois mundos.

### 3.3 Estrutura de pastas (proposta)

```
portfolio/
├── app/
│   ├── layout.tsx            # layout raiz, providers (som, i18n, game state)
│   ├── page.tsx              # Home / Hunter Profile
│   ├── gates/                # Projetos
│   │   ├── page.tsx          # lista de Gates
│   │   └── [slug]/page.tsx   # detalhe de cada projeto
│   ├── skills/page.tsx       # Skill Tree
│   ├── about/page.tsx        # Sobre o Hunter
│   └── contact/page.tsx      # Convocar o Hunter
├── components/
│   ├── system/               # UI do "Sistema" (janelas azuis, notificações, HUD)
│   ├── boot/                 # tela de entrada
│   ├── quests/               # quest log, toasts
│   └── ui/                   # botões, cards, etc.
├── store/                    # Zustand (game state)
├── lib/                      # helpers (xp, som, i18n)
├── content/                  # dados dos projetos em MDX/JSON
├── public/                   # imagens, sfx, fontes
└── messages/                 # pt.json, en.json (traduções)
```

### 3.4 HUD persistente

Um **HUD fixo** (canto da tela) mostra sempre: nível atual, barra de XP, rank e um ícone de "Quest Log". É a âncora que faz o visitante sentir que está progredindo o tempo todo.

---

## 4. Mapeamento Solo Leveling → portfólio

| Elemento do portfólio | Vira, no Sistema... |
|-----------------------|---------------------|
| Visitante | **O Jogador** (que sobe de nível) |
| Home | **Tela de Status / Hunter Profile** do Willian |
| Cada projeto | **Um Gate / Dungeon** com rank E–S |
| Seção de habilidades | **Skill Tree** (atributos e "feitiços") |
| Sobre | **História do Hunter** (sua jornada / experiência) |
| Contato | **"Convocar o Hunter"** (invocação) |
| Currículo (PDF) | **"Grimório / Registro Oficial"** — download |
| Barra de progresso | **Barra de XP** |
| Notificações do site | **Janelas azuis do Sistema** |

---

## 5. Os Gates — projetos a construir

Você ainda vai construir os projetos, então aqui vai uma **grade curada** que (a) mostra full-stack React + Node de verdade, (b) usa suas forças reais do CV — automação, integrações, testes, CI/CD — e (c) encaixa lindo nos ranks. Sugiro construir de baixo pra cima.

### 🟢 Gate Rank E — "O Despertar" · *Daily Quest Tracker*
Um app de tarefas gamificado (meta-piada com o próprio tema): tarefas dão XP, o usuário sobe de nível. **Front:** React + estado local. **Objetivo:** fundamentos de UI e estado. Rápido de fazer, serve de aquecimento e casa com o tema.

### 🔵 Gate Rank D — "O Portal Menor" · *API REST + CRUD com autenticação*
Uma API Node (Express) com JWT, CRUD completo e um front React consumindo. **Mostra:** REST, auth, SQL — o feijão-com-arroz que todo recrutador full-stack quer ver. Você já tem essa base do trabalho na RCS.

### 🟣 Gate Rank C — "A Dungeon de Integração" · *Dashboard agregador de APIs externas*
Um painel que consome várias APIs públicas (ou simula integrações estilo Microsoft Graph/GLPI) e mostra dados unificados. **Sua praia** — foi literalmente seu trabalho na RCS. Destaca sua força em integrações.

### 🟠 Gate Rank B — "O Campo de Batalha em Tempo Real" · *App com WebSockets*
Chat, dashboard ao vivo ou colaboração em tempo real (Socket.io). **Mostra:** arquitetura real-time, algo que poucos juniors têm no portfólio.

### 🔴 Gate Rank A — "A Forja Automatizada" · *Plataforma de automação de relatórios*
Ferramenta que ingere dados, gera relatórios automáticos e os agenda — espelhando seu trabalho de automação de relatórios de sprint na RCS. **Com testes (Cypress) e pipeline de CI/CD**, que você já domina. Este é seu diferencial mais forte.

### ⚫ Gate Rank S — "O Boss Final" · *Projeto-carro-chefe full-stack completo*
Um SaaS pequeno mas completo: auth, banco, back Node robusto, front polido, testes E2E, CI/CD, deploy. Tema livre (ex.: gestor de "guildas"/times, ou uma ferramenta útil de verdade). **É o projeto que "prova" que você é full-stack.** Só desbloqueia quando o visitante chega em rank S.

> Não precisa fazer todos de uma vez. Comece com 3 (E, D, C) pra ter o portfólio no ar, e vá adicionando Gates. Cada projeto novo = conteúdo novo, sem tocar na engine do site.

---

## 6. A Skill Tree — atributos do Hunter (baseados no seu CV)

Traduzindo seu currículo real para "atributos" estilo status window:

**Atributos principais**

- **STR (Back-end)** — Node.js, Express, APIs REST, SQL
- **AGI (Front-end)** — React, TypeScript, JavaScript, Styled Components
- **INT (Integrações & Automação)** — Microsoft Graph, TrueNAS, GLPI, TOTVS, Skymail, automação de processos *(seu atributo mais alto)*
- **VIT (Qualidade & DevOps)** — Cypress, testes de integração, CI/CD, Git/GitLab, Postman
- **PER (Análise de dados)** — relatórios automatizados, indicadores de performance

**Feitiços / habilidades desbloqueadas (highlights reais do CV)**

- ⚡ *"Redução de 90%"* — automação de criação de contas (Skymail/AD)
- 🛡️ *"Guardião da Branch"* — bloqueou 60% dos PRs fora de conformidade via testes de integração
- 🗑️ *"Purga de Artefatos"* — 100% de redução de armazenamento no GitLab
- 📊 *"Visão do Monarca"* — relatórios de sprint com 100% de precisão de classificação

**Formação (lore do Hunter)**

- Bacharelado em Engenharia de Software — Universidade Católica de Brasília (2025–2028)
- Full Stack — Cubos Academy (2023)

Cada atributo pode ter uma barra de "nível" e, ao passar o mouse, mostra a janela azul com os detalhes/feitiços.

---

## 7. Design system visual

### 7.1 Paleta (a "System UI" do Solo Leveling)

- **Fundo:** preto/azul-noite muito escuro (`#05060A` → `#0A0E1A`)
- **Azul do Sistema (primária):** ciano elétrico brilhante (`#4EA8FF` / `#38BDF8`) com **glow**
- **Roxo Monarca (secundária):** `#8B5CF6` → `#6D28D9` (para rank S / poder sombrio)
- **Acentos de rank:** E cinza, D verde, C azul, B roxo, A laranja, S vermelho/dourado
- **Texto:** branco levemente azulado, com destaques em ciano
- **Efeitos:** bordas com glow, partículas sutis, scanlines leves, "vidro" (glassmorphism) nas janelas

### 7.2 Tipografia

- **Títulos / UI do Sistema:** fonte geométrica com cara de interface sci-fi (ex.: *Rajdhani*, *Orbitron* ou *Chakra Petch*)
- **Corpo:** fonte legível e neutra (ex.: *Inter*) — legibilidade acima de tudo no texto real
- Idealmente uma fonte que suporte PT e EN sem quebrar acentuação

### 7.3 Componentes-assinatura

- **Janela azul do Sistema** — o card icônico: borda ciano com glow, cantos chanfrados, título em caps, animação de "abrir"
- **Notificação/toast** — desliza com som *ding*, ex.: `[Missão concluída: Explore o primeiro Gate · +50 XP]`
- **Barra de XP** — no HUD, anima ao ganhar pontos
- **Card de Gate** — mostra rank, "dificuldade", stack usada; bloqueado com cadeado se rank alto
- **Tela de boot** — a experiência de entrada (ver seção 8)

### 7.4 Acessibilidade e desempenho

- **Respeitar `prefers-reduced-motion`** — quem tem sensibilidade a movimento vê versão calma
- **Toggle de som** sempre visível; som começa **mudo** por padrão (nunca autoplay barulhento)
- **Modo "pular intro"** pra visitantes recorrentes / recrutadores apressados
- Animações otimizadas (transform/opacity), lazy-load de assets pesados

---

## 8. A tela de entrada (boot do Sistema)

Sequência curta (3–5s, **pulável**):

1. Tela preta, um som grave
2. Texto digitando: *"Detectando qualificação do visitante..."*
3. Janela azul clássica: **"Você adquiriu a qualificação para se tornar um Jogador. Aceita? [Sim] [Não]"**
4. Ao aceitar → flash de luz, som de level-up, HUD aparece, primeira Main Quest dispara
5. (Se "Não" ou pular → entra direto no modo normal, sem jogo — respeitando quem tem pressa)

---

## 9. Bilíngue (PT / EN)

- Toggle **PT ⇄ EN** no HUD/header (a Side Quest "Poliglota")
- Todo texto vem de arquivos de tradução (`messages/pt.json`, `messages/en.json`) — nada hardcoded
- Inclui os textos do jogo (missões, notificações) e o conteúdo real (projetos, sobre)
- Detecta idioma do navegador na primeira visita, mas deixa o visitante trocar

---

## 10. SEO, performance e deploy

- **SSG/SSR do Next** para páginas indexáveis (Home, cada Gate)
- **Metadados** por página (Open Graph, título, descrição) — importante pro LinkedIn renderizar bonito quando você compartilhar
- **Sitemap + robots.txt**
- **Domínio próprio** (ex.: `williandaniel.dev`) apontando pra Vercel
- **Lighthouse** como meta de qualidade (performance, acessibilidade, SEO)
- **Analytics** simples (Vercel Analytics ou Plausible) pra ver quantos visitantes "chegam a rank S"

---

## 11. Roadmap em fases

**Fase 0 — Fundação (setup)**
Criar repo, Next + TS, Tailwind/SC, ESLint/Prettier, deploy inicial "hello world" na Vercel. Decidir Tailwind vs Styled Components.

**Fase 1 — A Engine do Sistema**
Store Zustand (XP/nível/rank/missões) + persistência. HUD com barra de XP. Sistema de notificações (janelas azuis) e som (Howler). É o coração — feito uma vez, alimenta tudo.

**Fase 2 — Esqueleto das páginas + conteúdo**
Home/Hunter Profile, lista de Gates, Skill Tree, Sobre, Contato — com conteúdo real do CV. Sem os projetos ainda; usa placeholders de Gate.

**Fase 3 — Camada de jogo**
Missões conectadas à navegação, desbloqueio de Gates por nível, tela de boot, easter egg. Aqui o site "vira jogo".

**Fase 4 — i18n + polish visual**
Toggle PT/EN, animações finais, glow/partículas, `prefers-reduced-motion`, modo pular intro.

**Fase 5 — Os Gates (projetos)**
Construir os projetos reais (E → S) e plugá-los como Gates. Feito de forma incremental, sem mexer na engine.

**Fase 6 — SEO, performance, lançamento**
Metadados, sitemap, domínio, Lighthouse, analytics. Publicar e compartilhar no LinkedIn/GitHub.

> Ordem sugerida pra ter algo **no ar rápido**: Fases 0→1→2 já entregam um portfólio funcional e temático. As fases 3+ adicionam a mágica sem bloquear o lançamento.

---

## 12. Decisões ainda em aberto (pra próxima conversa)

1. **Tailwind vs Styled Components** — SC é o que você já usa; Tailwind é mais rápido pra prototipar. Recomendo Tailwind, mas é sua chamada.
2. **Nome/domínio** do portfólio (ex.: `williandaniel.dev`, ou um nome temático).
3. **Quantos Gates no lançamento** — sugiro 3 (E, D, C) pra estrear.
4. **Tema do projeto rank S** — o carro-chefe. Vale pensar em algo que você usaria de verdade.
5. **Trilha sonora** — precisamos de SFX/música livres de direitos (tem opções gratuitas).

---

## 13. Próximo passo imediato

Quando você aprovar este plano, o caminho natural é:

> **Eu monto um protótipo visual da Home (Hunter Profile) + a tela de boot + uma janela azul funcional**, pra você *sentir* a experiência antes de investirmos nas 6 fases. É a melhor forma de validar o tom visual cedo.

*"Fico mais forte a cada dungeon. — E assim começa a subida de rank."*
