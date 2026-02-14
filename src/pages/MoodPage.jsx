import { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import StreakTracker from "../components/StreakTracker";
import AIChatModal from "../components/AIChatModal";
import WhisperingWaves from "../components/WhisperingWaves";
import MoodWheel from "../components/MoodWheel";
import { useStreak } from "../hooks/useStreak";
import { useMusic } from "../hooks/useMusic";
import { useMoodHistory } from "../hooks/useMoodHistory";
import { useAIChat } from "../hooks/useAIChat";
import "./MoodPage.css";

function MoodPage() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Hooks
    const { streak, totalCompleted, weeklyCount, monthlyCount, recordCompletion } = useStreak();
    const { enabled: musicEnabled, toggle: toggleMusic } = useMusic();
    const { history, recordMood } = useMoodHistory();

    const handleMoodSelect = (moodLabel) => {
        setSelectedMood(moodLabel);
    };

    const handleButtonClick = () => {
        if (!selectedMood) return;

        setShowConfetti(true);

        // Record actions
        recordCompletion();
        const scores = { "Happy": 5, "Excited": 5, "Calm": 4, "Tired": 2, "Anxious": 1, "Sad": 1, "Meh": 3 };
        recordMood({ id: selectedMood, label: selectedMood, score: scores[selectedMood] || 3 });

        // Stop confetti after 3 seconds
        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);
    };

    // Format history for graph
    const graphData = history.slice(-14).map(h => ({
        name: new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
        score: h.score,
        mood: h.label
    }));

    const moods = [
        { label: "Happy", emoji: "⭐️" },
        { label: "Excited", emoji: "🎉" },
        { label: "Calm", emoji: "🌿" },
        { label: "Meh", emoji: "☁️" },
        { label: "Tired", emoji: "💤" },
        { label: "Anxious", emoji: "🌀" },
        { label: "Sad", emoji: "💧" }
    ];

    return (
        <div className="mood-page-container">
            {/* Background Decor */}
            <div className="decor-item decor-plant">🌿</div>
            <div className="decor-item decor-lamp">🛋️</div>
            <div className="decor-item decor-cloud">☁️</div>
            <div className="decor-item decor-books">📚</div>

            <WhisperingWaves />

            {showConfetti && <div className="confetti-container"></div>}

            {/* Header */}
            <header className="mp-header">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className="mp-brand">MoodPopz</h1>
                </Link>

                <div className="mp-controls">
                    <button
                        className={`music-toggle ${musicEnabled ? 'active' : ''}`}
                        onClick={toggleMusic}
                    >
                        {musicEnabled ? '🔊 Ambient On' : '🔇 Ambient Off'}
                    </button>
                    <div className="streak-badge-mini" title="Current Streak">
                        🔥 {streak}
                    </div>
                </div>
            </header>

            <div className="mp-dashboard">
                {/* Main Section */}
                <main className="mp-main">
                    {/* Mood Wheel Card */}
                    <section className="mp-card" style={{ paddingBottom: '3rem' }}>
                        <h2 className="mp-card-title">
                            {selectedMood
                                ? `Feeling ${selectedMood}?`
                                : "How's your head feeling?"}
                        </h2>

                        <MoodWheel
                            moods={moods}
                            selectedMood={selectedMood}
                            onSelect={handleMoodSelect}
                        />

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                            <button className="pop-btn" onClick={handleButtonClick} disabled={!selectedMood}>
                                Give me a small thing ✨
                            </button>
                        </div>
                    </section>

                    {/* Graph Section */}
                    <section className="mp-card">
                        <h2 className="mp-card-title" style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Mood Flow</h2>
                        <div className="graph-container">
                            {graphData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={graphData}>
                                        <XAxis dataKey="name" stroke="#6D5E52" tick={{ fontSize: 10 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#DFA995"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#DFA995' }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p style={{ textAlign: 'center', color: 'var(--text-soft)', marginTop: '4rem', fontSize: '0.9rem' }}>
                                    Track your mood to see your flow here.
                                </p>
                            )}
                        </div>
                    </section>
                </main>

                {/* Sidebar */}
                <aside className="mp-sidebar">
                    <section className="mp-card">
                        <h2 className="mp-card-title">Journey</h2>
                        <StreakTracker
                            streak={streak}
                            totalCompleted={totalCompleted}
                            weeklyCount={weeklyCount}
                            monthlyCount={monthlyCount}
                            justIncreased={showConfetti}
                        />
                    </section>

                    <section className="mp-card" style={{ background: '#9CAF88', color: 'white' }}>
                        <h3>Daily Wisdom 💡</h3>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day is by no means a waste of time."
                        </p>
                    </section>
                </aside>
            </div>

            {/* AI Chat FAB */}
            <button className="ai-fab" onClick={() => setIsChatOpen(true)}>
                💭
            </button>

            {/* AI Modal */}
            <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default MoodPage;
