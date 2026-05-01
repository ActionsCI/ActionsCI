# AGENTS.md — src/pages/

## Purpose

One file per client-side route. Pages compose shared components and define all page-specific content (copy, data arrays, code snippets). They do not contain reusable logic — extract that to `components/` or `hooks/`.

## Current Pages

| File | Route | Description |
|---|---|---|
| `Home.jsx` | `/` | Landing page — hero, how-it-works, workflow table, AGENTS.md section, scaffolds, SHA pinning, DevOps principles |
| `Workflows.jsx` | `/workflows` | Sticky sidebar + WorkflowCard for all 10 reusable workflows |
| `Scaffolds.jsx` | `/scaffolds` | AGENTS.md hierarchy, SPEC.md pattern, scaffold cards, how-to-use steps |
| `Docs.jsx` | `/docs` | 5-step getting-started guide with sidebar TOC |

## Fixed Route List

The four routes above are the complete set. Do not add a new page file without:
1. An explicit instruction from the repo owner
2. A corresponding `<Route>` entry in `App.jsx`
3. A nav link in `Nav.jsx` (if user-facing)
4. An update to the table above

**Specifically prohibited:** pricing page, blog, login/auth pages, changelog page.

## Rules

1. **Copy is sacred.** All user-visible text on these pages describes real ActionsCI functionality. Do not paraphrase, summarize, or substitute placeholder text. If the correct copy isn't available, stop and ask.

2. **Code examples must be accurate.** YAML snippets shown on the site are what users will copy. Ensure:
   - No `@main` or other mutable refs in `uses:` lines
   - `cicd.yaml` structure matches what `reusable-workflows` actually expects
   - File path labels (the `filename` prop on `CodeBlock`) match real paths

3. **Content arrays (workflows, steps, etc.) live at the top of the page file** as `const` declarations, before the component function. Keep the component body focused on layout.

4. **Use `SectionReveal` for scroll-triggered reveals.** Every `<section>` that isn't the hero should wrap its heading in `<SectionReveal>`. Use `delay` props to stagger sibling reveals (e.g. `0`, `0.1`, `0.2`).

5. **Mobile layout must work at 320px minimum.** Use `grid-cols-1 md:grid-cols-2` (or similar) for all multi-column grids. Never use fixed pixel widths for content containers.

6. **Hero sections are exempt from `SectionReveal`** — they use `motion.div` with `animate` (not `whileInView`) since they're visible on load.

7. **Page-level `<section>` elements use `style={{ background: 'var(--bg)' }}` (or `--bg-subtle`) alternating** for visual rhythm. Don't leave the background unset on a section.

## GitHub Links

All external GitHub links in page copy use these exact URLs:

| Resource | URL |
|---|---|
| Org | `https://github.com/ActionsCI` |
| reusable-workflows | `https://github.com/ActionsCI/reusable-workflows` |
| node-agentic-scaffold | `https://github.com/ActionsCI/node-agentic-scaffold` |
| django-angular-boilerplate | `https://github.com/ActionsCI/django-angular-boilerplate` |
| docker-build-push | `https://github.com/ActionsCI/docker-build-push` |
| compute-semver | `https://github.com/ActionsCI/compute-semver` |
| helm-package-push | `https://github.com/ActionsCI/helm-package-push` |

All links must have `target="_blank" rel="noopener noreferrer"`.
