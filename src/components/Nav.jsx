import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          <span style={{ color: 'var(--accent)' }}>▶</span>
          ActionsCI
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            link.href.startsWith('/#') ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--muted)' }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'hover:text-white'}`
                }
                style={({ isActive }) => ({ color: isActive ? 'var(--text)' : 'var(--muted)' })}
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/actionsci"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'var(--muted)' }}
          >
            <Github size={16} />
            GitHub
          </a>
          <Link
            to="/docs"
            className="px-4 py-1.5 rounded text-sm font-medium font-mono transition-all duration-200 hover:opacity-90"
            style={{
              background: 'var(--accent)',
              color: '#0a0a0a',
            }}
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded transition-colors"
          style={{ color: 'var(--muted)' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 px-6 pb-6 pt-4 flex flex-col gap-4"
            style={{
              background: 'rgba(10,10,10,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {navLinks.map(link => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base py-1"
                  style={{ color: 'var(--text)' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="text-base py-1"
                  style={{ color: 'var(--text)' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            ))}
            <a
              href="https://github.com/actionsci"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base py-1"
              style={{ color: 'var(--muted)' }}
            >
              <Github size={16} /> GitHub ↗
            </a>
            <Link
              to="/docs"
              className="mt-2 px-4 py-2 rounded text-sm font-medium font-mono text-center"
              style={{ background: 'var(--accent)', color: '#0a0a0a' }}
              onClick={() => setOpen(false)}
            >
              Get Started →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
