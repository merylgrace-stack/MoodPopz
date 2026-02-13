import { useState } from 'react'
import { MOODS, TASKS, RANDOM_TASKS, QUOTES } from '../data/moods'
import { useStreak } from '../hooks/useStreak'
import { useMusic } from '../hooks/useMusic'
import MoodSelector from './MoodSelector'
import SpinWheel from './SpinWheel'
import SingleTaskView from './SingleTaskView'
import QuoteView from './QuoteView'
import WhisperingWaves from './WhisperingWaves'
import StreakRing from './StreakRing'
import SettingsDrawer from './SettingsDrawer'
import './MainApp.css'

const MOODS_WITH_DUMP_BOX = ['overthinking', 'other']

function pickRandomTasks(count = 6) {
  const shuffled = [...RANDOM_TASKS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function MainApp({ onReset, initialMood }) {
  const [phase, setPhase] = useState(initialMood ? 'wheel' : 'moods')
  const [selectedMood, setSelectedMood] = useState(initialMood || null)
  const [tasks, setTasks] = useState(
    initialMood ? (initialMood.id === 'other' ? pickRandomTasks(6) : TASKS[initialMood.id] || []) : []
  )
  const [selectedTask, setSelectedTask] = useState(null)
  const [quote, setQuote] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { streak, totalCompleted, recordCompletion } = useStreak()
  const { enabled: musicEnabled, toggle: toggleMusic } = useMusic()

  const needsDumpBox = selectedMood && MOODS_WITH_DUMP_BOX.includes(selectedMood.id)

  function handleMoodSelect(mood) {
    setSelectedMood(mood)
    setTasks(mood.id === 'other' ? pickRandomTasks(6) : TASKS[mood.id] || [])
    setSelectedTask(null)
    setPhase('wheel')
  }

  function handleRandomTask() {
    handleMoodSelect(MOODS.find((m) => m.id === 'other'))
  }

  function handleSpinComplete(task) {
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

  if (phase === 'quote') {
    return (
      <>
        <WhisperingWaves />
        <QuoteView
          quote={quote}
          streak={streak}
          totalCompleted={totalCompleted}
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
        <WhisperingWaves />
        <SingleTaskView
          mood={selectedMood}
          task={selectedTask}
          showDumpBox={needsDumpBox}
          dumpBoxPrompt={
            selectedMood?.id === 'overthinking'
              ? "Dump thoughts here — nothing saved 💨"
              : selectedMood?.id === 'other'
                ? 'Optional: type anything — nothing saved.'
                : null
          }
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
        <WhisperingWaves />
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
    <main id="main" className="breath-main" role="main">
      <WhisperingWaves />
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
        onFreshStart={() => {
          setPhase('moods')
          setSelectedMood(null)
        }}
      />
    </main>
  )
}
