import { useState, useEffect } from 'react'
import DumpBox from './DumpBox'
import DoodleZone from './DoodleZone'
import TaskTimer from './TaskTimer'
import { getTimerFromTask, isDoodleTask } from '../utils/taskTimer'
import { getMeaningForTask } from '../data/taskMeanings'
import { FUN_FACTS } from '../data/moods'
import './TaskActionContent.css'

const STRETCH_INSTRUCTIONS = [
  '1. Roll your shoulders back 3 times',
  '2. Gently tilt your head side to side',
  '3. Reach your arms overhead and stretch',
]

export default function TaskActionContent({ task }) {
  const [funFact] = useState(() => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])

  // Smart Detection
  const timer = getTimerFromTask(task)
  const isDoodle = isDoodleTask(task)
  const meaning = getMeaningForTask(task)
  const isWriting = /write|list|name|journal|dump/i.test(task)

  // Specific overrides for complex tasks
  if (task === 'Gentle Stretch') {
    return (
      <div className="task-action">
        <ul className="task-action-list">
          {STRETCH_INSTRUCTIONS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        {meaning && <p className="task-meaning-text">💡 {meaning}</p>}
      </div>
    )
  }

  if (task === 'Fun Fact') {
    return <p className="task-action-funfact">"{funFact}"</p>
  }

  // Generic Handlers
  if (isDoodle) {
    return (
      <div className="task-action-container">
        <DoodleZone />
        {meaning && <p className="task-meaning-text">💡 {meaning}</p>}
      </div>
    )
  }

  if (timer) {
    return (
      <div className="task-action-container">
        <TaskTimer task={task} />
        {meaning && <p className="task-meaning-text">💡 {meaning}</p>}
      </div>
    )
  }

  if (isWriting) {
    return (
      <div className="task-action-container">
        <DumpBox
          prompt={task}
          onDone={() => { }}
          inline
        />
        {meaning && <p className="task-meaning-text">💡 {meaning}</p>}
      </div>
    )
  }

  // Fallback for simple instruction tasks
  return (
    <div className="task-action-container">
      {meaning && <p className="task-meaning-text">💡 {meaning}</p>}
    </div>
  )
}
