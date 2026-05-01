# AGENTS.md — .github/workflows/

## Purpose

GitHub Actions workflow callers for the ActionsCI website repo. All workflows call reusable workflows from `ActionsCI/reusable-workflows` — they do not contain inline job logic.

## Current Workflows

| File | Trigger | Description |
|---|---|---|
| `version-incrementor.yaml` | push to `main` | Bumps patch semver tag on every production release |

## Rules

1. **Callers only — no inline steps.** Workflow files here must use `jobs.<id>.uses:` to call a reusable workflow. Do not write `jobs.<id>.steps:` with inline `run:` commands. If new logic is needed, it belongs in `ActionsCI/reusable-workflows`, not here.

2. **No `@main` or mutable refs.** This applies to the workflow callers themselves. Reference reusable workflows without a ref (letting the org's default branch resolve) or pin to a SHA — never `@main`, `@master`, or a mutable tag.

3. **`secrets: inherit` is the correct pattern.** Pass secrets to reusable workflows via `secrets: inherit`. Do not enumerate secrets individually unless the reusable workflow explicitly requires named inputs.

4. **`permissions` must be declared explicitly.** If a reusable workflow needs elevated permissions (e.g. `contents: write` for the version-incrementor), declare them in the caller — don't rely on the default token permissions.

5. **Triggers follow the branch strategy.** Workflows that affect production run on `push` to `main` only. Workflows that affect staging/preview run on `push` to `staging` or `pull_request`. Never trigger production workflows from feature branches.

## Branch Strategy (reminder)

```
feature branch  →  PR to staging  →  Vercel preview
staging         →  PR to main     →  Vercel production + version tag
```

## Adding a New Workflow

1. Confirm the target reusable workflow exists in `ActionsCI/reusable-workflows`
2. Create the caller file here following the pattern in `version-incrementor.yaml`
3. Add an entry to the table above
4. Include `permissions` block if the reusable workflow requires elevated access
