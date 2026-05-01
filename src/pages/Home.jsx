import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronDown } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import FileTree from '../components/FileTree'
import ScaffoldCard from '../components/ScaffoldCard'
import SectionReveal from '../components/SectionReveal'

/* ── Copy constants ─────────────────────────────────────────────── */

const CICD_YAML = `# cicd.yaml — drop this in your repo root

service: my-api
image:
  repository: 123456789.dkr.ecr.us-east-1.amazonaws.com/my-api
  tag: latest

chart:
  name: my-api
  repository: oci://123456789.dkr.ecr.us-east-1.amazonaws.com/charts

deploy:
  cluster: production
  namespace: default`

const CALLER_WORKFLOW = `# .github/workflows/deploy.yaml

name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    uses: ActionsCI/reusable-workflows/.github/workflows/build-eks.yaml@main
    secrets: inherit
    with:
      environment: production`

const SHA_PINNING = `# What you see in ActionsCI workflows:

- uses: actions/checkout@08eba0b27e820071cde6df949e0beb9ba4906955  # v4.3.0
- uses: docker/setup-buildx-action@b5730e08a8eb7b2671c4e45d8d0b7e7e3a99f58c  # v3.10.0

# Not this:
- uses: actions/checkout@v4          # mutable tag
- uses: docker/setup-buildx-action@main  # moving ref`

const workflows = [
  { name: 'build-eks.yaml', desc: 'Full orchestration: docker build/push → Helm package/push → GitOps deploy' },
  { name: 'build-eks-pr-test.yaml', desc: 'PR smoke gate — runs your build against a throwaway branch before merge' },
  { name: 'pre-build.yaml', desc: 'Parses cicd.yaml, computes image and chart versions' },
  { name: 'docker-build-push.yaml', desc: 'Build and push container images to ECR' },
  { name: 'docker-build-test.yaml', desc: 'Credential-free PR gate — builds the Dockerfile without pushing' },
  { name: 'helm-package-push.yaml', desc: 'Package and publish Helm charts to ECR' },
  { name: 'service-deployment-gitops.yaml', desc: 'Updates Chart.yaml in a GitOps repo' },
  { name: 'gcp-cloudrun-deploy.yaml', desc: 'Deploy to GCP Cloud Run' },
  { name: 'compute-next-semver.yaml', desc: 'Automatic semantic version calculation' },
  { name: 'success-check.yaml', desc: 'Aggregate job conclusions for branch protection' },
]

