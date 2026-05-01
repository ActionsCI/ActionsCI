import { Link } from 'react-router-dom'

const resources = [
  { label: 'GitHub Organization ↗', href: 'https://github.com/ActionsCI', external: true },
  { label: 'reusable-workflows ↗', href: 'https://github.com/ActionsCI/reusable-workflows', external: true },
  { label: 'node-agentic-scaffold ↗', href: 'https://github.com/ActionsCI/node-agentic-scaffold', external: true },
  { label: 'docker-build-push ↗', href: 'https://github.com/ActionsCI/docker-build-push', external: true },
  { label: 'compute-semver ↗', href: 'https://github.com/ActionsCI/compute-semver', external: true },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <p
              className="font-mono font-bold text-base mb-2"
              style={{ color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              ActionsCI
            </p>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              Open source · MIT licensed
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              #EngineeringInTheAgentEra
            </p>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              Resources
            </p>
            <ul className="space-y-2">
              {resources.map(r => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-sm"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          © 2025 ActionsCI. Open source. MIT licensed.
        </div>
      </div>
    </footer>
  )
}
