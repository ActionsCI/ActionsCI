import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Github } from 'lucide-react'
import Terminal from '../components/Terminal'
import FeatureCard from '../components/FeatureCard'
import TemplateCard from '../components/TemplateCard'
import StepConnector from '../components/StepConnector'
import PricingCard from '../components/PricingCard'
import CodeBlock from '../components/CodeBlock'

const stats = [
  { icon: '⚡', value: '< 5 min', label: 'From clone to deployed' },
  { icon: '📦', value: '20+', label: 'Prebuilt workflow templates' },
  { icon: '🤖', value: 'Agent-ready', label: 'Works with Claude, Copilot, Cursor' },
  { icon: '🚀', value: 'Zero config', label: 'Convention over configuration' },
]

const features = [
  {
    icon: '🔁',
    title: 'Reusable Workflows',
    description: 'Prebuilt, composable GitHub Actions you can call like functions. No copy-paste boilerplate across repos — just reference and go.',
  },
  {
    icon: '📄',
    title: 'agent.md Convention',
    description: 'Drop an agent.md in your repo and your AI coding agent instantly understands your workflow setup. Cursor, Claude Code, Copilot — they all speak it.',
  },
  {
    icon: '🏗️',
    title: 'Scaffold Repos',
    description: 'Spin up a fully wired project in seconds with our scaffold templates. Node, Vite, full-stack — pick your flavor and start building, not configuring.',
  },
  {
    icon: '⚡',
    title: 'Deploy in Minutes',
    description: 'From zero to Vercel or Netlify in under 5 minutes. Preconfigured deploy hooks, preview environments, and branch strategies included.',
  },
  {
    icon: '⚙️',
    title: 'Zero-DevOps Config',
    description: 'One YAML file is all it takes. ActionsCI uses sensible defaults and conventions so your team focuses on features, not infrastructure.',
  },
  {
    icon: '🤖',
    title: 'Agent-First Design',
    description: 'Built for the age of AI-assisted development. Your agents can discover, configure, and trigger workflows without human hand-holding.',
  },
]

const templates = [
  {
    icon: '📦',
    name: 'node-vite-starter',
    stack: 'React + Vite + Tailwind',
    badge: 'Vercel deploy ready',
    href: 'https://github.com/actionsci/node-vite-starter',
  },
  {
    icon: '📦',
    name: 'node-next-starter',
    stack: 'Next.js 14 + App Router',
    badge: 'Vercel deploy ready',
    href: 'https://github.com/actionsci/node-next-starter',
  },
  {
    icon: '📦',
    name: 'node-api-starter',
    stack: 'Express + TypeScript',
    badge: 'Netlify Functions ready',
    href: 'https://github.com/actionsci/node-api-starter',
  },
  {
    icon: '📦',
    name: 'fullstack-starter',
    stack: 'Next.js + Prisma + Postgres',
    badge: 'Vercel + Neon ready',
    href: 'https://github.com/actionsci/fullstack-starter',
  },
]

const deploySteps = [
  { num: '01', label: 'Clone a scaffold repo' },
  { num: '02', label: 'Run npx actionci init' },
  { num: '03', label: 'Push to GitHub' },
  { num: '04', label: 'Connect Vercel or Netlify (one click)' },
  { num: '05', label: 'Merge to main → live in production' },
]

const pricingTiers = [
  {
    tier: 'Free',
    price: '$0',
    period: '/mo',
    features: ['Public repos', '3 workflow templates', 'Community support'],
    cta: 'Get started',
    ctaHref: '/docs',
  },
  {
    tier: 'Pro',
    price: '$X',
    period: '/mo',
    features: ['Private repos', 'All templates', 'agent.md generator', 'Priority support'],
    cta: 'Start free trial',
    ctaHref: '/docs',
    highlight: true,
  },
  {
    tier: 'Team',
    price: '$X',
    period: '/seat/mo',
    features: ['Everything in Pro', 'SSO + audit logs', 'Custom workflows', 'Dedicated onboarding'],
    cta: 'Talk to us',
    ctaHref: '#',
  },
]

const agentMdCode = `# agent.md — ActionsCI config

project: my-vite-app
stack: node20 + vite + react

workflows:
  ci:
    trigger: push, pull_request
    steps: [lint, typecheck, test, build]

  deploy-preview:
    trigger: pull_request
    target: vercel
    env: preview

  deploy-production:
    trigger: push(main)
    target: vercel
    env: production

scaffold: actionci/node-vite-starter
docs: https://actionci.dev/docs`

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
}

