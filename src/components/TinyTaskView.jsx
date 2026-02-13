import { useState, useCallback } from 'react'
import DumpBox from './DumpBox'
import Confetti from './Confetti'
import Mascot from './Mascot'
import { INSPIRING_IMAGE } from '../data/inspiringImage'
import { playChime } from '../utils/sound'
import './TinyTaskView.css'

export default function TinyTaskView({
  mood,
  tasks,
  showDumpBox,
  dumpBoxPrompt,
  onTaskDone,
  onDumpBoxDone,
  onReset,
}) {
  const [checkedCount, setCheckedCount] = useState(0)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [completedTasks, setCompletedTasks] = useState([])
  const [soundEnabled] = useState(() => {
    try {
      return localStorage.getItem('moodpop_sound') !== 'false'
    } catch {
      return true
    }
  })
  const isUnmotivated = mood?.id === 'unmotivated'

  const handleCheck = useCallback(() => {
    const next = checkedCount + 1
    setCheckedCount(next)
    setCompletedTasks((prev) => [...prev, tasks[checkedCount]])
    setConfettiTrigger((t) => t + 1)
    if (soundEnabled) playChime()

    // Extra confetti for 3rd/4th task (surprise!)
    if ((next === 3 || next === 4) && next < tasks.length) {
      setTimeout(() => setConfettiTrigger((t) => t + 1), 200)
    }

    if (next >= tasks.length) {
      if (showDumpBox && dumpBoxPrompt) {
        // Show dump box - don't call onTaskDone yet
      } else {
        onTaskDone?.()
      }
    }
  }, [checkedCount, tasks, showDumpBox, dumpBoxPrompt, soundEnabled, onTaskDone])

  function handleDumpBoxComplete() {
    onDumpBoxDone?.()
  }

  const allTasksChecked = tasks.length > 0 && checkedCount >= tasks.length

  return (
    <main className="tiny-task-view">
      <Confetti trigger={confettiTrigger} />
      <button className="reset-btn" onClick={onReset} aria-label="Reset and go home">
        Home
      </button>
      <div className="task-popup">
        <div className="task-header">
          <Mascot tasksCompleted={checkedCount} totalTasks={tasks.length} />
          <span className="task-mood-emoji">{mood.emoji}</span>
          <h2 className="task-mood-name">{mood.label}</h2>
        </div>

        {tasks.length > 0 && (
          <div className="task-list">
            {mood.id === 'overthinking' && dumpBoxPrompt && (
              <DumpBox prompt={dumpBoxPrompt} onDone={() => {}} inline />
            )}
            <div className="task-jar">
              {completedTasks.map((task, i) => (
                <span key={i} className="jar-task" style={{ animationDelay: `${i * 0.1}s` }}>
                  ✓ {task}
                </span>
              ))}
            </div>
            <p className="task-intro">Try these gentle steps:</p>
            <ul>
              {tasks.map((task, i) => (
                <li
                  key={i}
                  className={`task-item ${i < checkedCount ? 'checked' : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <label className="task-check">
                    <input
                      type="checkbox"
                      checked={i < checkedCount}
                      onChange={i === checkedCount ? handleCheck : undefined}
                      disabled={i > checkedCount}
                    />
                    <span className="checkmark" />
                    <span className="task-text">{task}</span>
                  </label>
                </li>
              ))}
            </ul>

            {allTasksChecked && showDumpBox && dumpBoxPrompt && mood.id !== 'overthinking' && (
              <DumpBox prompt={dumpBoxPrompt} onDone={handleDumpBoxComplete} />
            )}

            {allTasksChecked && (!showDumpBox || mood.id === 'overthinking') && (
              <button className="done-btn" onClick={() => onTaskDone?.()}>
                I did these ✨
              </button>
            )}
          </div>
        )}

        {tasks.length === 0 && showDumpBox && dumpBoxPrompt && (
          <div className="task-list">
            <DumpBox prompt={dumpBoxPrompt} onDone={handleDumpBoxComplete} />
          </div>
        )}

        {isUnmotivated && (
          <div className="inspiring-image-wrap">
            <img
              src={INSPIRING_IMAGE.url}
              alt={INSPIRING_IMAGE.alt}
              className="inspiring-image"
            />
          </div>
        )}
      </div>
    </main>
  )
}
