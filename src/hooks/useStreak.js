import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
  lastCompletedDate: 'moodpop_lastCompletedDate',
  streak: 'moodpop_streak',
  totalCompleted: 'moodpop_totalCompleted',
}

function getTodayKey() {
  return new Date().toDateString()
}

export function useStreak() {
  const [streak, setStreak] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [lastDate, setLastDate] = useState(null)

  useEffect(() => {
    try {
      const s = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10)
      const t = parseInt(localStorage.getItem(STORAGE_KEYS.totalCompleted) || '0', 10)
      const d = localStorage.getItem(STORAGE_KEYS.lastCompletedDate)
      setStreak(s)
      setTotalCompleted(t)
      setLastDate(d)
    } catch {
      setStreak(0)
      setTotalCompleted(0)
    }
  }, [])

  const recordCompletion = useCallback(() => {
    const today = getTodayKey()
    const stored = localStorage.getItem(STORAGE_KEYS.lastCompletedDate)
    let newStreak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10)

    if (stored !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayKey = yesterday.toDateString()
      if (stored === yesterdayKey) {
        newStreak += 1
      } else {
        newStreak = 1
      }
      localStorage.setItem(STORAGE_KEYS.lastCompletedDate, today)
      localStorage.setItem(STORAGE_KEYS.streak, String(newStreak))
      setStreak(newStreak)
      setLastDate(today)
    }

    const total = parseInt(localStorage.getItem(STORAGE_KEYS.totalCompleted) || '0', 10) + 1
    localStorage.setItem(STORAGE_KEYS.totalCompleted, String(total))
    setTotalCompleted(total)

    return newStreak
  }, [])

  return { streak, totalCompleted, lastDate, recordCompletion }
}
