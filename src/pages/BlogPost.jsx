import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const posts = {
  'why-we-built-agent-md': {
    title: 'Why we built agent.md: making CI self-documenting',
    date: '2025-03-12',
    category: 'Engineering',
    body: `Every team has tribal knowledge about how their CI pipeline works. There's always someone who knows which secrets need to be set, which branch triggers a production deploy, and why that one job has a weird timeout.

We decided to encode that knowledge in a plain-text file that any AI agent can read.

agent.md is simple: it describes your workflows, their triggers, their targets, and any configuration your team needs to know. It lives in the root of your repo alongside your code.

The insight was that AI coding agents — Claude Code, Cursor, GitHub Copilot — all read your repository. If you write down how your CI works in a consistent format, these agents can reason about it automatically. No onboarding. No documentation drift. The pipeline becomes self-documenting.

We've seen teams go from "let me ask someone on Slack how deploys work" to having their AI agent trigger a deploy automatically, because the agent read agent.md and knew exactly what to do.

That's the bet: conventions beat configuration, and readable files beat tribal knowledge.`,
  },
  'zero-to-vercel-in-4-minutes': {
    title: 'From zero to Vercel in 4 minutes with ActionsCI',
    date: '2025-02-28',
    category: 'Tutorial',
    body: `Here's a real-time walkthrough. I'm going to clone a scaffold, init ActionsCI, push to GitHub, connect Vercel, and ship production — and I'm going to narrate every step.

Step 1 — Clone the scaffold (45 seconds)

Clone node-vite-starter from GitHub. It's a React + Vite + Tailwind app with no CI config yet. That's the point.

Step 2 — Run npx actionci init (30 seconds)

You'll be prompted for your project name, stack, and deploy target. Answer three questions. ActionsCI writes your GitHub Actions workflows and your agent.md.

Step 3 — Push to GitHub (30 seconds)

Create a new repo, push. GitHub Actions kicks off your CI workflow immediately. You'll see lint, typecheck, and build all pass.

Step 4 — Connect Vercel (90 seconds)

Import the repo in Vercel's dashboard. One click. Vercel detects Vite, sets the build command automatically. Deploy runs.

Step 5 — You're live.

Production URL in hand. Every future PR gets a preview deploy. Every merge to main goes to production. You never had to write a single YAML file by hand.

Total time: under 4 minutes.`,
  },
  'dora-metrics-for-small-teams': {
    title: 'DORA metrics for small teams: what actually matters',
    date: '2025-01-19',
    category: 'DevOps',
    body: `The DORA research program identified four key metrics that predict software delivery performance: deployment frequency, lead time for changes, change failure rate, and mean time to restore.

These are validated predictors. Elite performers deploy multiple times per day. Low performers deploy once per month or less. The gap is not about tooling — it's about process, trust, and automation.

For a small team (2–10 engineers), here's what actually matters:

Deployment frequency is the north star. If you're not shipping at least once per day, something in your process is creating friction. Usually it's manual steps, long review cycles, or lack of confidence in your test suite.

Lead time tells you how fast ideas become reality. Track the time from first commit on a branch to it being in production. If that number is measured in days rather than hours, you have a bottleneck somewhere.

Change failure rate keeps you honest. Shipping fast is worthless if every tenth deploy breaks something. A good CI/CD pipeline with comprehensive tests is table stakes.

MTTR matters more than CFR for small teams. You will have incidents. The question is how fast you can recover. A team that deploys fearlessly because they can roll back in 60 seconds beats a team that deploys reluctantly once a week.

ActionsCI is designed to move all four metrics in the right direction from day one.`,
  },
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const categoryColors = {
  Engineering: { bg: 'rgba(0,255,136,0.1)', text: 'var(--accent)', border: 'rgba(0,255,136,0.2)' },
  Tutorial: { bg: 'rgba(255,107,53,0.1)', text: 'var(--accent-2)', border: 'rgba(255,107,53,0.2)' },
  DevOps: { bg: 'rgba(255,255,255,0.05)', text: 'var(--muted)', border: 'var(--border)' },
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts[slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: 'var(--bg)' }}>
        <h1 className="text-4xl font-mono font-bold mb-4" style={{ color: 'var(--text)' }}>Post not found</h1>
        <Link to="/blog" className="font-mono text-sm" style={{ color: 'var(--accent)' }}>← Back to blog</Link>
      </div>
    )
  }

  const colors = categoryColors[post.category] || categoryColors.DevOps

  return (
    <div style={{ background: 'var(--bg)' }}>
      <article className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-mono mb-10 transition-colors hover:text-white"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {post.category}
            </span>
            <time className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-mono font-bold leading-snug mb-10" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>

          <div className="space-y-5">
            {post.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  )
}
