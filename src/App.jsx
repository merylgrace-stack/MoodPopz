import { useState } from "react";
import "./App.css";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleButtonClick = () => {
    setShowConfetti(true);

    // stop confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="playground">
      {/* floating calming shapes */}
      <div className="floating-shape pink"></div>
      <div className="floating-shape blue"></div>
      <div className="floating-shape yellow"></div>

      {showConfetti && <div className="confetti-container"></div>}

      <h1 className="headline">Hey you 🌈</h1>
      <p className="subtitle">
        {selectedMood
          ? `Feeling ${selectedMood}? Let’s make it better 💛`
          : "How’s your heart feeling right now?"}
      </p>

      {/* mood cards */}
      <div className="mood-cards">
        {["Happy", "Meh", "Low", "Stressed", "Tired"].map((mood, index) => (
          <div
            key={index}
            className={`mood-card ${
              selectedMood === mood ? "selected" : ""
            }`}
            onClick={() => handleMoodClick(mood)}
          >
            {["😄", "😐", "😔", "😤", "😴"][index]}
            <span>{mood}</span>
          </div>
        ))}
      </div>

      <button className="magic-btn" onClick={handleButtonClick}>
        Let’s Pop My Mood 🎡
      </button>

      <p className="footer-text">
        No pressure. Just tiny steps 💛
      </p>
    </div>
  );
}

export default App;