/* ── Component ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center diagonal-grid pt-14"
        style={{ background: 'var(--bg)' }}
      >
        {/* subtle vignette over the grid */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, var(--bg) 30%, transparent 100%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span
                className="inline-block text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded mb-6"
                style={{
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                GitHub Actions · Reusable · Agent-Ready
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: 'var(--text)' }}
            >
              CI/CD that gets<br />
              <span style={{ color: 'var(--accent)' }}>out of your way.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--text-muted)' }}
            >
              ActionsCI publishes reusable GitHub Actions workflows your team
              actually wants to use. One config file. Composable actions.
              Scaffold repos your agents can read and run with immediately.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/workflows"
                className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-150 hover:opacity-90"
                style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
              >
                Browse Workflows →
              </Link>
              <Link
                to="/scaffolds"
                className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-150"
                style={{
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                Explore Scaffolds →
              </Link>
            </motion.div>
          </div>

          {/* Right — hero code block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CodeBlock
              code={CICD_YAML}
              filename="cicd.yaml — your entire pipeline config"
              accentBorder
            />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-y" style={{ color: 'var(--text-muted)' }} aria-hidden="true">
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Convention over configuration.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                num: '1',
                title: 'Reference a workflow',
                body: "In your repo's .github/workflows/, call an ActionsCI reusable workflow with uses:. Pass your cicd.yaml values as inputs. That's the entire integration.",
              },
              {
                num: '2',
                title: 'Configure once',
                body: 'Your cicd.yaml lives in the repo root and drives everything — image names, chart versions, cluster targets. Change config, not workflow code.',
              },
              {
                num: '3',
                title: 'Ship on merge',
                body: 'Push to main. The workflow handles docker build/push, Helm packaging, semver bumping, and GitOps deployment. Your team reviews code, not pipeline YAML.',
              },
            ].map((step, i) => (
              <SectionReveal key={step.num} delay={i * 0.1}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-4"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.body}</p>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3} className="mt-12">
            <CodeBlock code={CALLER_WORKFLOW} filename=".github/workflows/deploy.yaml" />
            <p className="text-sm mt-3 italic" style={{ color: 'var(--text-muted)' }}>
              "That's the entire caller workflow. The complexity lives in ActionsCI — not in your repo."
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Workflow Library ──────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Every workflow your team needs.
            </h2>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              Prebuilt, maintained, and pinned to immutable commit SHAs for supply-chain safety.
            </p>
          </SectionReveal>

          {/* Grid table */}
          <div
            className="mt-10 rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            {workflows.map((wf, i) => (
              <motion.div
                key={wf.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 px-5 py-4 items-center"
                style={{
                  borderBottom: i < workflows.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-subtle)',
                }}
              >
                <div className="md:col-span-2">
                  <code
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: 'var(--code-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
                  >
                    {wf.name}
                  </code>
                </div>
                <div className="md:col-span-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {wf.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <SectionReveal delay={0.1} className="mt-6">
            <a
              href="https://github.com/ActionsCI/reusable-workflows"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              View all workflows on GitHub ↗
              <ExternalLink size={13} />
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* ── AGENTS.md ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              Your AI agent already knows how to work here.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 items-start">
            {/* Left prose */}
            <SectionReveal>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  ActionsCI scaffold repos ship with layered <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--code-bg)', color: 'var(--accent)' }}>AGENTS.md</code> files —
                  a plain-text convention that gives AI coding agents
                  (Claude Code, Cursor, Copilot Workspace) the same context
                  a senior engineer would have after six months in the codebase.
                </p>
                <p>
                  Root <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--code-bg)', color: 'var(--accent)' }}>AGENTS.md</code> sets org-wide golden rules. Service-level
                  AGENTS.md files add local constraints. Rules cascade
                  downward — a service can add stricter rules, never looser ones.
                </p>
                <p>
                  Your agent reads the repo, reads the AGENTS.md files,
                  and knows exactly what to touch and what to leave alone.
                  No onboarding session. No "how does CI work here?"
                  The repo tells them.
                </p>
              </div>

              <blockquote
                className="mt-8 text-base italic leading-relaxed"
                style={{
                  color: 'var(--accent)',
                  borderLeft: '3px solid var(--accent)',
                  paddingLeft: '1rem',
                }}
              >
                "AGENTS.md is institutional memory for AI agents. It captures the lessons your team
                learned the hard way — and makes them available to every agent session automatically."
              </blockquote>
            </SectionReveal>

            {/* Right file tree */}
            <FileTree />
          </div>
        </div>
      </section>

      {/* ── Scaffold Repos ────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Clone a scaffold. Hand it to your agent. Ship.
            </h2>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              Template repos pre-wired with AGENTS.md, cicd.yaml, and ActionsCI workflows. Clone and go.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <ScaffoldCard
              name="node-agentic-scaffold"
              href="https://github.com/ActionsCI/node-agentic-scaffold"
              description="Node.js monorepo scaffold with layered AGENTS.md, SPEC.md template, and PR checklist — production-pattern for AI-assisted development."
              delay={0}
            />
            <ScaffoldCard
              name="django-angular-boilerplate"
              href="https://github.com/ActionsCI/django-angular-boilerplate"
              description="Django + Angular full-stack scaffold with ActionsCI workflows pre-wired for EKS deployment."
              delay={0.1}
            />
          </div>

          <SectionReveal delay={0.15} className="mt-6">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              More scaffold repos coming. Each one demonstrates a real production pattern — not toy examples.
              Clone, customize the AGENTS.md for your team's rules, and you're running.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Supply-Chain Safety ───────────────────────────────────── */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <SectionReveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                Every third-party action pinned to a commit SHA.
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  Tags are mutable. A compromised upstream can silently re-point{' '}
                  <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>@v4</code> to
                  arbitrary code, and every consumer picks it up on the next run.
                </p>
                <p>
                  The tj-actions/changed-files compromise in March 2025 affected tens of
                  thousands of repos pinned to a tag.
                </p>
                <p>
                  ActionsCI pins all third-party actions to a 40-character commit SHA.
                  The code you reviewed is the code that runs. Always.
                </p>
              </div>
            </SectionReveal>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <CodeBlock code={SHA_PINNING} filename="Inside an ActionsCI workflow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DevOps Principles ────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-5 py-20">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              Built on what the research actually says.
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <p>
                The DORA research is clear: teams that invest in deployment automation and short
                feedback loops ship more, break less, and burn out less. But most teams never get
                there because standing up a compliant, secure, automated pipeline is itself a
                significant project.
              </p>
              <p>
                ActionsCI is that project — done once, shared with everyone. Your team gets a
                mature engineering org's pipeline on day one. They spend their time on product,
                not on infrastructure.
              </p>
              <p>
                We follow trunk-based development, automate semver, enforce GitOps deploys, and
                pin every dependency. The boring stuff done right so your team never has to think
                about it.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

    </div>
  )
}
