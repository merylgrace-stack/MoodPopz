import { useState, useEffect } from 'react'
import DumpBox from './DumpBox'
import DoodleZone from './DoodleZone'
import { FUN_FACTS } from '../data/moods'
import './TaskActionContent.css'

const STRETCH_INSTRUCTIONS = [
  '1. Roll your shoulders back 3 times',
  '2. Gently tilt your head side to side',
  '3. Reach your arms overhead and stretch',
]

export default function TaskActionContent({ task }) {
  const [breathPhase, setBreathPhase] = useState('idle')
  const [calmSeconds, setCalmSeconds] = useState(10)
  const [tapSeconds, setTapSeconds] = useState(10)
  const [squeezeSeconds, setSqueezeSeconds] = useState(10)
  const [tenseSeconds, setTenseSeconds] = useState(5)
  const [funFact] = useState(() => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])

  /* 3 Slow Breaths / 1 Deep Breath — 5 sec breathing with inhale/exhale */
  useEffect(() => {
    if ((task !== '3 Slow Breaths' && task !== '1 Deep Breath') || breathPhase !== 'running') return
    const phases = task === '1 Deep Breath'
      ? ['inhale', 'exhale']
      : ['inhale', 'exhale', 'inhale', 'exhale', 'inhale', 'exhale']
    let i = 0
    const iv = setInterval(() => {
      setBreathPhase(phases[i] || 'done')
      i++
      if (i >= phases.length) clearInterval(iv)
    }, 2500)
    return () => clearInterval(iv)
  }, [task, breathPhase])

  /* Close Eyes — calm message 10 sec */
  useEffect(() => {
    if (task !== 'Close Eyes' || calmSeconds <= 0) return
    const t = setInterval(() => setCalmSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [task, calmSeconds])

  /* Hand Squeeze — 10 sec */
  useEffect(() => {
    if (task !== 'Hand Squeeze' || squeezeSeconds <= 0) return
    const t = setInterval(() => setSqueezeSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [task, squeezeSeconds])

  /* Grounding Tap — 10 sec */
  useEffect(() => {
    if (task !== 'Grounding Tap' || tapSeconds <= 0) return
    const t = setInterval(() => setTapSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [task, tapSeconds])

  /* Tense & Release — 5 sec */
  useEffect(() => {
    if (task !== 'Tense & Release' || tenseSeconds <= 0) return
    const t = setInterval(() => setTenseSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [task, tenseSeconds])

  if (task === '3 Slow Breaths' || task === '1 Deep Breath') {
    return (
      <div className="task-action">
        {breathPhase === 'idle' ? (
          <button
            type="button"
            className="task-action-btn"
            onClick={() => setBreathPhase('running')}
          >
            Start breathing
          </button>
        ) : breathPhase !== 'done' ? (
          <div className="task-action-breath">
            <span className="task-action-breath-text">{breathPhase === 'inhale' ? 'Breathe in' : 'Breathe out'}</span>
          </div>
        ) : null}
      </div>
    )
  }

  if (task === 'Close Eyes') {
    return (
      <div className="task-action">
        <p className="task-action-calm">Close your eyes. You're safe here. Take your time.</p>
        {calmSeconds > 0 && <p className="task-action-timer">{calmSeconds}s</p>}
      </div>
    )
  }

  if (task === 'Gentle Stretch') {
    return (
      <div className="task-action">
        <ul className="task-action-list">
          {STRETCH_INSTRUCTIONS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    )
  }

  if (task === 'Water Sip') {
    return <p className="task-action-text">Drink a sip of water</p>
  }

  if (task === 'One-Line Journal') {
    return (
      <DumpBox
        prompt="Write one sentence — nothing saved"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === '5 Things You See') {
    return (
      <DumpBox
        prompt="List 5 things you see around you"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === 'Mini Doodle') {
    return <DoodleZone />
  }

  if (task === 'Fun Fact') {
    return <p className="task-action-funfact">"{funFact}"</p>
  }

  if (task === 'Dump Box' || task === 'Brain Dump' || task === 'Write What You Feel') {
    return (
      <DumpBox
        prompt="Type whatever comes to mind — nothing saved"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === 'Hand Squeeze') {
    return (
      <div className="task-action">
        <p className="task-action-text">Squeeze your hands firmly for 10 seconds</p>
        {squeezeSeconds > 0 && <p className="task-action-timer">{squeezeSeconds}s</p>}
      </div>
    )
  }

  if (task === '4-4 Breathing') {
    return (
      <div className="task-action">
        <p className="task-action-text">Breathe in for 4... hold for 4... out for 4</p>
        <div className="task-action-44">4 in — 4 hold — 4 out</div>
      </div>
    )
  }

  if (task === 'Name 1 Good Thing') {
    return (
      <DumpBox
        prompt="Write one positive thing (nothing saved)"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === 'One Question') {
    return (
      <DumpBox
        prompt="Write one question bothering you (nothing saved)"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === 'Name 3 Sounds') {
    return (
      <DumpBox
        prompt="List 3 sounds you hear around you"
        onDone={() => {}}
        inline
      />
    )
  }

  if (task === 'Grounding Tap') {
    return (
      <div className="task-action">
        <p className="task-action-text">Tap each finger to your thumb slowly</p>
        {tapSeconds > 0 && <p className="task-action-timer">{tapSeconds}s</p>}
      </div>
    )
  }

  if (task === 'Tear Paper') {
    return <p className="task-action-text">Tear a small piece of paper slowly. Feel the sensation.</p>
  }

  if (task === 'Tense & Release') {
    return (
      <div className="task-action">
        <p className="task-action-text">Tense your whole body for 5 seconds, then release</p>
        {tenseSeconds > 0 && <p className="task-action-timer">{tenseSeconds}s</p>}
      </div>
    )
  }

  if (task === 'Step Outside') {
    return <p className="task-action-text">Look outside for 30 seconds. Notice the sky, the light, the air.</p>
  }

  return null
}
