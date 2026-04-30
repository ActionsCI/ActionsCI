import { useState, useEffect } from 'react'

const lines = [
  { text: '$ npx actionci init my-app', type: 'command' },
  { text: '✔ Detected: Node 20 + Vite', type: 'success' },
  { text: '✔ Scaffolding workflow files...', type: 'success' },
  { text: '✔ agent.md written', type: 'success' },
  { text: '✔ Ready. Deploy with: vercel --prod', type: 'success' },
  { text: '🚀 Done in 4.2s', type: 'done' },
]

const CHAR_SPEED = 30
const LINE_PAUSE = 200
const RESTART_DELAY = 3000

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine(0)
        setCurrentChar(0)
        setDone(false)
      }, RESTART_DELAY)
      return () => clearTimeout(t)
    }

    if (currentLine >= lines.length) {
      setDone(true)
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.text.length) {
      const t = setTimeout(() => {
        setCurrentChar(c => c + 1)
      }, line.type === 'command' ? CHAR_SPEED : CHAR_SPEED / 2)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { ...line, text: line.text }])
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, LINE_PAUSE)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar, done])

  const currentLineText = !done && currentLine < lines.length
    ? lines[currentLine].text.slice(0, currentChar)
    : null

  return (
    <div
      className="terminal-glow rounded-lg overflow-hidden w-full max-w-xl mx-auto"
      style={{ background: 'var(--code-bg)', border: '1px solid rgba(0,255,136,0.3)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
        <span className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)', opacity: 0.7 }} />
        <span className="ml-2 text-xs font-mono" style={{ color: 'var(--muted)' }}>terminal</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-40 font-mono text-sm leading-7">
        {displayedLines.map((line, i) => (
          <div key={i}>
            <LineText line={line} />
          </div>
        ))}
        {currentLineText !== null && (
          <div>
            <LineText line={{ ...lines[currentLine], text: currentLineText }} typing />
          </div>
        )}
      </div>
    </div>
  )
}

function LineText({ line, typing }) {
  const color =
    line.type === 'command' ? 'var(--text)' :
    line.type === 'success' ? 'var(--accent)' :
    line.type === 'done' ? 'var(--accent-2)' :
    'var(--muted)'

  return (
    <span style={{ color }}>
      {line.text}
      {typing && (
        <span
          className="cursor-blink inline-block w-2 h-4 ml-0.5 align-middle"
          style={{ background: 'var(--accent)' }}
        />
      )}
    </span>
  )
}
