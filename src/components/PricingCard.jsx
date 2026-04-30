import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingCard({ tier, price, period, features, cta, ctaHref, highlight = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-lg p-7 flex flex-col gap-5"
      style={{
        background: highlight ? 'rgba(0,255,136,0.05)' : 'var(--surface)',
        border: highlight ? '1px solid rgba(0,255,136,0.4)' : '1px solid var(--border)',
      }}
    >
      {highlight && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-mono px-3 py-1 rounded-full"
          style={{ background: 'var(--accent)', color: '#0a0a0a' }}
        >
          Most popular
        </span>
      )}

      <div>
        <h3 className="font-mono font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>{tier}</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold" style={{ color: highlight ? 'var(--accent)' : 'var(--text)' }}>
            {price}
          </span>
          {period && <span className="text-sm" style={{ color: 'var(--muted)' }}>{period}</span>}
        </div>
      </div>

      <ul className="space-y-2.5 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className="block text-center py-2.5 px-4 rounded font-mono text-sm font-medium transition-all duration-200"
        style={
          highlight
            ? { background: 'var(--accent)', color: '#0a0a0a' }
            : { border: '1px solid var(--border)', color: 'var(--text)', background: 'transparent' }
        }
        onMouseEnter={e => {
          if (!highlight) {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }
        }}
        onMouseLeave={e => {
          if (!highlight) {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text)'
          }
        }}
      >
        {cta}
      </a>
    </motion.div>
  )
}
