import { useState } from 'react'
import './Feedback.css'

const RATINGS = [
  { emoji: '😌', label: 'Calm' },
  { emoji: '👍', label: 'Good' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😐', label: 'Meh' },
  { emoji: '😔', label: 'Hard' },
]

const STORAGE_KEY = 'moodpop_feedback'

function saveFeedback(task, index) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existing.push({ task: task || 'task', rating: 5 - index, date: new Date().toISOString() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-50)))
  } catch {}
}

export default function Feedback({ task, onSubmit }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (selected !== null) {
      saveFeedback(task, selected)
      setSubmitted(true)
      setTimeout(() => onSubmit?.(), 400)
    }
  }

  if (submitted) return null

  return (
    <div className="breath-feedback">
      <p className="breath-feedback-prompt">How did that feel?</p>
      <div className="breath-feedback-ratings" role="group" aria-label="Rate your experience">
        {RATINGS.map((r, i) => (
          <button
            key={i}
            type="button"
            className={`breath-feedback-btn ${selected === i ? 'selected' : ''}`}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            aria-label={r.label}
          >
            {r.emoji}
          </button>
        ))}
      </div>
      <p className="breath-feedback-thanks">Thanks — you're doing great.</p>
      <button
        className="breath-feedback-submit"
        onClick={handleSubmit}
        disabled={selected === null}
      >
        {selected !== null ? 'Submit & choose again' : 'Pick a reaction'}
      </button>
    </div>
  )
}
