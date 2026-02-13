/**
 * One Small Thing — Vanilla JavaScript
 * All 8 features: spin wheel, tiny tasks, dump box, quotes, streaks, feedback, waves, transitions
 */

const MOODS = [
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#A7C7E7' },
  { id: 'bored', label: 'Bored', emoji: '😐', color: '#B2D8B2' },
  { id: 'overthinking', label: 'Overthinking', emoji: '🌀', color: '#D4E4D3' },
  { id: 'stressed', label: 'Stressed', emoji: '😰', color: '#F5D0C5' },
  { id: 'unmotivated', label: 'Unmotivated', emoji: '🌱', color: '#B2D8B2' },
  { id: 'other', label: 'Other', emoji: '✨', color: '#FFF8E7' },
]

const TASKS = {
  tired: ['Drink water', 'Close eyes 30 sec', 'Stretch', 'Take 3 breaths', 'Step outside 1 min'],
  bored: ['Map 3 things in the room', 'Write one sentence', 'Look outside 30 sec', 'Listen to one song'],
  overthinking: ['Dump thoughts in the box', 'Take 3 breaths', 'Step away 1 min', 'Name one thing you see'],
  stressed: ['Write one sentence', 'Take two deep breaths', 'Stretch shoulders', 'Drink water'],
  unmotivated: ['Count 5 breaths', 'Pick up a pen', 'Stand up 30 sec', 'Name one small win'],
  other: [],
}

const RANDOM_TASKS = [
  'Find 5 objects of a color', 'Walk 2 minutes', 'Take 3 photos', 'Observe nature 1 min',
  'Stretch', 'Breathe 5x deeply', 'Write one sentence', 'Look outside', 'Drink water',
]

const QUOTES = [
  "It's okay to move slowly.", "Small steps are still progress.",
  "Take a moment; you've done enough.", "Be gentle with yourself.",
  "One breath at a time.", "Every moment is a fresh beginning.",
]

const MOODS_WITH_DUMP = ['overthinking', 'other']

const KEYS = {
  lastDate: 'ost_lastDate',
  streak: 'ost_streak',
  total: 'ost_total',
  feedback: 'ost_feedback',
}

// State
let state = {
  phase: 'landing',
  mood: null,
  tasks: [],
  selectedTask: null,
  streak: 0,
  total: 0,
}

function pickRandom(arr, n = 4) {
  const s = [...arr].sort(() => Math.random() - 0.5)
  return s.slice(0, n)
}

// Streak (localStorage)
function loadStreak() {
  try {
    state.streak = parseInt(localStorage.getItem(KEYS.streak) || '0', 10)
    state.total = parseInt(localStorage.getItem(KEYS.total) || '0', 10)
  } catch {}
}

function saveCompletion() {
  const today = new Date().toDateString()
  const last = localStorage.getItem(KEYS.lastDate)
  let streak = parseInt(localStorage.getItem(KEYS.streak) || '0', 10)

  if (last !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    streak = last === yesterday.toDateString() ? streak + 1 : 1
    localStorage.setItem(KEYS.lastDate, today)
    localStorage.setItem(KEYS.streak, String(streak))
    state.streak = streak
  }

  state.total = parseInt(localStorage.getItem(KEYS.total) || '0', 10) + 1
  localStorage.setItem(KEYS.total, String(state.total))
}

function saveFeedback(rating) {
  try {
    const arr = JSON.parse(localStorage.getItem(KEYS.feedback) || '[]')
    arr.push({ rating, date: new Date().toISOString() })
    localStorage.setItem(KEYS.feedback, JSON.stringify(arr.slice(-50)))
  } catch {}
}

// DOM
function $(id) { return document.getElementById(id) }
function show(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'))
  const el = document.getElementById(screenId)
  if (el) el.classList.add('active')
}

// Render mood buttons
function renderMoods() {
  const grid = $('mood-grid')
  if (!grid) return
  grid.innerHTML = MOODS.map(m => `
    <button class="mood-btn" data-id="${m.id}" data-emoji="${m.emoji}" data-label="${m.label}">
      <span class="mood-emoji">${m.emoji}</span>
      <span>${m.label}</span>
    </button>
  `).join('')

  grid.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => selectMood(btn.dataset.id))
  })
}

