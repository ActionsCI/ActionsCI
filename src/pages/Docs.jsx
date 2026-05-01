import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import SectionReveal from '../components/SectionReveal'

const CICD_YAML = `# Drop this in your repo root

service: your-service-name
image:
  repository: <your-ecr-registry>/your-service
  tag: latest

chart:
  name: your-service
  repository: oci://<your-ecr-registry>/charts

deploy:
  cluster: your-cluster
  namespace: your-namespace`

const CALLER_YAML = `# .github/workflows/deploy.yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    uses: ActionsCI/reusable-workflows/.github/workflows/build-eks.yaml@main
    secrets: inherit`

const SECRETS_TEXT = `# GitHub Actions secrets required:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
KUBECONFIG         # or equivalent per workflow`

const AGENT_TEXT = `# Tell your agent:

Read AGENTS.md in the repo root and any AGENTS.md
files in directories you're working in before making changes.

# Most agents (Claude Code, Cursor, Copilot Workspace)
# will discover AGENTS.md automatically.`

const sections = [
  {
    id: 'prerequisites',
    label: 'Prerequisites',
  },
  {
    id: 'step-1',
    label: 'Step 1: cicd.yaml',
  },
  {
    id: 'step-2',
    label: 'Step 2: Caller workflow',
  },
  {
    id: 'step-3',
    label: 'Step 3: Secrets',
  },
  {
    id: 'step-4',
    label: 'Step 4: Scaffold',
  },
  {
    id: 'step-5',
    label: 'Step 5: AGENTS.md',
  },
]

export default function Docs() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Header */}
      <section className="pt-20 pb-12 px-5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto pt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Getting Started
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Get up and running.
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Add ActionsCI to an existing repo or clone a scaffold. Either way, your first
              pipeline runs in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Layout: sidebar + content */}
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-10 items-start">

        {/* Sidebar TOC */}
        <aside className="md:w-44 flex-shrink-0 md:sticky md:top-20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            On this page
          </p>
          <nav className="flex flex-col gap-0.5">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs px-2 py-1.5 rounded transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-2xl space-y-14">

          {/* Prerequisites */}
          <section id="prerequisites">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Prerequisites</h2>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {[
                  'A GitHub repo with GitHub Actions enabled',
                  'AWS credentials (for EKS workflows) or GCP credentials (for Cloud Run workflows)',
                  'An AI coding agent (Claude Code, Cursor, Copilot Workspace) — optional but recommended',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </section>

          {/* Step 1 */}
          <section id="step-1">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                Step 1: Add cicd.yaml
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Drop this in your repo root. This single file drives the entire pipeline.
              </p>
              <CodeBlock code={CICD_YAML} filename="cicd.yaml" />
            </SectionReveal>
          </section>

          {/* Step 2 */}
          <section id="step-2">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                Step 2: Create a caller workflow
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                This is the entirety of the workflow file you write. Everything else is in ActionsCI.
              </p>
              <CodeBlock code={CALLER_YAML} filename=".github/workflows/deploy.yaml" />
            </SectionReveal>
          </section>

          {/* Step 3 */}
          <section id="step-3">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                Step 3: Configure secrets
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Add these as GitHub Actions secrets in your repo settings. Exact secrets vary by
                workflow — see each workflow's documentation on GitHub.
              </p>
              <CodeBlock code={SECRETS_TEXT} />
              <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
                <a
                  href="https://github.com/ActionsCI/reusable-workflows"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  See workflow-specific secret requirements on GitHub ↗
                </a>
              </p>
            </SectionReveal>
          </section>

          {/* Step 4 */}
          <section id="step-4">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                Step 4 (Optional): Use a scaffold
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Clone a scaffold repo instead of steps 1–2. The scaffold ships with{' '}
                <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--green)' }}>cicd.yaml</code>,
                {' '}<code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--text-muted)' }}>.github/workflows/deploy.yaml</code>,
                {' '}and layered <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--accent)' }}>AGENTS.md</code>{' '}
                files pre-configured. Just update the values for your service.
              </p>
              <a
                href="/scaffolds"
                className="inline-block mt-4 text-sm font-medium transition-colors hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                Browse scaffold repos →
              </a>
            </SectionReveal>
          </section>

          {/* Step 5 */}
          <section id="step-5">
            <SectionReveal>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                Step 5 (Optional): Point your agent at AGENTS.md
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                Most agents discover AGENTS.md automatically. If yours doesn't, tell it explicitly.
              </p>
              <CodeBlock code={AGENT_TEXT} />
              <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Scaffold repos ship with AGENTS.md pre-written for their stack. If you're adding
                ActionsCI to an existing repo, write your own — document your repo's conventions,
                frozen files, and CI/CD setup in plain English.
              </p>
            </SectionReveal>
          </section>

          {/* GitHub link */}
          <SectionReveal>
            <div
              className="rounded-lg p-6"
              style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Full workflow reference</p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                Each workflow's inputs, outputs, and secrets are documented in the reusable-workflows repo.
              </p>
              <a
                href="https://github.com/ActionsCI/reusable-workflows"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                github.com/ActionsCI/reusable-workflows
                <ExternalLink size={13} />
              </a>
            </div>
          </SectionReveal>

        </div>
      </div>
    </div>
  )
}
