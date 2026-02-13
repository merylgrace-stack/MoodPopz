import { useState, useEffect } from 'react'
import { MOODS, TASKS, ALL_TASKS, QUOTES, ENTRY_QUOTES } from '../data/moods'
import { useStreak } from '../hooks/useStreak'
import { useMusic } from '../hooks/useMusic'
import MoodSelector from './MoodSelector'
import SpinWheel from './SpinWheel'
import SingleTaskView from './SingleTaskView'
import QuoteView from './QuoteView'
import FrequencyWave from './FrequencyWave'
import StreakRing from './StreakRing'
import SettingsDrawer from './SettingsDrawer'
import LoginPage from './LoginPage'
import './MainApp.css'

export default function MainApp({ onReset, initialMood }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [phase, setPhase] = useState(initialMood ? 'wheel' : 'moods')
  const [selectedMood, setSelectedMood] = useState(initialMood || null)
  const [tasks, setTasks] = useState(
    initialMood ? (TASKS[initialMood.id] || []) : []
  )
  const [spinKey, setSpinKey] = useState(0)
  const [selectedTask, setSelectedTask] = useState(null)
  const [quote, setQuote] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { streak, totalCompleted, recordCompletion, weeklyCount, monthlyCount } = useStreak()
  const { enabled: musicEnabled, toggle: toggleMusic, frequency, setFrequency, analyser } = useMusic()
  const [entryQuote, setEntryQuote] = useState(() =>
    ENTRY_QUOTES[Math.floor(Math.random() * ENTRY_QUOTES.length)]
  )

  useEffect(() => {
    // Check login
    const user = localStorage.getItem('moodpop_user')
    if (user) setIsLoggedIn(true)
  }, [])

  useEffect(() => {
    if (phase === 'moods') {
      setEntryQuote(ENTRY_QUOTES[Math.floor(Math.random() * ENTRY_QUOTES.length)])
    }
  }, [phase])

  function handleLogin() {
    localStorage.setItem('moodpop_user', 'true')
    setIsLoggedIn(true)
  }

  function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('moodpop_user')
      setIsLoggedIn(false)
      setSettingsOpen(false)
    }
  }

  function handleMoodSelect(mood) {
    setSelectedMood(mood)
    setTasks(TASKS[mood.id] || [])
    setSelectedTask(null)
    setPhase('wheel')
  }

  function handleRandomTask() {
    handleMoodSelect(MOODS.find((m) => m.id === 'other'))
  }

  function handleSpinComplete(task) {
    if (task === 'Spin Again') {
      setSpinKey((k) => k + 1)
      return
    }
    if (task === 'Surprise Task') {
      const pick = ALL_TASKS[Math.floor(Math.random() * ALL_TASKS.length)]
      setSelectedTask(pick)
      setPhase('task')
      return
    }
    setSelectedTask(task)
    setPhase('task')
  }

  function handleTaskDone() {
    recordCompletion()
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
    setPhase('quote')
  }

  function handleQuoteDone() {
    setPhase('moods')
    setSelectedMood(null)
    setSelectedTask(null)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (phase === 'quote') {
    return (
      <>
        <FrequencyWave analyser={analyser} moodId={selectedMood?.id} />
        <QuoteView
          quote={quote}
          streak={streak}
          totalCompleted={totalCompleted}
          weeklyCount={weeklyCount}
          monthlyCount={monthlyCount}
          completedTask={selectedTask}
          onContinue={handleQuoteDone}
          onReset={onReset}
        />
      </>
    )
  }

  if (phase === 'task' && selectedTask) {
    return (
      <>
        <FrequencyWave analyser={analyser} moodId={selectedMood?.id} />
        <SingleTaskView
          mood={selectedMood}
          task={selectedTask}
          onTaskDone={handleTaskDone}
          onBack={() => {
            setPhase('moods')
            setSelectedMood(null)
            setSelectedTask(null)
          }}
          onReset={onReset}
        />
      </>
    )
  }

  if (phase === 'wheel' && selectedMood && tasks.length > 0) {
    return (
      <>
        <FrequencyWave analyser={analyser} moodId={selectedMood?.id} />
        <main id="main" className="breath-wheel-view" role="main">
          <button
            className="breath-btn breath-back"
            onClick={() => setPhase('moods')}
            aria-label="Back to mood selection"
          >
            Back
          </button>
          <div className="breath-wheel-content">
            <div
              className="breath-mood-expand"
              style={{ '--mood-color': selectedMood.color }}
            >
              <span className="breath-mood-emoji">{selectedMood.emoji}</span>
              <h2 className="breath-mood-title">{selectedMood.label}</h2>
            </div>
            <p className="breath-wheel-prompt">Ready to spin?</p>
            <SpinWheel
              key={spinKey}
              tasks={tasks}
              mood={selectedMood}
              onSpinComplete={handleSpinComplete}
            />
          </div>
        </main>
      </>
    )
  }

  return (
    <main id="main" className="breath-main breath-home-vintage" role="main">
      <FrequencyWave analyser={analyser} />
      <header className="breath-header">
        <StreakRing streak={streak} totalCompleted={totalCompleted} />
        <button
          className="breath-btn breath-settings"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          ⚙
        </button>
        <button
          className="breath-btn breath-home"
          onClick={onReset}
          aria-label="Go to home"
        >
          Home
        </button>
      </header>
      <div className="breath-content">
        <blockquote className="breath-entry-quote">"{entryQuote}"</blockquote>
        <h2 className="breath-title">How's your head feeling?</h2>
        <p className="breath-subtitle">Choose a mood — the wheel picks one small thing</p>
        <MoodSelector moods={MOODS} onSelect={handleMoodSelect} />
        <button
          className="breath-cta-spin"
          onClick={handleRandomTask}
          aria-label="Give me one small thing at random"
        >
          ✨ Give me one small thing
        </button>
      </div>
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        musicEnabled={musicEnabled}
        onMusicToggle={toggleMusic}
        frequency={frequency}
        onFrequencyChange={setFrequency}
        onLogout={handleLogout}
        onFreshStart={() => {
          setPhase('moods')
          setSelectedMood(null)
        }}
      />
    </main>
  )
}
