import { useState, useMemo } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts'
import './InsightsView.css'

export default function InsightsView({ history, slope, onBack, onTriggerCheckIn }) {
    // Process data for graph
    const data = useMemo(() => {
        if (!history || history.length === 0) return []
        // Take last 30 entries
        return history.slice(-30).map(entry => ({
            date: new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }),
            score: entry.score,
            mood: entry.label
        }))
    }, [history])

    // Calculate average score
    const avgScore = useMemo(() => {
        if (data.length === 0) return 0
        const sum = data.reduce((acc, curr) => acc + curr.score, 0)
        return (sum / data.length).toFixed(1)
    }, [data])

    // Determine trend icon/color
    const trendInfo = useMemo(() => {
        if (slope > 0.05) return { icon: '↗️', label: 'Trending Up', color: '#4CAF50' }
        if (slope < -0.05) return { icon: '↘️', label: 'Trending Down', color: '#FF5252' }
        return { icon: '➡️', label: 'Stable', color: '#FFC107' }
    }, [slope])

    return (
        <div className="insights-view">
            <header className="insights-header">
                <button onClick={onBack} className="breath-btn">← Back</button>
                <h2>Mood Insights</h2>
            </header>

            <div className="insights-summary-cards">
                <div className="insight-card">
                    <span className="insight-label">Average Base</span>
                    <span className="insight-value">{avgScore}/5</span>
                </div>
                <div className="insight-card">
                    <span className="insight-label">Trend (14d)</span>
                    <span className="insight-value" style={{ color: trendInfo.color }}>
                        {trendInfo.icon} {trendInfo.label}
                    </span>
                </div>
                <div className="insight-card streak-card">
                    <span className="insight-label">Entries</span>
                    <span className="insight-value">{history.length}</span>
                </div>
            </div>

            <div className="chart-container">
                <h3>30-Day Flow</h3>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={data}>
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                            <YAxis domain={[1, 5]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <ReferenceLine y={3} stroke="#ccc" strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#8884d8"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#8884d8' }}
                                activeDot={{ r: 6 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="insights-actions">
                {slope < -0.2 && (
                    <div className="check-in-nudge">
                        <p>It looks like things have been a bit heavy lately.</p>
                        <button className="breath-cta-spin check-in-btn" onClick={onTriggerCheckIn}>
                            Start Gentle Check-in 💛
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
