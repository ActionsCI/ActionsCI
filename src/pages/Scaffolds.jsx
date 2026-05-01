import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ScaffoldCard from '../components/ScaffoldCard'
import FileTree from '../components/FileTree'
import SectionReveal from '../components/SectionReveal'
import CodeBlock from '../components/CodeBlock'

const SPEC_EXAMPLE = `# SPEC.md — fill this out before starting an agent session

## Feature
Add user authentication with JWT

## Acceptance criteria
- POST /auth/login returns signed JWT
- Protected routes return 401 without valid token
- Token refresh flow implemented

## Constraints
- Do not modify the DAL layer (see AGENTS.md)
- All new endpoints require integration tests
- Follow the error-response schema in shared/types`

const AGENTS_EXAMPLE = `# AGENTS.md — repo root

## Golden rules
- Never modify files in shared/frozen/
- All DB changes require a migration file
- PR must include integration test for new endpoints
- Use the error-response schema from shared/types/errors.ts

## Stack
- Node 20, TypeScript, Express
- PostgreSQL via Prisma
- GitHub Actions via ActionsCI (see cicd.yaml)

## CI/CD
- cicd.yaml drives all pipeline config
- Do not edit .github/workflows/ directly
- Semver is computed automatically from conventional commits`

const steps = [
  'Click "Use this template" on GitHub',
  'Replace placeholder service names in AGENTS.md',
  'Update cicd.yaml with your registry, cluster, and chart values',
  'Point your agent at the root AGENTS.md',
  'Fill out SPEC.md for your first feature',
  'Ship',
]

export default function Scaffolds() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Header */}
      <section className="pt-20 pb-12 px-5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto pt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Scaffold Repos
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Fork a scaffold. Hand it to your agent. Ship.
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
              GitHub template repos pre-wired with AGENTS.md layers, cicd.yaml, and ActionsCI
              workflow callers. Real production patterns — not toy examples.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-16 space-y-20">

        {/* What is a scaffold */}
        <section>
          <SectionReveal>
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              What is a scaffold repo?
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              A GitHub template repository with a real production structure: layered{' '}
              <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--accent)' }}>AGENTS.md</code> files that give AI agents
              institutional context, a <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--green)' }}>cicd.yaml</code> that
              drives the entire pipeline, and ActionsCI workflow callers already in{' '}
              <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--text-muted)' }}>.github/workflows/</code>.
              Fork it, customize the config, and you're shipping — not configuring.
            </p>
          </SectionReveal>
        </section>

        {/* AGENTS.md hierarchy */}
        <section>
          <SectionReveal>
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              The AGENTS.md hierarchy
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
              Rules cascade downward. A service can add stricter rules — never looser ones.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <FileTree />
            <SectionReveal delay={0.15}>
              <CodeBlock code={AGENTS_EXAMPLE} filename="AGENTS.md — example" />
            </SectionReveal>
          </div>
        </section>

        {/* SPEC.md pattern */}
        <section>
          <SectionReveal>
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              The SPEC.md pattern
            </h2>
            <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Before an agent session, fill out SPEC.md: what to build, acceptance criteria, and
              any constraints. The agent reads SPEC.md alongside AGENTS.md and has full context
              before writing a single line of code. No back-and-forth. No scope creep.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <CodeBlock code={SPEC_EXAMPLE} filename="SPEC.md — before your agent session" />
          </SectionReveal>
        </section>

        {/* Available scaffolds */}
        <section>
          <SectionReveal>
            <h2 className="text-xl md:text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              Available scaffolds
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScaffoldCard
              name="node-agentic-scaffold"
              href="https://github.com/ActionsCI/node-agentic-scaffold"
              description="Node.js monorepo scaffold with layered AGENTS.md, SPEC.md template, and PR checklist."
              detail="Production-pattern for AI-assisted development. Includes conventional commit linting, PR template, and service-level AGENTS.md examples."
              delay={0}
            />
            <ScaffoldCard
              name="django-angular-boilerplate"
              href="https://github.com/ActionsCI/django-angular-boilerplate"
              description="Django + Angular full-stack scaffold with ActionsCI workflows pre-wired for EKS deployment."
              detail="Includes AGENTS.md for both backend and frontend services. Configured for Postgres via environment variables."
              delay={0.1}
            />
          </div>
          <SectionReveal delay={0.15} className="mt-5">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              More scaffold repos coming. Each one demonstrates a real production pattern — not toy examples.
            </p>
          </SectionReveal>
        </section>

        {/* How to use */}
        <section>
          <SectionReveal>
            <h2 className="text-xl md:text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              How to use a scaffold
            </h2>
          </SectionReveal>
          <div className="space-y-3 max-w-xl">
            {steps.map((step, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono mt-0.5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {step}
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.5} className="mt-8">
            <a
              href="https://github.com/ActionsCI/node-agentic-scaffold"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-150 hover:opacity-90"
              style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
            >
              Use node-agentic-scaffold template
              <ExternalLink size={13} />
            </a>
          </SectionReveal>
        </section>

      </div>
    </div>
  )
}
