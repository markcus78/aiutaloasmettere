# Aiutalo a Smettere — sito

Landing + quiz del programma **Aiutalo a Smettere** di [Wellness Town](https://wellnesstown.it).

🌐 **Live**: https://aiutaloasmettere.wellnesstown.it

## Stack

- Vite 5 + React 18 + TypeScript
- React Router (BrowserRouter) — rotte: `/`, `/quiz`, `/grazie`
- TailwindCSS + shadcn/ui
- Form submission via Zapier webhook
- Hosting: GitHub Pages (deploy automatico via GitHub Actions)
- Tracking: Meta Pixel (`PageView` + `Lead`)

## Comandi

```bash
npm install     # install dependencies
npm run dev     # dev server su http://localhost:8080
npm run build   # build di produzione in dist/
npm run preview # serve il dist/ localmente
```

## Struttura

- `src/pages/Index.tsx` — landing page (homepage)
- `src/pages/Quiz.tsx` — quiz "Che divanizzato sei?"
- `src/pages/Grazie.tsx` — thank-you post-candidatura
- `src/components/ApplicationForm.tsx` — form unico riusato da landing e quiz
- `src/components/landing/` — sezioni della landing (Hero, WhatItIs, Filter, Phases, Value, Testimonials, About, Faq, FormSection)
- `public/` — asset statici (foto, logo, favicon, CNAME, 404.html)

## Deploy

Push sul branch `main` → GitHub Actions builda → deploy su GitHub Pages → live in ~1-2 minuti.

Workflow: `.github/workflows/deploy.yml`.
