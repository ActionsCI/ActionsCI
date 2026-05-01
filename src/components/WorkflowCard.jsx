import { motion } from 'framer-motion'
import CodeBlock from './CodeBlock'

export default function WorkflowCard({ name, description, calls, example, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start gap-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <code
          className="text-sm font-mono font-medium px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
          style={{ background: 'var(--code-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          {name}
        </code>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>

        {calls && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Calls
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {calls.map((c, i) => (
                <span key={c}>
                  <span style={{ color: 'var(--accent)' }}>{c}</span>
                  {i < calls.length - 1 && (
                    <span style={{ color: 'var(--text-muted)' }}> → </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        )}

        {example && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Example caller
            </p>
            <code
              className="text-xs font-mono block px-3 py-2 rounded"
              style={{ background: 'var(--code-bg)', color: 'var(--accent)', border: '1px solid var(--border)' }}
            >
              uses: ActionsCI/reusable-workflows/.github/workflows/{name}
            </code>
          </div>
        )}
      </div>
    </motion.div>
  )
}
