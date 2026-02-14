import { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import StreakTracker from "../components/StreakTracker";
import AIChatModal from "../components/AIChatModal";
import WhisperingWaves from "../components/WhisperingWaves";
import SpinWheel from "../components/SpinWheel";
import SingleTaskView from "../components/SingleTaskView";
import Confetti from "../components/Confetti";
import { useStreak } from "../hooks/useStreak";
import { useMusic } from "../hooks/useMusic";
import { useMoodHistory } from "../hooks/useMoodHistory";
import { MOODS, TASKS } from "../data/moods"; // Import data
import "./MoodPage.css";

function MoodPage() {
    const [view, setView] = useState('grid'); // 'grid' | 'wheel' | 'task'
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiTrigger, setConfettiTrigger] = useState(0);
    const [selectedMood, setSelectedMood] = useState(null);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [revealedTask, setRevealedTask] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Hooks
    const { streak, totalCompleted, weeklyCount, monthlyCount, recordCompletion } = useStreak();
    const { enabled: musicEnabled, toggle: toggleMusic } = useMusic();
    const { history, recordMood } = useMoodHistory();

    const handleMoodClick = (mood) => {
        setSelectedMood(mood);
        const tasksForMood = TASKS[mood.id] || TASKS['other'];
        setCurrentTasks(tasksForMood);
        setView('wheel');
    };

    const handleSpinComplete = (task) => {
        setRevealedTask(task);
        setTimeout(() => setView('task'), 1000); // Small delay to admire the wheel
    };

    const handleTaskCompletion = () => {
        setConfettiTrigger(prev => prev + 1);
        setShowConfetti(true);
        recordCompletion();
        recordMood({ id: selectedMood.id, label: selectedMood.label, score: selectedMood.score });

        // Celebrate for a bit then go back? Or let user go back manually.
        // Let's just show confetti and let them bask in it.
        setTimeout(() => {
            setShowConfetti(false);
            setView('grid');
            setSelectedMood(null);
            setRevealedTask(null);
        }, 5000); // 5 seconds of glory
    };

    const handleBackToGrid = () => {
        setView('grid');
        setSelectedMood(null);
        setRevealedTask(null);
    };

    const graphData = history.slice(-14).map(h => ({
        name: new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
        score: h.score,
        mood: h.label
    }));

    return (
        <div className="mood-page-container">
            {/* Background Decor */}
            <div className="decor-item decor-plant">🌿</div>
            <div className="decor-item decor-lamp">🛋️</div>
            <div className="decor-item decor-cloud">☁️</div>

            <WhisperingWaves />
            <Confetti trigger={confettiTrigger} />

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
                <main className="mp-main">

                    {/* VIEW: GRID (Default) */}
                    {view === 'grid' && (
                        <section className="mood-grid-section">
                            <h2 className="section-title">How does your soul feel right now?</h2>

                            <div className="pinterest-grid">
                                {MOODS.map((mood) => (
                                    <div
                                        key={mood.id}
                                        className="mood-card"
                                        onClick={() => handleMoodClick(mood)}
                                        style={{ '--mood-color': mood.color }}
                                    >
                                        <div className="mood-card-inner">
                                            <div className="mood-card-front">
                                                <span className="mood-emoji">{mood.emoji}</span>
                                                <span className="mood-label">{mood.label}</span>
                                            </div>
                                            {/* No back needed now, clicking goes to wheel */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* VIEW: WHEEL */}
                    {view === 'wheel' && selectedMood && (
                        <div className="wheel-view-container">
                            <button className="back-btn-simple" onClick={handleBackToGrid}>← Back</button>
                            <h2 className="section-title">Let fate decide, {selectedMood.label}.</h2>
                            <SpinWheel
                                tasks={currentTasks}
                                mood={selectedMood}
                                onSpinComplete={handleSpinComplete}
                            />
                        </div>
                    )}

                    {/* VIEW: TASK */}
                    {view === 'task' && revealedTask && (
                        <div className="task-view-container">
                            <SingleTaskView
                                mood={selectedMood}
                                task={revealedTask}
                                onTaskDone={handleTaskCompletion}
                                onBack={handleBackToGrid}
                            />
                        </div>
                    )}

                    {/* Graph Section (Always visible or maybe hide during tasks?) */}
                    {view === 'grid' && (
                        <section className="mp-card graph-card">
                            <h2 className="mp-card-title" style={{ marginBottom: 0 }}>Mood Flow</h2>
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
                                    <p className="empty-graph-text">Track your first mood to see the flow.</p>
                                )}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar (Only in Grid view to reduce clutter during focus tasks?) */}
                {view === 'grid' && (
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

                        <section className="mp-card quote-card">
                            <h3>Daily Wisdom 💡</h3>
                            <p>"Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day is by no means a waste of time."</p>
                        </section>
                    </aside>
                )}
            </div>

            <button className="ai-fab" onClick={() => setIsChatOpen(true)}>
                💭
            </button>

            <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default MoodPage;
