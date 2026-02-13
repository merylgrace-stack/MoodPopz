import './StreakRing.css'

export default function StreakRing({ streak, totalCompleted }) {
  const maxStreak = 7
  const fillPercent = Math.min((streak / maxStreak) * 100, 100)

  return (
    <div className="streak-ring-wrap">
      <div className="streak-ring" role="img" aria-label={`${streak} day streak`}>
        <svg viewBox="0 0 100 100">
          <circle
            className="streak-ring-bg"
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
          />
          <circle
            className="streak-ring-fill"
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
            strokeDasharray={`${fillPercent * 2.64} 264`}
            strokeLinecap="round"
          />
        </svg>
        <span className="streak-ring-count">{streak}</span>
      </div>
      <p className="streak-ring-label">
        {streak} gentle day{streak !== 1 ? 's' : ''} ✨
      </p>
      {totalCompleted > 0 && (
        <p className="streak-ring-total">{totalCompleted} done</p>
      )}
    </div>
  )
}
