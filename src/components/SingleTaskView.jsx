import { useState } from 'react'
import DumpBox from './DumpBox'
import BreathingDot from './BreathingDot'
import Confetti from './Confetti'
import { playChime } from '../utils/sound'
import './SingleTaskView.css'

export default function SingleTaskView({
  mood,
  task,
  showDumpBox,
  dumpBoxPrompt,
  onTaskDone,
  onBack,
  onReset,
}) {
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [dumpClosed, setDumpClosed] = useState(false)
  const [soundEnabled] = useState(() => {
    try {
      return localStorage.getItem('moodpop_sound') !== 'false'
    } catch {
      return true
    }
  })

  function handleDone() {
    setConfettiTrigger((t) => t + 1)
    if (soundEnabled) playChime()
    onTaskDone?.()
  }

  return (
    <main id="main" className="breath-task-view" role="main">
      <Confetti trigger={confettiTrigger} />
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
          {showDumpBox && dumpBoxPrompt && mood?.id === 'overthinking' && !dumpClosed ? (
            <DumpBox
              prompt={dumpBoxPrompt}
              onDone={() => setDumpClosed(true)}
              fullscreen
              inline={false}
            />
          ) : showDumpBox && dumpBoxPrompt && (mood?.id !== 'overthinking' || dumpClosed) ? (
            mood?.id !== 'overthinking' && (
              <div className="breath-dump-wrap">
                <DumpBox prompt={dumpBoxPrompt} onDone={() => {}} inline />
                <BreathingDot />
              </div>
            )
          ) : null}
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
