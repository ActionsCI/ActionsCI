# Contributing

## Branch Strategy

- Work against `staging`, not `main`
- Open PRs to `staging` for all feature work
- Vercel automatically deploys staging PRs as preview URLs
- `staging` → `main` PRs are production releases

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

| Branch    | Environment |
|-----------|-------------|
| `staging` | Vercel Preview (auto-deploy) |
| `main`    | Vercel Production |

## Vercel project settings

- Production branch: `main`
- Preview branch: `staging`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
