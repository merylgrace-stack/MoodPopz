import { useState } from 'react'
import './ThemePicker.css'

const THEMES = [
  { id: 'default', name: 'Sky', from: '#A3CEF1', to: '#D6CDEA' },
  { id: 'sunset', name: 'Sunset', from: '#FFB5A7', to: '#F8D4B4' },
  { id: 'mint', name: 'Mint', from: '#A8E6CF', to: '#DCEDC1' },
  { id: 'lavender', name: 'Lavender', from: '#E2D5F1', to: '#F5E6FF' },
  { id: 'peach', name: 'Peach', from: '#FFE5D9', to: '#FFF0EB' },
]

export default function ThemePicker({ theme, onThemeChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="theme-picker">
      <button
        className="theme-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Pick theme"
        title="Change background"
      >
        🎨
      </button>
      {open && (
        <div className="theme-dropdown">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className="theme-option"
              onClick={() => {
                onThemeChange(t)
                setOpen(false)
              }}
            >
              <span
                className="theme-preview"
                style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
              />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
