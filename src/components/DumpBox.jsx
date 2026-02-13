import { useState } from 'react'
import BreathingDot from './BreathingDot'
import './DumpBox.css'

export default function DumpBox({ prompt, onDone, inline, fullscreen }) {
  const [value, setValue] = useState('')

  function handleDone() {
    setValue('')
    onDone?.()
  }

  const content = (
    <>
      <p className="dump-box-prompt">{prompt}</p>
      <textarea
        className="dump-box"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type anything here — nothing is saved"
        rows={fullscreen ? 12 : 4}
        autoFocus={!inline}
        aria-label="Dump your thoughts here. Nothing is saved."
      />
      {fullscreen && (
        <div className="dump-box-breathing">
          <BreathingDot />
        </div>
      )}
      {(!inline || fullscreen) && (
        <div className="dump-box-actions">
          <button className="dump-btn skip" onClick={handleDone}>
            Skip
          </button>
          <button className="dump-btn done" onClick={handleDone}>
            I'm done
          </button>
        </div>
      )}
    </>
  )

  if (fullscreen) {
    return (
      <div className="dump-box-fullscreen">
        <div className="dump-box-fullscreen-inner">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className={`dump-box-wrap ${inline ? 'inline' : ''}`}>
      {content}
    </div>
  )
}
