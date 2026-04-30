import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import PricingCard from '../components/PricingCard'

const tiers = {
  monthly: [
    {
      tier: 'Free',
      price: '$0',
      period: '/mo',
      features: ['Public repos', '3 workflow templates', 'Community support', '1 user'],
      cta: 'Get started',
      ctaHref: '/docs',
    },
    {
      tier: 'Pro',
      price: '$X',
      period: '/mo',
      features: ['Private repos', 'All workflow templates', 'agent.md generator', 'Priority support', 'Unlimited repos'],
      cta: 'Start free trial',
      ctaHref: '/docs',
      highlight: true,
    },
    {
      tier: 'Team',
      price: '$X',
      period: '/seat/mo',
      features: ['Everything in Pro', 'SSO + audit logs', 'Custom workflows', 'Dedicated onboarding', 'SLA guarantee'],
      cta: 'Talk to us',
      ctaHref: '#',
    },
  ],
  annual: [
    {
      tier: 'Free',
      price: '$0',
      period: '/mo',
      features: ['Public repos', '3 workflow templates', 'Community support', '1 user'],
      cta: 'Get started',
      ctaHref: '/docs',
    },
    {
      tier: 'Pro',
      price: '$X',
      period: '/mo · billed annually',
      features: ['Private repos', 'All workflow templates', 'agent.md generator', 'Priority support', 'Unlimited repos'],
      cta: 'Start free trial',
      ctaHref: '/docs',
      highlight: true,
    },
    {
      tier: 'Team',
      price: '$X',
      period: '/seat/mo · billed annually',
      features: ['Everything in Pro', 'SSO + audit logs', 'Custom workflows', 'Dedicated onboarding', 'SLA guarantee'],
      cta: 'Talk to us',
      ctaHref: '#',
    },
  ],
}

const comparisonFeatures = [
  { label: 'Public repos', free: true, pro: true, team: true },
  { label: 'Private repos', free: false, pro: true, team: true },
  { label: 'Workflow templates', free: '3', pro: '20+', team: '20+ custom' },
  { label: 'agent.md generator', free: false, pro: true, team: true },
  { label: 'Deploy hooks', free: false, pro: true, team: true },
  { label: 'Preview environments', free: false, pro: true, team: true },
  { label: 'Custom workflows', free: false, pro: false, team: true },
  { label: 'SSO + audit logs', free: false, pro: false, team: true },
  { label: 'Priority support', free: false, pro: true, team: true },
  { label: 'Dedicated onboarding', free: false, pro: false, team: true },
  { label: 'SLA guarantee', free: false, pro: false, team: true },
]

const faqs = [
  {
    q: 'What counts as a workflow template?',
    a: 'A workflow template is a reusable GitHub Actions workflow file that you can reference in your project. Free accounts get access to 3 core templates (CI, basic deploy, PR checks). Pro and Team get access to the full library of 20+ templates.',
  },
  {
    q: 'Can I use ActionsCI with private repos on the Free plan?',
    a: 'The Free plan is limited to public repositories. If you need private repo support, upgrade to Pro. We offer a 14-day free trial with no credit card required.',
  },
  {
    q: 'How does the seat-based pricing for Team work?',
    a: 'Team pricing is charged per seat — meaning per user who actively uses ActionsCI workflows in your organization. Billing is based on peak seats in a given month.',
  },
  {
    q: 'Do you offer discounts for open-source projects?',
    a: 'Yes — maintainers of popular open-source projects can apply for a complimentary Pro plan. Reach out to us with your project\'s GitHub link.',
  },
  {
    q: 'What happens to my workflows if I downgrade?',
    a: 'Your workflows keep running. You retain access to whatever templates you already referenced. You\'ll simply lose access to Pro-only features like the agent.md generator and new Pro templates going forward.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Yes — Pro comes with a 14-day free trial. No credit card required to start. You can upgrade, downgrade, or cancel at any time.',
  },
  {
    q: 'Do you offer annual billing discounts?',
    a: 'Yes. Annual billing saves you approximately 20% compared to monthly billing across Pro and Team plans.',
  },
]

function TableCell({ value }) {
  if (value === true) return <Check size={16} style={{ color: 'var(--accent)' }} className="mx-auto" />
  if (value === false) return <Minus size={16} style={{ color: 'var(--border)' }} className="mx-auto" />
  return <span className="text-xs font-mono" style={{ color: 'var(--text)' }}>{value}</span>
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <button
        className="w-full text-left flex items-center justify-between px-5 py-4 font-mono text-sm gap-4 transition-colors"
        style={{ background: open ? 'rgba(0,255,136,0.04)' : 'var(--surface)', color: 'var(--text)' }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span
          className="flex-shrink-0 transition-transform duration-200 text-lg leading-none"
          style={{ color: 'var(--accent)', transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)', background: 'var(--surface)' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4" style={{ color: 'var(--text)' }}>
            Simple pricing for every team.
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
            No hidden fees. No per-workflow charges. Start free, scale when ready.
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center rounded-lg p-1 gap-1"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {['monthly', 'annual'].map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-4 py-1.5 rounded text-sm font-mono transition-all duration-200 capitalize"
                style={{
                  background: billing === b ? 'var(--accent)' : 'transparent',
                  color: billing === b ? '#0a0a0a' : 'var(--muted)',
                }}
              >
                {b}
                {b === 'annual' && (
                  <span
                    className="ml-2 text-xs px-1.5 py-0.5 rounded"
                    style={{
                      background: billing === 'annual' ? 'rgba(0,0,0,0.2)' : 'rgba(0,255,136,0.15)',
                      color: billing === 'annual' ? '#0a0a0a' : 'var(--accent)',
                    }}
                  >
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers[billing].map((tier, i) => (
            <PricingCard key={tier.tier} {...tier} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-mono font-bold mb-8 text-center"
            style={{ color: 'var(--text)' }}
          >
            Feature comparison
          </motion.h2>

          <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm" style={{ background: 'var(--surface)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left px-5 py-4 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)', width: '40%' }}>
                    Feature
                  </th>
                  {['Free', 'Pro', 'Team'].map(t => (
                    <th key={t} className="text-center px-4 py-4 font-mono text-xs tracking-widest uppercase" style={{ color: t === 'Pro' ? 'var(--accent)' : 'var(--muted)' }}>
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat, i) => (
                  <tr
                    key={feat.label}
                    style={{ borderBottom: i < comparisonFeatures.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--muted)' }}>{feat.label}</td>
                    <td className="px-4 py-3.5 text-center"><TableCell value={feat.free} /></td>
                    <td className="px-4 py-3.5 text-center"><TableCell value={feat.pro} /></td>
                    <td className="px-4 py-3.5 text-center"><TableCell value={feat.team} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-mono font-bold mb-8 text-center"
            style={{ color: 'var(--text)' }}
          >
            Frequently asked questions
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <FaqItem {...faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
