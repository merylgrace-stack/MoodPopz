import { useState } from 'react'
import HomePage from './components/HomePage'
import MainApp from './components/MainApp'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [initialMood, setInitialMood] = useState(null)

  return (
    <div className="app breath-app">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      {page === 'home' ? (
        <HomePage onStart={(mood) => {
          setInitialMood(mood)
          setPage('app')
        }} />
      ) : (
        <MainApp
          onReset={() => {
            setInitialMood(null)
            setPage('home')
          }}
          initialMood={initialMood}
        />
      )}
    </div>
  )
}
