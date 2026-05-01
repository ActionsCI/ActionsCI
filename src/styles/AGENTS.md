# AGENTS.md — src/styles/

## Purpose

`globals.css` is the single source of truth for the design system. It defines CSS custom properties for both themes, base resets, and utility classes used across the site.

## Theme System

The site uses a `data-theme` attribute on `<html>` to switch between light and dark mode.

```css
:root            /* light mode */
[data-theme="dark"]  /* dark mode */
```

Dark is the default. The theme-init script in `index.html` sets `data-theme` before first paint to prevent flash.

## Color Palette

Do not change these values without a deliberate brand decision from the repo owner.

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0d1117` | Page background |
| `--bg-subtle` | `#f6f7f9` | `#161b22` | Alternate section bg, sidebar |
| `--surface` | `#f0f2f5` | `#21262d` | Cards, nav surface, code header |
| `--border` | `#e1e4e8` | `#30363d` | All borders |
| `--accent` | `#0969da` | `#58a6ff` | CTAs, links, active states, highlights |
| `--accent-fg` | `#ffffff` | `#0d1117` | Text on accent background |
| `--green` | `#1a7f37` | `#3fb950` | Success states, cicd.yaml highlights |
| `--text` | `#1c2128` | `#e6edf3` | Primary body text |
| `--text-muted` | `#656d76` | `#8b949e` | Secondary text, labels, captions |
| `--code-bg` | `#f6f8fa` | `#161b22` | Code block backgrounds |
| `--code-text` | `#24292f` | `#e6edf3` | Default code text color |

### CodeBlock token colors

These are injected via an inline `<style>` in `CodeBlock.jsx` — not defined here — so they can be scoped to the component:

| Variable | Description |
|---|---|
| `--cb-comment` | YAML comments (`#`) |
| `--cb-key` | YAML keys (blue) |
| `--cb-value` | YAML values (blue-tinted) |
| `--cb-list-marker` | YAML list markers `- ` (purple) |
| `--cb-string` | Quoted strings |
| `--cb-number` | Numeric values |
| `--cb-plain` | Unmatched tokens |

## Utility Classes

| Class | Description |
|---|---|
| `.diagonal-grid` | Repeating diagonal line texture for the hero section |
| `.file-tree` | Font and line-height base for `FileTree.jsx` |
| `.bounce-y` | Infinite vertical bounce for the hero scroll indicator |

## Rules

1. **All colors in JSX must reference CSS variables** — `var(--accent)`, `var(--bg)`, etc. Never use hex values or Tailwind color utilities (`text-blue-500`) for brand colors.

2. **Do not add new CSS variables without updating this file.** Every new variable needs an entry in the palette table, a light value in `:root`, and a dark value in `[data-theme="dark"]`.

3. **`@import "tailwindcss"` must come after the Google Fonts `@import url(...)`.** This is a CSS spec requirement — `@import` rules must precede all other rules. Reversing the order produces a build warning.

4. **Do not add `@keyframes` for scroll-reveal animations.** Framer Motion handles those. `@keyframes` here are only for persistent effects (`.bounce-y`).

5. **The `[data-theme="dark"]` block is the canonical dark mode definition.** Do not use `@media (prefers-color-scheme: dark)` in CSS — preference detection is handled in JS (the `useTheme` hook in `Nav.jsx` and the init script in `index.html`).
