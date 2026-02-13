import './FrequencyWave.css'

const MOOD_COLORS = {
  tired: '#7BA3C7',
  bored: '#C9A86C',
  overthinking: '#9B8BC4',
  stressed: '#E0986A',
  unmotivated: '#7BC47B',
  frustrated: '#E07A8A',
  confused: '#8B7BC4',
  other: '#E8C060',
}

export default function FrequencyWave({ moodId, pulse }) {
  const color = moodId ? (MOOD_COLORS[moodId] || '#9B8BC4') : '#A3CEF1'
  const isPulsing = pulse ? 'pulse' : ''

  return (
    <div className={`frequency-wave ${isPulsing}`} aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A3CEF1" />
            <stop offset="100%" stopColor="#D6CDEA" />
          </linearGradient>
          <linearGradient id="waveMood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#D6CDEA" />
          </linearGradient>
        </defs>
        <path
          className="wave-path"
          fill={moodId ? `url(#waveMood)` : 'url(#waveGrad)'}
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          style={{ '--wave-color': color }}
        />
        <path
          className="wave-path wave-2"
          fill={moodId ? `url(#waveMood)` : 'url(#waveGrad)'}
          d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 L1200,120 L0,120 Z"
          style={{ '--wave-color': color }}
        />
        <path
          className="wave-path wave-3"
          fill={moodId ? `url(#waveMood)` : 'url(#waveGrad)'}
          d="M0,60 C300,120 500,0 600,60 C700,0 900,120 1200,60 L1200,120 L0,120 Z"
          style={{ '--wave-color': color }}
        />
      </svg>
    </div>
  )
}
