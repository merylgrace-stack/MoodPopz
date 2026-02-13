import { useState, useEffect } from 'react'
import './SpinWheel.css'

const COLORS = ['#E8DCC4', '#9CAF88', '#D4A54A', '#C4A77D', '#B2D8B2', '#F5D0C5']

function wrapText(text, maxLen = 18) {
  if (text.length <= maxLen) return [text]
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const w of words) {
    if (current && (current + ' ' + w).length > maxLen) {
      lines.push(current.trim())
      current = w
    } else {
      current = current ? current + ' ' + w : w
    }
  }
  if (current) lines.push(current.trim())
  return lines.slice(0, 2)
}

export default function SpinWheel({ tasks, mood, onSpinComplete }) {
  const [spinning, setSpinning] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    if (!tasks || tasks.length === 0) return

    const targetIndex = Math.floor(Math.random() * tasks.length)
    const segmentAngle = 360 / tasks.length
    const targetAngle = 360 - (targetIndex * segmentAngle + segmentAngle / 2)
    const fullSpins = 5 + Math.floor(Math.random() * 2)
    const finalRotation = fullSpins * 360 + targetAngle

    setRotation(finalRotation)

    const timer = setTimeout(() => {
      setSpinning(false)
      setSelectedTask(tasks[targetIndex])
      onSpinComplete?.(tasks[targetIndex])
    }, 4000)

    return () => clearTimeout(timer)
  }, [tasks?.length])

  if (!tasks || tasks.length === 0) return null

  const segmentAngle = 360 / tasks.length
  const size = 420
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 8
  const offset = -90

  function getArcPath(startDeg, endDeg) {
    const start = ((startDeg + offset) * Math.PI) / 180
    const end = ((endDeg + offset) * Math.PI) / 180
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = endDeg - startDeg >= 180 ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="spin-wheel-container breath">
      <div className="spin-wheel-wrapper breath">
        <div className="wheel-pointer breath" aria-hidden="true">
          <span className="wheel-pointer-arrow">▼</span>
        </div>
        <div
          className={`spin-wheel breath ${spinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox={`0 0 ${size} ${size}`} className="wheel-svg">
            <defs>
              <filter id="wheel-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.12" />
              </filter>
              <filter id="segment-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {tasks.map((task, i) => {
              const start = i * segmentAngle
              const end = (i + 1) * segmentAngle
              const midDeg = start + segmentAngle / 2
              const midRad = ((midDeg + offset) * Math.PI) / 180
              const labelRadius = r * 0.58
              const tx = cx + labelRadius * Math.cos(midRad)
              const ty = cy + labelRadius * Math.sin(midRad)
              const textRotation = midDeg + offset + 90
              const lines = wrapText(task, Math.max(12, Math.floor(28 / tasks.length)))
              return (
                <g key={i}>
                  <path
                    d={getArcPath(start, end)}
                    fill={COLORS[i % COLORS.length]}
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                    filter="url(#wheel-shadow)"
                  />
                  <g
                    transform={`translate(${tx}, ${ty}) rotate(${textRotation})`}
                    className="wheel-segment-text-wrap"
                  >
                    {lines.map((line, j) => (
                      <text
                        key={j}
                        x={0}
                        y={j * 12 - (lines.length - 1) * 6}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="wheel-segment-text"
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                </g>
              )
            })}
          </svg>
          <div className="wheel-center breath">
            <span className="wheel-center-label">Spin</span>
          </div>
        </div>
      </div>
      {!spinning && selectedTask ? (
        <p className="wheel-result breath" role="status">
          You got: <strong>{selectedTask}</strong>
        </p>
      ) : (
        <p className="wheel-hint breath">Spinning...</p>
      )}
    </div>
  )
}
