/*
 * YAML syntax highlighter — CSS only, no external deps.
 * Covers the subset used in ActionsCI examples.
 */

const YAML_TOKENS = [
  { pattern: /^(\s*#.*)$/, type: 'comment' },
  { pattern: /^(\s*-\s)/, type: 'list-marker' },
  { pattern: /^(\s*)([\w-]+)(\s*:)/, type: 'key' },
]

const COLORS = {
  light: {
    comment:      '#6e7781',
    key:          '#0550ae',
    value:        '#0a3069',
    'list-marker':'#8250df',
    string:       '#0a3069',
    number:       '#0550ae',
    plain:        '#24292f',
    filename:     '#656d76',
  },
  dark: {
    comment:      '#8b949e',
    key:          '#79c0ff',
    value:        '#a5d6ff',
    'list-marker':'#d2a8ff',
    string:       '#a5d6ff',
    number:       '#79c0ff',
    plain:        '#e6edf3',
    filename:     '#8b949e',
  },
}

function tokenizeLine(line) {
  const trimmed = line.trimStart()

  if (trimmed.startsWith('#')) {
    return [{ text: line, type: 'comment' }]
  }

  const listMatch = line.match(/^(\s*)(- )(.*)$/)
  if (listMatch) {
    const [, indent, marker, rest] = listMatch
    const tokens = [
      { text: indent, type: 'plain' },
      { text: marker, type: 'list-marker' },
    ]
    tokens.push(...tokenizeValue(rest))
    return tokens
  }

  const keyMatch = line.match(/^(\s*)([\w.-]+)(\s*:\s*)(.*)$/)
  if (keyMatch) {
    const [, indent, key, sep, value] = keyMatch
    return [
      { text: indent, type: 'plain' },
      { text: key, type: 'key' },
      { text: sep, type: 'plain' },
      ...tokenizeValue(value),
    ]
  }

  return [{ text: line, type: 'plain' }]
}

function tokenizeValue(val) {
  if (!val) return []
  if (val.startsWith('"') || val.startsWith("'")) return [{ text: val, type: 'string' }]
  if (/^\d/.test(val)) return [{ text: val, type: 'number' }]
  return [{ text: val, type: 'value' }]
}

export default function CodeBlock({ code, filename, accentBorder = false, className = '' }) {
  const lines = code.trim().split('\n')

  return (
    <div
      className={`rounded-md overflow-hidden text-sm ${className}`}
      style={{
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderLeft: accentBorder ? '3px solid var(--accent)' : '1px solid var(--border)',
      }}
    >
      {filename && (
        <div
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono"
          style={{
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-muted)',
            background: 'var(--surface)',
          }}
        >
          <span>{filename}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto leading-6 m-0">
        <code className="font-mono" style={{ fontSize: '0.8rem' }}>
          {lines.map((line, i) => {
            const tokens = tokenizeLine(line)
            return (
              <div key={i}>
                {tokens.map((tok, j) => (
                  <span
                    key={j}
                    style={{
                      color: `var(--cb-${tok.type}, var(--code-text))`,
                    }}
                  >
                    {tok.text}
                  </span>
                ))}
              </div>
            )
          })}
        </code>
      </pre>

      {/* Inject per-theme token colors via a style tag trick using CSS vars */}
      <style>{`
        :root {
          --cb-comment:      #6e7781;
          --cb-key:          #0550ae;
          --cb-value:        #0a3069;
          --cb-list-marker:  #8250df;
          --cb-string:       #0a3069;
          --cb-number:       #0550ae;
          --cb-plain:        #24292f;
        }
        [data-theme="dark"] {
          --cb-comment:      #8b949e;
          --cb-key:          #79c0ff;
          --cb-value:        #a5d6ff;
          --cb-list-marker:  #d2a8ff;
          --cb-string:       #a5d6ff;
          --cb-number:       #79c0ff;
          --cb-plain:        #e6edf3;
        }
      `}</style>
    </div>
  )
}
