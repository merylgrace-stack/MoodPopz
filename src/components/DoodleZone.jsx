import { useRef, useState, useEffect } from 'react'
import './DoodleZone.css'

export default function DoodleZone() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#3D3228')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.fillStyle = '#F5F0E6'
    ctx.fillRect(0, 0, rect.width, rect.height)
  }, [])

  function getPos(e) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function startDraw(e) {
    setIsDrawing(true)
    const { x, y } = getPos(e)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }
  }

  function draw(e) {
    if (!isDrawing) return
    const { x, y } = getPos(e)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  function stopDraw() {
    setIsDrawing(false)
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.fillStyle = '#F5F0E6'
    ctx.fillRect(0, 0, rect.width, rect.height)
  }

  const colors = ['#3D3228', '#C4743C', '#9CAF88', '#D4A54A', '#B85C38']

  return (
    <div className="doodle-zone">
      <h3 className="doodle-title">Doodle here ✏️</h3>
      <div className="doodle-toolbar">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={`doodle-color-btn ${color === c ? 'active' : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            aria-label={`Color ${c}`}
          />
        ))}
        <button type="button" className="doodle-clear-btn" onClick={clearCanvas}>
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="doodle-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={(e) => startDraw(e.touches[0])}
        onTouchMove={(e) => draw(e.touches[0])}
        onTouchEnd={stopDraw}
      />
    </div>
  )
}
