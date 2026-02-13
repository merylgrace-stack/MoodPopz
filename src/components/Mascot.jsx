import './Mascot.css'

const REACTIONS = {
  idle: '😊',
  happy: '🌟',
  celebrating: '🎉',
  proud: '💪',
}

export default function Mascot({ tasksCompleted, totalTasks }) {
  const progress = totalTasks > 0 ? tasksCompleted / totalTasks : 0
  let reaction = 'idle'
  if (tasksCompleted >= totalTasks && totalTasks > 0) reaction = 'celebrating'
  else if (progress >= 0.75) reaction = 'proud'
  else if (progress >= 0.5) reaction = 'happy'

  return (
    <div className={`mascot mascot-${reaction}`} aria-hidden="true">
      <span className="mascot-emoji">{REACTIONS[reaction]}</span>
    </div>
  )
}
