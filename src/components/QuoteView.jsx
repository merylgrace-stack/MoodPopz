import StreakTracker from './StreakTracker'
import Feedback from './Feedback'
import './QuoteView.css'

export default function QuoteView({ quote, streak, totalCompleted, weeklyCount, monthlyCount, completedTask, onContinue, onReset }) {
  return (
    <main id="main" className="breath-quote-view" role="main">
      <button className="breath-btn breath-home-float" onClick={onReset} aria-label="Go home">
        Home
      </button>
      <div className="breath-quote-content">
        <StreakTracker
          streak={streak}
          totalCompleted={totalCompleted}
          weeklyCount={weeklyCount}
          monthlyCount={monthlyCount}
          justIncreased={true}
        />
        <blockquote className="breath-quote-text">"{quote}"</blockquote>
        <div className="breath-hearts" aria-hidden>
          <span>💚</span>
          <span>💛</span>
          <span>💚</span>
        </div>
        <Feedback task={completedTask} onSubmit={onContinue} />
        <button className="breath-continue" onClick={onContinue}>
          Choose again ✨
        </button>
      </div>
    </main>
  )
}
