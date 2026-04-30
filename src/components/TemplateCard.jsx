import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function TemplateCard({ icon, name, stack, badge, href, delay = 0 }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="flex-shrink-0 w-56 rounded-lg p-5 flex flex-col gap-3 cursor-pointer no-underline transition-all duration-200"
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
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-mono font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>{name}</p>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>{stack}</p>
      </div>
      <span
        className="text-xs font-mono px-2 py-0.5 rounded self-start"
        style={{ background: 'rgba(0,255,136,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,255,136,0.2)' }}
      >
        {badge}
      </span>
      <div className="flex items-center gap-1 text-xs font-mono mt-auto" style={{ color: 'var(--accent)' }}>
        Use template <ArrowRight size={12} />
      </div>
    </motion.a>
  )
}