export default function Home() {
  return (
    <div>
      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 dot-grid overflow-hidden"
        style={{ background: 'var(--bg)' }}
      >
        {/* Radial glow behind content */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,255,136,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              color: 'var(--accent)',
              border: '1px solid rgba(0,255,136,0.3)',
              background: 'rgba(0,255,136,0.07)',
            }}
          >
            GitHub Actions, reinvented for agent-driven teams
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-mono font-bold leading-tight tracking-tight mb-6"
            style={{ color: 'var(--text)' }}
          >
            Ship product.<br />
            <span style={{ color: 'var(--accent)' }}>Not pipelines.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            ActionsCI is a library of reusable GitHub Actions workflows —
            easy to consume, simple to configure, and designed for teams
            that want to move fast without becoming DevOps experts.
            One file. One command. Deployed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          >
            <Link
              to="/docs"
              className="px-6 py-3 rounded font-mono font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--accent)', color: '#0a0a0a' }}
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/actionsci"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded font-mono text-sm transition-all duration-200 hover:border-white"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              <Github size={15} />
              View on GitHub ↗
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-y"
          style={{ color: 'var(--muted)' }}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── Section 2: Stats Bar ─────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-1 items-center md:items-start text-center md:text-left"
              >
                <span className="text-xl mb-1">{stat.icon}</span>
                <span className="font-mono font-bold text-lg" style={{ color: 'var(--accent)' }}>
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: How It Works ──────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
              How ActionsCI works
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>
              Three steps from idea to production.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
            {[
              {
                num: '01',
                title: 'Pick a template',
                body: 'Browse scaffold repos for your stack (Node, Vite, Next.js, etc.). Clone or let your AI agent pull it automatically via agent.md.',
              },
              null,
              {
                num: '02',
                title: 'Configure once',
                body: 'Drop a single YAML config file into your repo. No deep CI/CD knowledge required. ActionsCI reads your intent and wires up the right workflows automatically.',
              },
              null,
              {
                num: '03',
                title: 'Ship',
                body: 'Push to main. Your pipeline runs. Deploy to Netlify or Vercel with a single merge — no manual steps, no ops tickets, no waiting.',
              },
            ].map((item, i) => {
              if (!item) return <StepConnector key={`connector-${i}`} />
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex-1 flex flex-col gap-3 md:max-w-xs"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm"
                    style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--accent)' }}
                  >
                    {item.num}
                  </div>
                  <h3 className="font-mono font-bold text-base" style={{ color: 'var(--text)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Feature Highlights ───────────────────────── */}
      <section id="features" className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
              Everything your team needs.
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>Nothing they don't.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Agent.md Deep Dive ───────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left prose */}
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
                Your AI agent already knows what to do.
              </h2>
              <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
                agent.md is a plain-text convention that tells any coding agent exactly how your CI/CD is wired.
              </p>
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>
                  When you use ActionsCI, we write an <span className="font-mono" style={{ color: 'var(--accent)' }}>agent.md</span> file
                  into your repo root. This file acts as a living README for your pipeline — describing what workflows
                  exist, how to trigger them, what secrets are needed, and how to deploy.
                </p>
                <p>
                  Claude Code, Cursor, GitHub Copilot Workspace — any agent that reads your repo gets instant context.
                  No onboarding. No tribal knowledge. Your pipeline becomes self-documenting.
                </p>
                <p>
                  Teams ship faster because nobody has to explain "how CI works here" ever again.
                </p>
              </div>
            </motion.div>

            {/* Right code block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CodeBlock code={agentMdCode} language="yaml" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Templates ─────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
              Start from a repo, not from scratch.
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>
              Hand your agent a scaffold. Be in production before lunch.
            </p>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {templates.map((t, i) => (
              <TemplateCard key={t.name} {...t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: DevOps Philosophy ────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
              Built on the shoulders of giants.
            </h2>
            <p className="text-base mb-12" style={{ color: 'var(--muted)' }}>
              We took the principles from The DevOps Handbook and Accelerate — and made them accessible to every team.
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-mono font-bold leading-snug mb-12 px-4 py-8 rounded-lg"
            style={{
              color: 'var(--accent)',
              borderLeft: '3px solid var(--accent)',
              textAlign: 'left',
              background: 'rgba(0,255,136,0.04)',
            }}
          >
            "The goal of DevOps isn't better pipelines.
            It's faster feedback, higher trust, and more time
            building things that matter."
          </motion.blockquote>

          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-3 gap-6 text-left mb-12"
          >
            {[
              'The research is clear — teams that invest in deployment automation, trunk-based development, and short feedback loops ship more, break less, and burn out less. ActionsCI operationalizes these principles out of the box.',
              'We believe CI/CD should be a commodity, not a competitive differentiator. Your team\'s edge is your product. So we handle the pipelines so you don\'t have to think about them.',
              'Whether you\'re a solo founder or a team of 50, ActionsCI gives you the workflow foundation of a mature engineering org — on day one.',
            ].map((para, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {['Based on: Accelerate (DORA metrics)', 'The DevOps Handbook', 'Trunk-Based Development'].map(badge => (
              <span
                key={badge}
                className="text-xs font-mono px-3 py-1.5 rounded"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 8: Deploy Speed CTA ─────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4" style={{ color: 'var(--text)' }}>
              Zero to deployed.<br />
              <span style={{ color: 'var(--accent)' }}>Under 5 minutes.</span>
            </h2>
          </motion.div>

          <motion.ol
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 mb-10 space-y-3 text-left"
          >
            {deploySteps.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex items-center gap-4 font-mono text-base"
                style={{ color: 'var(--text)' }}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{step.num}</span>
                <span>{step.label}</span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Link
              to="/docs"
              className="block w-full sm:inline-block sm:w-auto px-8 py-4 rounded font-mono font-bold text-base transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--accent)', color: '#0a0a0a' }}
            >
              Start for free →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 9: Pricing Teaser ────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
              Simple pricing for every team.
            </h2>
            <Link
              to="/pricing"
              className="text-sm font-mono transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              See full pricing →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <PricingCard key={tier.tier} {...tier} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
