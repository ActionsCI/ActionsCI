import { Link } from 'react-router-dom'
import { Github, Twitter } from 'lucide-react'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/actionsci', external: true },
      { label: 'Discord', href: '#' },
      { label: 'Status page', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-mono font-bold text-lg mb-3" style={{ color: 'var(--text)' }}>
              <span style={{ color: 'var(--accent)' }}>▶</span>
              ActionsCI
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Ship product.<br />Not pipelines.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/actionsci"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: 'var(--muted)' }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/actionsci"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: 'var(--muted)' }}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--muted)' }}
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('/#') ? (
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--muted)' }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--muted)' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span>© 2025 ActionsCI. Built with ♥ for teams that ship.</span>
          <span className="font-mono text-xs">v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
