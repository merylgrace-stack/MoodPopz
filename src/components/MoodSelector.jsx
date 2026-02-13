import './MoodSelector.css'

export default function MoodSelector({ moods, onSelect }) {
  return (
    <div className="mood-cards" role="group" aria-label="Choose your mood">
      {moods.map((mood, i) => (
        <button
          key={mood.id}
          className="mood-card"
          onClick={() => onSelect(mood)}
          style={{ '--mood-color': mood.color || '#B2D8B2' }}
          aria-label={`Select ${mood.label} mood`}
        >
          <span className="mood-card-emoji" aria-hidden>{mood.emoji}</span>
          <span className="mood-card-label">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
