import { motion } from 'framer-motion'

const lines = [
  { text: 'your-repo/', indent: 0, type: 'dir' },
  { text: '├── ', indent: 0, type: 'plain', suffix: 'AGENTS.md', suffixType: 'highlight', comment: '← Org-wide: golden rules, stack, conventions' },
  { text: '├── ', indent: 0, type: 'plain', suffix: 'SPEC.md', suffixType: 'muted', comment: '← Feature spec template for agent sessions' },
  { text: '├── ', indent: 0, type: 'plain', suffix: 'cicd.yaml', suffixType: 'accent', comment: '← ActionsCI pipeline config' },
  { text: '├── ', indent: 0, type: 'plain', suffix: '.github/', suffixType: 'dir' },
  { text: '│   └── ', indent: 0, type: 'plain', suffix: 'workflows/', suffixType: 'dir' },
  { text: '│       └── ', indent: 0, type: 'plain', suffix: 'deploy.yaml', suffixType: 'muted', comment: '← Calls ActionsCI reusable workflow' },
  { text: '├── ', indent: 0, type: 'plain', suffix: 'services/', suffixType: 'dir' },
  { text: '│   ├── ', indent: 0, type: 'plain', suffix: 'auth/', suffixType: 'dir' },
  { text: '│   │   └── ', indent: 0, type: 'plain', suffix: 'AGENTS.md', suffixType: 'highlight', comment: '← Auth rules: frozen files, JWT config' },
  { text: '│   └── ', indent: 0, type: 'plain', suffix: 'payments/', suffixType: 'dir' },
  { text: '│       └── ', indent: 0, type: 'plain', suffix: 'AGENTS.md', suffixType: 'highlight', comment: '← Payments rules: idempotency, DAL' },
  { text: '└── ', indent: 0, type: 'plain', suffix: 'shared/', suffixType: 'dir' },
  { text: '    └── ', indent: 0, type: 'plain', suffix: 'AGENTS.md', suffixType: 'highlight', comment: '← Shared module rules' },
]

const suffixColors = {
  dir:       'var(--text)',
  highlight: 'var(--accent)',
  accent:    'var(--green)',
  muted:     'var(--text-muted)',
}

export default function FileTree() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-lg p-5 overflow-x-auto"
      style={{ background: 'var(--code-bg)', border: '1px solid var(--border)' }}
    >
      <div className="file-tree whitespace-pre" style={{ fontSize: '0.78rem', lineHeight: '1.9' }}>
        {lines.map((line, i) => (
          <div key={i}>
            <span style={{ color: 'var(--text-muted)' }}>{line.text}</span>
            {line.suffix && (
              <span style={{ color: suffixColors[line.suffixType] || 'var(--text)' }}>
                {line.suffix}
              </span>
            )}
            {line.comment && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                {'  '}{line.comment}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
