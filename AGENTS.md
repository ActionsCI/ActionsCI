# AGENTS.md — ActionsCI Website

## Project Overview

This is the product website for ActionsCI — a GitHub organization that publishes reusable GitHub Actions workflows, scaffold repos, and standalone actions. The site is a React + Vite SPA deployed on Vercel at **actionsci.com**.

The site's job is to accurately represent the ActionsCI product to developers. Every word on it is deliberate. Treat copy with the same care you would treat API design.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React + Vite | 18 / 5 |
| Routing | react-router-dom | v6 |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | v11 |
| Icons | lucide-react | ^0.400.0 |
| Fonts | Inter + JetBrains Mono | via Google Fonts |
| Deployment | Vercel | SPA (vercel.json rewrite) |

## Repo Structure

```
ActionsCI/
├── AGENTS.md                  # You are here. Golden rules and org-wide conventions.
├── CONTRIBUTING.md            # Branch strategy and dev setup
├── SPEC.md                    # Fill this out before starting a new feature session
├── index.html                 # Entry point — meta tags, font preloads, theme-init script
├── vercel.json                # SPA rewrite + asset cache headers. Do not remove.
├── vite.config.js             # Vite + Tailwind plugin config
├── package.json
├── public/                    # Static assets served as-is
│   ├── favicon.svg
│   └── og-image.svg
├── src/
│   ├── main.jsx               # React root — BrowserRouter mount
│   ├── App.jsx                # Route definitions (AnimatePresence + Routes)
│   ├── components/            # Shared UI components
│   │   └── AGENTS.md
│   ├── pages/                 # One file per route
│   │   └── AGENTS.md
│   ├── styles/
│   │   ├── globals.css        # CSS variables, base styles, theme system
│   │   └── AGENTS.md
│   └── hooks/                 # Custom React hooks (currently unused)
└── .github/
    └── workflows/
        ├── version-incrementor.yaml
        └── AGENTS.md
```

---

## GOLDEN RULES

**These rules are non-negotiable. Do not break them without an explicit instruction from the repo owner.**

1. **No pricing page.** ActionsCI is open source. There is no pricing. Do not add a `/pricing` route, a pricing section, or any mention of paid tiers. If a spec asks for it, stop and confirm with the operator.

2. **No placeholder or lorem ipsum copy.** Every sentence on the site describes a real thing ActionsCI does. If you don't have real copy, ask — don't fill in placeholder text.

3. **Dark mode is the default.** The `<html>` element ships with `data-theme="dark"`. The theme-init script in `index.html` handles first-visit preference. Do not change the default to light.

4. **Never hardcode colors.** All colors must use CSS custom properties — `var(--bg)`, `var(--accent)`, `var(--text-muted)`, etc. Hardcoded hex values in JSX or CSS will be rejected. The full palette lives in `src/styles/globals.css`.

5. **No `@main` or mutable refs in workflow `uses:` examples.** The site's own content argues for SHA pinning. Never show `uses: ActionsCI/...@main` in an example — it contradicts the product's philosophy. Omit the ref or use a pinned SHA.

6. **Clone, not fork.** Scaffold repos are OSS. Users clone them to start their own projects. Forking implies contributing back to the scaffold repo itself. All copy should say "clone."

7. **No external syntax highlighting library.** `CodeBlock.jsx` handles YAML highlighting with CSS-only token coloring. Do not add `prism`, `highlight.js`, `shiki`, or any equivalent. If the existing tokenizer doesn't cover a new language, extend it inline.

8. **Routes are fixed: `/`, `/workflows`, `/scaffolds`, `/docs`.** Do not add, rename, or remove routes without an explicit change to this file by the repo owner. `App.jsx` defines the route map; changes there must be intentional.

9. **All external GitHub links must use `target="_blank" rel="noopener noreferrer"`.** No exceptions. All links to `github.com/ActionsCI/*` are external.

10. **Framer Motion only for animation.** Use `whileInView`, `once: true`, `duration: 0.4`. No CSS `@keyframes` for reveal animations. No gratuitous bounce or spin — the site is for engineers, not a marketing landing page.

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `staging` | Auto-deploys to Vercel preview |
| `main` | Production — triggers version-incrementor on merge |

Always branch from `staging`. Open PRs to `staging`. When `staging` is QA'd, open `staging → main` for production release.

## Conventions

### JSX / React
- Functional components only. No class components.
- Component files are `PascalCase.jsx`. Hook files are `camelCase.js`.
- Props are destructured in the function signature.
- No prop-types. TypeScript is not used — keep it plain JSX.
- Inline styles are used alongside Tailwind for dynamic CSS variable values (e.g. `style={{ color: 'var(--accent)' }}`). This is intentional — Tailwind v4 doesn't have full CSS-variable-aware utilities for all properties.

### Copy / Content
- Headings use Inter weight 600–700.
- Code identifiers (file names, workflow names, YAML keys) must be wrapped in `<code>` or the `CodeBlock` component — never plain text.
- GitHub org links follow this exact format: `https://github.com/ActionsCI/<repo-name>`

### Imports
Maintain this order, separated by blank lines:
1. React / framework imports
2. Third-party packages (framer-motion, lucide-react, react-router-dom)
3. Local components (`../components/...`)
4. Local pages (`../pages/...`)
5. Styles / assets

## Common Mistakes Agents Make

1. **Adding `@main` to a `uses:` example.** The SHA-pinning section explicitly calls this out as bad practice. Don't do it.
2. **Hardcoding `#00ff88` or any hex color.** All colors are CSS variables. Check `globals.css`.
3. **Creating a new page without adding a `<Route>` in `App.jsx`.** Both the file and the route entry are required.
4. **Using `fork` instead of `clone` in scaffold copy.** See golden rule 6.
5. **Adding a `console.log` and leaving it in.** Remove all debug logging before committing.
6. **Wrapping an entire page in a single `<motion.div>`.** Use `SectionReveal` per section for staggered, performant scroll reveals.
7. **Importing from a deleted component.** `Terminal.jsx`, `PricingCard.jsx`, `FeatureCard.jsx` are gone. Don't reference them.

## Agent Escalation — When to Stop and Ask

Pause and flag to the operator when:

- A task requires adding a new route not in the fixed list
- A task requires a pricing, login, or subscription UI
- A task changes the color system or removes dark-mode support
- A task requires a new npm dependency beyond the existing stack
- The scope has grown beyond what the spec describes
- This AGENTS.md appears to conflict with a task instruction — the operator may need to update it
