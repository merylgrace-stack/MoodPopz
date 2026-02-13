import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'moodpop_history_log'

export function useMoodHistory() {
    const [history, setHistory] = useState([])
    const [slope, setSlope] = useState(0)

    // Load history on mount
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            // Sort by timestamp just in case
            const sorted = data.sort((a, b) => a.timestamp - b.timestamp)
            setHistory(sorted)
            calculateSlope(sorted)
        } catch (e) {
            console.error('Failed to load mood history', e)
        }
    }, [])

    // Linear regression to find mood trend slope over last 30 entries/days
    const calculateSlope = (data) => {
        if (data.length < 3) {
            setSlope(0)
            return
        }

        // Use last 14 days or 14 entries for trend
        const recent = data.slice(-14)
        const n = recent.length

        // Map dates to x (0, 1, 2...) days from first point
        const firstTime = recent[0].timestamp
        const points = recent.map((item, i) => {
            // x = days since start of window
            const x = (item.timestamp - firstTime) / (1000 * 60 * 60 * 24)
            return { x, y: item.score }
        })

        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0
        points.forEach(p => {
            sumX += p.x
            sumY += p.y
            sumXY += p.x * p.y
            sumXX += p.x * p.x
        })

        const slopeVal = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
        setSlope(slopeVal || 0)
    }

    const recordMood = useCallback((mood) => {
        if (!mood || typeof mood.score !== 'number') return

        const entry = {
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            moodId: mood.id,
            score: mood.score,
            label: mood.label
        }

        setHistory(prev => {
            // Prevent duplicates for same day? Or allow multiple check-ins? 
            // Let's allow multiple for now, or maybe just last one per day?
            // For detailed tracking, multiple is fine. For simple daily, maybe one.
            // Let's keep it simple: Append. 
            const newData = [...prev, entry]

            // Prune > 60 days to save space
            const cutoff = Date.now() - (60 * 24 * 60 * 60 * 1000)
            const pruned = newData.filter(i => i.timestamp > cutoff)

            localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned))
            calculateSlope(pruned)
            return pruned
        })
    }, [])

    return { history, recordMood, slope }
}
