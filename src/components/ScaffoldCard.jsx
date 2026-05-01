import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function ScaffoldCard({ name, description, href, detail, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg p-6 flex flex-col gap-4"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
    >
      <div>
        <code
          className="text-sm font-mono font-medium"
          style={{ color: 'var(--accent)' }}
        >
          {name}
        </code>
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>

      {detail && (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {detail}
        </p>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
        style={{ color: 'var(--accent)' }}
      >
        <span>github.com/ActionsCI/{name}</span>
        <ExternalLink size={12} />
      </a>
    </motion.div>
  )
}
