import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const quickstartCards = [
  {
    icon: '⚙️',
    title: 'Installation',
    description: 'Get the ActionsCI CLI installed and run your first init command in under 2 minutes.',
    href: 'https://github.com/actionsci/actionsci#installation',
    label: 'Read installation guide',
  },
  {
    icon: '🔁',
    title: 'First Workflow',
    description: 'Set up your first reusable workflow — lint, typecheck, test, and build — with one config file.',
    href: 'https://github.com/actionsci/actionsci#first-workflow',
    label: 'Create your first workflow',
  },
  {
    icon: '▲',
    title: 'Deploy to Vercel',
    description: 'Connect your repo to Vercel and ship previews on every PR, production on merge to main.',
    href: 'https://github.com/actionsci/actionsci#vercel',
    label: 'Vercel deploy guide',
  },
  {
    icon: '◆',
    title: 'Deploy to Netlify',
    description: 'Wire up Netlify deploy hooks, branch deploys, and serverless functions in minutes.',
    href: 'https://github.com/actionsci/actionsci#netlify',
    label: 'Netlify deploy guide',
  },
]

const codeSnippet = `$ npx actionci init

? What's your project name? › my-app
? Select your stack › Node 20 + Vite + React
? Deploy target › Vercel

✔ Scaffolding .github/workflows/ci.yml
✔ Scaffolding .github/workflows/deploy.yml
✔ Writing agent.md
✔ Done! Push to GitHub to activate.`

export default function Docs() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ color: 'var(--accent)', border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.07)' }}
          >
            Documentation
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4" style={{ color: 'var(--text)' }}>
            Get up and running in 5 minutes
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
            Everything you need to go from a blank repo to a fully automated CI/CD pipeline.
          </p>
        </motion.div>
      </section>

      {/* Code snippet */}
      <section className="pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto rounded-lg overflow-hidden"
          style={{ background: 'var(--code-bg)', border: '1px solid var(--border)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="ml-2 text-xs font-mono" style={{ color: 'var(--muted)' }}>terminal</span>
          </div>
          <pre className="p-5 font-mono text-sm leading-7 overflow-x-auto">
            {codeSnippet.split('\n').map((line, i) => {
              const isCommand = line.startsWith('$')
              const isSuccess = line.startsWith('✔')
              const isQuestion = line.startsWith('?')
              const color = isCommand ? 'var(--text)' : isSuccess ? 'var(--accent)' : isQuestion ? 'var(--accent-2)' : 'var(--muted)'
              return <div key={i} style={{ color }}>{line}</div>
            })}
          </pre>
        </motion.div>
      </section>

      {/* Quickstart cards */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-mono font-bold mb-6"
            style={{ color: 'var(--muted)' }}
          >
            Quickstart guides
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {quickstartCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-lg p-6 flex flex-col gap-3 no-underline transition-all duration-200 group"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,255,136,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className="font-mono font-bold text-base" style={{ color: 'var(--text)' }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                  {card.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-mono" style={{ color: 'var(--accent)' }}>
                  {card.label}
                  <ExternalLink size={12} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 text-center" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-mono font-bold mb-3" style={{ color: 'var(--text)' }}>
            Looking for the full reference?
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Complete documentation lives on GitHub. Open an issue if you find a gap.
          </p>
          <a
            href="https://github.com/actionsci/actionsci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#0a0a0a' }}
          >
            View on GitHub <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
