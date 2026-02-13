/** Parse task text for timer/countdown values */
export function getTimerFromTask(task) {
  if (!task || typeof task !== 'string') return null
  const lower = task.toLowerCase()
  const secMatch = lower.match(/(\d+)\s*(?:seconds?|sec)/)
  const minMatch = lower.match(/(\d+)\s*(?:minutes?|min)/)
  const breathMatch = lower.match(/(\d+)\s*breaths?/i) || lower.match(/(\d+)x\s*(?:deeply|breath)/i)
  if (secMatch) return { type: 'seconds', value: parseInt(secMatch[1], 10) }
  if (minMatch) return { type: 'seconds', value: parseInt(minMatch[1], 10) * 60 }
  if (breathMatch) return { type: 'breaths', value: parseInt(breathMatch[1], 10) }
  return null
}

export function isDoodleTask(task) {
  if (!task || typeof task !== 'string') return false
  return /doodle|draw|photo/i.test(task)
}
