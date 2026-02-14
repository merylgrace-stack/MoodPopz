import React from 'react';
import './MoodWheel.css';

const MoodWheel = ({ moods, selectedMood, onSelect }) => {
    const radius = 135; // Distance from center

    return (
        <div className="mood-wheel-container">
            <div className="wheel-backdrop"></div>

            {/* Center Text */}
            <div className="wheel-center">
                {selectedMood ? selectedMood : "Pick One"}
            </div>

            {moods.map((mood, index) => {
                // Calculate position on the circle
                const angle = (index / moods.length) * 2 * Math.PI - Math.PI / 2; // Start from top (-90deg)
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                    <div
                        key={index}
                        className={`mood-orbit-item ${selectedMood === mood.label ? 'selected' : ''}`}
                        style={{
                            transform: `translate(${x}px, ${y}px)`
                        }}
                        onClick={() => onSelect(mood.label, index)}
                        title={mood.label}
                    >
                        <span role="img" aria-label={mood.label}>{mood.emoji}</span>
                        {/* Optional label inside bubble if needed, but keeping it clean for now */}
                    </div>
                );
            })}
        </div>
    );
};

export default MoodWheel;
