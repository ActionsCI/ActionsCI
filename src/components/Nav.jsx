import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Github, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Workflows', to: '/workflows' },
  { label: 'Scaffolds', to: '/scaffolds' },
  { label: 'Docs', to: '/docs' },
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  const toggle = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('theme', next) } catch (e) {}
      return next
    })
  }, [])

  return [theme, toggle]
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--text)' : 'var(--text-muted)',
    fontWeight: isActive ? '500' : '400',
  })

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono font-bold text-base tracking-tight flex-shrink-0"
          style={{ color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          ActionsCI
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm transition-colors duration-150 hover:text-[var(--text)]"
              style={linkStyle}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded transition-colors duration-150 hover:bg-[var(--surface)]"
            style={{ color: 'var(--text-muted)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="https://github.com/ActionsCI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded transition-colors duration-150"
            style={{
              color: 'var(--text)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <Github size={14} />
            View on GitHub ↗
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm py-2 px-3 rounded transition-colors"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                    background: isActive ? 'var(--surface)' : 'transparent',
                  })}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="https://github.com/ActionsCI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm py-2 px-3 rounded mt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                <Github size={14} />
                View on GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
