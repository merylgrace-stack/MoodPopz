import { useEffect, useState } from 'react'
import './Confetti.css'

const COLORS = ['#FFD93D', '#6BCB77', '#4D96FF', '#FF6B6B', '#D6CDEA', '#A3CEF1']

function createParticles(count = 30) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    rotation: Math.random() * 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.2,
    duration: 0.8 + Math.random() * 0.4,
  }))
}

export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (trigger) {
      setParticles(createParticles())
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(t)
    }
  }, [trigger])

  if (!visible || particles.length === 0) return null

  return (
    <div className="confetti-burst" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti-particle"
          style={{
            '--x': `${p.x}vw`,
            '--y': `${p.y}vh`,
            '--rotation': `${p.rotation}deg`,
            '--color': p.color,
            '--size': `${p.size}px`,
            '--delay': `${p.delay}s`,
            '--duration': `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
