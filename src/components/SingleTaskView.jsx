import { useState } from 'react'
import TaskActionContent from './TaskActionContent'
import { playChime } from '../utils/sound'
import './SingleTaskView.css'

export default function SingleTaskView({
  mood,
  task,
  onTaskDone,
  onBack,
  onReset,
}) {
  const [soundEnabled] = useState(() => {
    try {
      return localStorage.getItem('moodpop_sound') !== 'false'
    } catch {
      return true
    }
  })

  function handleDone() {
    if (soundEnabled) playChime()
    onTaskDone?.()
  }

  return (
    <main id="main" className="breath-task-view" role="main">
      <button className="breath-btn breath-back" onClick={onBack} aria-label="Back">
        Back
      </button>
      <div className="breath-task-popup">
        <div className="breath-task-header">
          <span className="breath-task-emoji">{mood?.emoji}</span>
          <h2 className="breath-task-mood">{mood?.label}</h2>
        </div>
        <div className="breath-task-card">
          <p className="breath-task-label">Your tiny task:</p>
          <p className="breath-task-text">{task}</p>
          <TaskActionContent task={task} />
          <p className="breath-nudge">Done? Next?</p>
          <button
            className="breath-done-btn"
            onClick={handleDone}
            aria-label="Mark task as done"
          >
            ✓ Done
          </button>
        </div>
      </div>
    </main>
  )
}
