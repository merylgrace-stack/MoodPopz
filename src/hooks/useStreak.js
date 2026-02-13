import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
  history: 'moodpop_history', // Array of ISO date strings
  streak: 'moodpop_streak',
  totalCompleted: 'moodpop_totalCompleted',
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

export function useStreak() {
  const [streak, setStreak] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [history, setHistory] = useState([])

  const [weeklyCount, setWeeklyCount] = useState(0)
  const [monthlyCount, setMonthlyCount] = useState(0)

  useEffect(() => {
    try {
      const s = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10)
      const t = parseInt(localStorage.getItem(STORAGE_KEYS.totalCompleted) || '0', 10)
      const h = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]')
      setStreak(s)
      setTotalCompleted(t)
      setHistory(h)
      calculateStats(h)
    } catch {
      setStreak(0)
      setTotalCompleted(0)
      setHistory([])
    }
  }, [])

  const calculateStats = (dates) => {
    if (!Array.isArray(dates)) return
    const now = new Date()
    // Weekly (Last 7 days)
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(now.getDate() - 7)

    // Monthly (This month)
    const thisMonth = now.getMonth()

    const weekly = dates.filter(d => new Date(d) >= oneWeekAgo).length
    const monthly = dates.filter(d => new Date(d).getMonth() === thisMonth).length

    setWeeklyCount(weekly)
    setMonthlyCount(monthly)
  }

  const recordCompletion = useCallback(() => {
    const today = getTodayKey()
    const storedHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]')

    // Check if already done today
    if (storedHistory.includes(today)) {
      // Already recorded today, just return streak
      return streak
    }

    // Update History
    const newHistory = [...storedHistory, today]
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(newHistory))
    setHistory(newHistory)
    calculateStats(newHistory)

    // Update Streak
    let newStreak = streak
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayKey = yesterday.toISOString().split('T')[0]

    if (storedHistory.includes(yesterdayKey)) {
      newStreak += 1
    } else {
      // Check if allow skip? No, strict streak for now or based on "justIncreased" logic previously
      // If stored streak > 0 and last match was yesterday...
      // Re-calculate streak from history to be safe?
      // Simple logic:
      newStreak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10)
      if (storedHistory.includes(yesterdayKey)) {
        newStreak += 1
      } else {
        newStreak = 1
      }
    }

    localStorage.setItem(STORAGE_KEYS.streak, String(newStreak))
    setStreak(newStreak)

    // Update Total
    const total = parseInt(localStorage.getItem(STORAGE_KEYS.totalCompleted) || '0', 10) + 1
    localStorage.setItem(STORAGE_KEYS.totalCompleted, String(total))
    setTotalCompleted(total)

    return newStreak
  }, [streak])

  return { streak, totalCompleted, weeklyCount, monthlyCount, recordCompletion }
}
