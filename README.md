# ActionsCI — Ship product, not pipelines.

A library of reusable GitHub Actions workflows for AI-powered teams. One config file. One command. Deployed.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Build
npm run build

# 3. Deploy preview
vercel

# 4. Deploy production
vercel --prod
```

Environment variables: none required for static site. Add `VITE_` prefix for any future API keys.

## Stack

- React 18 + Vite 5
- Tailwind CSS v4
- Framer Motion
- React Router v6
- Lucide React icons
