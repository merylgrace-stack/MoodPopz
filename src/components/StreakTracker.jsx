import './StreakTracker.css'

const BADGES = [
  { min: 1, emoji: '🌱', label: 'First step' },
  { min: 3, emoji: '🌿', label: 'Growing' },
  { min: 5, emoji: '🌳', label: 'Flourishing' },
  { min: 7, emoji: '🌟', label: 'One week' },
  { min: 14, emoji: '🌅', label: 'Two weeks' },
  { min: 30, emoji: '🏆', label: 'One month' },
]

function getBadge(streak) {
  for (let i = BADGES.length - 1; i >= 0; i--) {
    if (streak >= BADGES[i].min) return BADGES[i]
  }
  return BADGES[0]
}

export default function StreakTracker({ streak, totalCompleted, weeklyCount, monthlyCount, justIncreased }) {
  const badge = getBadge(streak)

  return (
    <div className={`streak-tracker ${justIncreased ? 'pulse' : ''}`}>
      <div className="streak-visual">
        <span className="streak-emoji" aria-hidden="true">{badge.emoji}</span>
        <span className="streak-count">{streak}</span>
        <span className="streak-label">day{streak !== 1 ? 's' : ''} streak</span>
      </div>
      <div className="streak-badge">{badge.label}</div>
      <div className="streak-stats">
        <div className="stat-item" title="Days this week">
          <span className="stat-label">Week</span>
          <span className="stat-val">{weeklyCount || 0}</span>
        </div>
        <div className="stat-separator">/</div>
        <div className="stat-item" title="Days this month">
          <span className="stat-label">Month</span>
          <span className="stat-val">{monthlyCount || 0}</span>
        </div>
      </div>
      {totalCompleted > 0 && (
        <div className="streak-total">{totalCompleted} task{totalCompleted !== 1 ? 's' : ''} completed</div>
      )}
    </div>
  )
}
