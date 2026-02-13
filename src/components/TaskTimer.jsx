import { useState, useEffect } from 'react'
import { getTimerFromTask } from '../utils/taskTimer'
import './TaskTimer.css'

export default function TaskTimer({ task, onComplete }) {
  const timer = getTimerFromTask(task)
  const [remaining, setRemaining] = useState(timer?.value ?? 0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!timer || !running) return
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          onComplete?.()
          return 0
        }
        return r - 1
      })
    }, timer.type === 'breaths' ? 4000 : 1000)
    return () => clearInterval(interval)
  }, [timer?.type, running, onComplete])

  if (!timer) return null

  if (!running) {
    return (
      <div className="task-timer">
        <button
          type="button"
          className="task-timer-start"
          onClick={() => setRunning(true)}
        >
          {timer.type === 'breaths'
            ? `Start ${timer.value} breaths`
            : `Start ${timer.value}s timer`}
        </button>
      </div>
    )
  }

  if (timer.type === 'breaths') {
    return (
      <div className="task-timer task-timer-breath">
        <span className="task-timer-count">{remaining}</span>
        <span className="task-timer-label">breath{remaining !== 1 ? 's' : ''} left</span>
      </div>
    )
  }

  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  return (
    <div className="task-timer">
      <span className="task-timer-count">
        {m ? `${m}:` : ''}{String(s).padStart(m ? 2 : 1, '0')}
      </span>
      <span className="task-timer-label">remaining</span>
    </div>
  )
}
