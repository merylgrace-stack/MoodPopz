import './WhisperingWaves.css'

export default function WhisperingWaves() {
  return (
    <div className="whispering-waves" aria-hidden="true">
      <svg className="wave wave-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,160 C360,80 720,240 1080,160 C1260,120 1380,200 1440,160 L1440,320 L0,320 Z"
          fill="url(#waveGrad1)"
        />
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8F0FE" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#D4E4D3" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="wave wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 L1440,320 L0,320 Z"
          fill="url(#waveGrad2)"
        />
        <defs>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4E4D3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E8F0FE" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="wave wave-3" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,120 C360,200 720,80 1080,120 C1260,140 1380,100 1440,120 L1440,320 L0,320 Z"
          fill="url(#waveGrad3)"
        />
        <defs>
          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4E4D3" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
