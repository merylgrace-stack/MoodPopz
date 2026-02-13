import { useState, useEffect } from 'react'
import './SpinWheel.css'

const COLORS = ['#E8F0FE', '#D4E4D3', '#FFF8E7', '#A7C7E7', '#B2D8B2', '#F5D0C5']

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
  const gradientStops = tasks
    .map((_, i) => `${COLORS[i % COLORS.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`)
    .join(', ')

  return (
    <div className="spin-wheel-container breath">
      <div className="spin-wheel-wrapper breath">
        <div
          className={`spin-wheel breath ${spinning ? 'spinning' : ''}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${gradientStops})`,
          }}
        >
          <div className="wheel-center breath" />
        </div>
        <div className="wheel-pointer breath">▼</div>
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
