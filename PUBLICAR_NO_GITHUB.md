# Como publicar no GitHub

Os arquivos do projeto estão nesta pasta (`arise-portfolio/`). Siga um dos caminhos abaixo no seu computador, dentro desta pasta.

## Opção A — com GitHub CLI (mais rápido)

Requer o [`gh`](https://cli.github.com/) instalado e logado (`gh auth login`).

```bash
cd arise-portfolio
git init
git add -A
git commit -m "Estrutura inicial: plano, brief e contexto do projeto ARISE"
git branch -M main
gh repo create arise-portfolio --public --source=. --remote=origin --push
```

Pronto — o repositório é criado e o push é feito de uma vez.

## Opção B — manual

1. Crie um repositório vazio em https://github.com/new
   - Nome sugerido: `arise-portfolio`
   - **Não** marque "Add a README" (já temos um).
2. No seu computador, dentro da pasta:

```bash
cd arise-portfolio
git init
git add -A
git commit -m "Estrutura inicial: plano, brief e contexto do projeto ARISE"
git branch -M main
git remote add origin https://github.com/williandan/arise-portfolio.git
git push -u origin main
```

## O que já está incluído

- `CLAUDE.md` — contexto do projeto para o Claude em sessões futuras
- `README.md` — apresentação do repositório
- `.gitignore` — configurado para Next.js/Node
- `docs/PLANO.md` — plano completo do projeto
- `docs/BRIEF_CLAUDE_DESIGN.md` — brief para gerar o visual no Claude Design
