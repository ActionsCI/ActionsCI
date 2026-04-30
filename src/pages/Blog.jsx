import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const posts = [
  {
    slug: 'why-we-built-agent-md',
    title: 'Why we built agent.md: making CI self-documenting',
    date: '2025-03-12',
    category: 'Engineering',
    excerpt:
      'Every team has tribal knowledge about how their CI pipeline works. We decided to encode that knowledge in a file that any AI agent can read. Here\'s why.',
  },
  {
    slug: 'zero-to-vercel-in-4-minutes',
    title: 'From zero to Vercel in 4 minutes with ActionsCI',
    date: '2025-02-28',
    category: 'Tutorial',
    excerpt:
      'A step-by-step walkthrough of scaffolding a new Vite app, wiring up CI, and deploying to Vercel — start to finish in under 5 minutes.',
  },
  {
    slug: 'dora-metrics-for-small-teams',
    title: 'DORA metrics for small teams: what actually matters',
    date: '2025-01-19',
    category: 'DevOps',
    excerpt:
      'Deployment frequency, lead time, MTTR, change failure rate — the DORA four are proven predictors of delivery performance. But which ones should a 5-person team actually track?',
  },
]

const categoryColors = {
  Engineering: { bg: 'rgba(0,255,136,0.1)', text: 'var(--accent)', border: 'rgba(0,255,136,0.2)' },
  Tutorial: { bg: 'rgba(255,107,53,0.1)', text: 'var(--accent-2)', border: 'rgba(255,107,53,0.2)' },
  DevOps: { bg: 'rgba(255,255,255,0.05)', text: 'var(--muted)', border: 'var(--border)' },
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Blog() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ color: 'var(--accent)', border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.07)' }}
          >
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4" style={{ color: 'var(--text)' }}>
            Writing on DevOps,<br />CI/CD, and shipping.
          </h1>
          <p className="text-base" style={{ color: 'var(--muted)' }}>
            Practical essays from the team building ActionsCI.
          </p>
        </motion.div>
      </section>

      {/* Post grid */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
          {posts.map((post, i) => {
            const colors = categoryColors[post.category] || categoryColors.DevOps
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block rounded-lg p-7 no-underline transition-all duration-200 group"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.25)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,255,136,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
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
                  <h2
                    className="font-mono font-bold text-xl mb-3 transition-colors duration-200 group-hover:text-white"
                    style={{ color: 'var(--text)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>
                  <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
                    Read article →
                  </span>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
