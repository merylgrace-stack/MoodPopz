import { useState, useEffect } from 'react'
import WhisperingWaves from './WhisperingWaves'
import { MOODS } from '../data/moods'
import './HomePage.css'

export default function HomePage({ onStart }) {
  const [moodVisible, setMoodVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMoodVisible(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <main id="main" className="moodpop-home" role="main">
      <WhisperingWaves />
      <div className="moodpop-home-inner">
        {/* Hero Section — 100vh, emotional settling */}
        <section className="moodpop-hero" aria-labelledby="hero-heading">
          <div className="moodpop-hero-halo" aria-hidden="true" />
          <h1 id="hero-heading" className="moodpop-hero-title">
            Take a gentle pause.
          </h1>
          <p className="moodpop-hero-subtext">
            You don't need to fix anything right now.
          </p>
        </section>

        {/* Mood Entry Area — fades in after emotional settling */}
        <section
          className={`moodpop-moods ${moodVisible ? 'visible' : ''}`}
          aria-label="Choose how you feel"
        >
          <p className="moodpop-moods-hint">When you're ready</p>
          <div className="moodpop-mood-grid" role="group">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className="moodpop-mood-pill"
                style={{ '--mood-tint': mood.color }}
                onClick={() => onStart(mood)}
                aria-label={`Choose ${mood.label}`}
              >
                <span className="moodpop-mood-icon" aria-hidden>
                  {mood.emoji}
                </span>
                <span className="moodpop-mood-label">{mood.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