function selectMood(id) {
  const mood = MOODS.find(m => m.id === id)
  if (!mood) return

  state.mood = mood
  state.tasks = id === 'other' ? pickRandom(RANDOM_TASKS, 6) : (TASKS[id] || [])
  state.selectedTask = null

  $('mood-expanded').innerHTML = `
    <span class="mood-emoji" style="font-size:2.5rem">${mood.emoji}</span>
    <div>${mood.label}</div>
  `

  spinWheel()
  show('wheel')
}

function spinWheel() {
  const wheel = $('wheel-el')
  const resultEl = $('wheel-result')
  if (!wheel || !resultEl) return

  resultEl.textContent = 'Spinning...'
  const tasks = state.tasks
  if (tasks.length === 0) {
    resultEl.textContent = 'No tasks'
    return
  }

  const targetIndex = Math.floor(Math.random() * tasks.length)
  const segAngle = 360 / tasks.length
  const targetAngle = 360 - (targetIndex * segAngle + segAngle / 2)
  const spins = 5 + Math.floor(Math.random() * 2)
  const totalRotate = spins * 360 + targetAngle

  wheel.style.transform = 'rotate(0deg)'
  wheel.offsetHeight
  wheel.style.transform = `rotate(${totalRotate}deg)`

  const colors = ['#E8F0FE', '#D4E4D3', '#FFF8E7', '#A7C7E7', '#B2D8B2', '#F5D0C5']
  const stops = tasks.map((_, i) => `${colors[i % colors.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`).join(', ')
  wheel.style.background = `conic-gradient(${stops})`

  setTimeout(() => {
    state.selectedTask = tasks[targetIndex]
    resultEl.innerHTML = `You got: <strong>${state.selectedTask}</strong>`
    showTask()
  }, 4000)
}

function showTask() {
  const mood = state.mood
  const task = state.selectedTask
  if (!mood || !task) return

  $('task-mood').textContent = `${mood.emoji} ${mood.label}`
  $('task-text').textContent = task

  const dumpWrap = $('dump-wrap')
  const needsDump = MOODS_WITH_DUMP.includes(mood.id)
  dumpWrap.hidden = !needsDump
  if (dumpWrap.querySelector('.dump-box')) dumpWrap.querySelector('.dump-box').value = ''

  show('task')
}

function onTaskDone() {
  saveCompletion()
  const quotes = QUOTES
  $('quote-text').textContent = quotes[Math.floor(Math.random() * quotes.length)]
  const streakEl = $('quote-streak-count')
  if (streakEl) streakEl.textContent = state.streak
  const moodStreak = document.querySelector('#moods .streak-count')
  if (moodStreak) moodStreak.textContent = state.streak
  show('quote')
}

// Feedback
function initFeedback() {
  const btns = document.querySelectorAll('.feedback-btn')
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('selected'))
      btn.classList.add('selected')
      saveFeedback(parseInt(btn.dataset.rating, 10))
    })
  })
}

// Events
function init() {
  loadStreak()
  renderMoods()

  $('btn-start')?.addEventListener('click', () => {
    loadStreak()
    show('moods')
    const sc = $('streak-count')
    if (sc) sc.textContent = state.streak
  })

  $('btn-home')?.addEventListener('click', () => show('landing'))
  $('btn-back-wheel')?.addEventListener('click', () => show('moods'))

  $('btn-random')?.addEventListener('click', () => selectMood('other'))

  $('btn-back-task')?.addEventListener('click', () => show('moods'))

  $('btn-done')?.addEventListener('click', onTaskDone)

  $('btn-continue')?.addEventListener('click', () => {
    show('moods')
    document.querySelectorAll('.feedback-btn').forEach(b => b.classList.remove('selected'))
  })

  $('btn-home-quote')?.addEventListener('click', () => show('landing'))

  initFeedback()
}

init()
