export default function CodeBlock({ code, language = 'yaml', className = '' }) {
  const lines = code.trim().split('\n')

  const tokenize = (line) => {
    if (language !== 'yaml') return [{ text: line, type: 'plain' }]

    const tokens = []

    if (line.trimStart().startsWith('#')) {
      tokens.push({ text: line, type: 'comment' })
      return tokens
    }

    const keyMatch = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)$/)
    if (keyMatch) {
      const [, indent, key, sep, value] = keyMatch
      tokens.push({ text: indent, type: 'plain' })
      tokens.push({ text: key, type: 'key' })
      tokens.push({ text: sep, type: 'plain' })
      if (value) tokens.push({ text: value, type: 'value' })
    } else {
      const listMatch = line.match(/^(\s*-\s*)(.*)$/)
      if (listMatch) {
        tokens.push({ text: listMatch[1], type: 'accent' })
        tokens.push({ text: listMatch[2], type: 'value' })
      } else {
        tokens.push({ text: line, type: 'plain' })
      }
    }

    return tokens
  }

  const colorMap = {
    comment: 'var(--muted)',
    key: 'var(--accent)',
    value: '#e5c07b',
    accent: 'var(--accent-2)',
    plain: 'var(--text)',
  }

  return (
    <div
      className={`rounded-lg overflow-hidden text-sm ${className}`}
      style={{ background: 'var(--code-bg)', border: '1px solid var(--border)' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
        <span className="w-2.5 h-2.5 rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
        <span className="ml-2 text-xs font-mono" style={{ color: 'var(--muted)' }}>agent.md</span>
      </div>

      <pre className="p-5 overflow-x-auto leading-6">
        <code className="font-mono">
          {lines.map((line, i) => {
            const tokens = tokenize(line)
            return (
              <div key={i}>
                {tokens.map((token, j) => (
                  <span key={j} style={{ color: colorMap[token.type] }}>
                    {token.text}
                  </span>
                ))}
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
