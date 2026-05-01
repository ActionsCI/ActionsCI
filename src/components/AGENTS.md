# AGENTS.md — src/components/

## Purpose

Shared UI components used across multiple pages. Each file exports a single default component. Components are presentational — they do not fetch data, call APIs, or manage global state.

## Current Components

| File | Purpose |
|---|---|
| `Nav.jsx` | Sticky top nav — theme toggle, mobile drawer, scroll opacity transition |
| `Footer.jsx` | Site footer — brand column + resource links |
| `CodeBlock.jsx` | CSS-only YAML syntax highlighter with dark/light token colors |
| `FileTree.jsx` | Monospace file tree visualization for AGENTS.md hierarchy diagrams |
| `WorkflowCard.jsx` | Card for the workflow library — name, description, calls chain, example |
| `ScaffoldCard.jsx` | Card for a scaffold repo — name, description, GitHub link |
| `SectionReveal.jsx` | Framer Motion scroll-triggered fade-up wrapper |

## Rules

1. **No business logic in components.** All content (copy, workflow data, scaffold metadata) lives in the page file that uses the component, not in the component itself.

2. **All color values via CSS variables.** Use `var(--accent)`, `var(--text-muted)`, etc. No hardcoded hex. Inline `style` props are appropriate when Tailwind can't express a CSS variable value directly.

3. **Hover state mutations via `onMouseEnter`/`onMouseLeave` are acceptable** for border-color and box-shadow transitions that depend on CSS variables (Tailwind can't compose these dynamically). Keep them minimal.

4. **`SectionReveal` is the standard scroll-reveal wrapper.** Use it instead of inlining `motion.div` with `whileInView` in every page section. Props: `delay` (number, default 0), `className`.

5. **`CodeBlock` is CSS-only — do not add an external syntax highlighting library.** If a new language is needed, extend the `tokenizeLine` function in `CodeBlock.jsx`. The token color CSS variables (`--cb-key`, `--cb-value`, etc.) are injected via an inline `<style>` tag that respects `[data-theme="dark"]`.

6. **`Nav.jsx` owns theme toggle state.** The `useTheme` hook inside Nav reads/writes `data-theme` on `<html>` and persists to `localStorage`. Do not replicate theme logic elsewhere.

7. **New components need a clear justification.** If a pattern appears in only one page, inline it in that page file. Extract to a shared component only when two or more pages use the same structure.

## Adding a New Component

- File: `PascalCase.jsx`
- Export: `export default function ComponentName(...)`
- Add an entry to the table above
- Props: destructure in the signature, document non-obvious ones with an inline comment
