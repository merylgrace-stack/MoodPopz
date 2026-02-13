import React from 'react'
import ReactDOM from 'react-dom/client'
import MainApp from './components/MainApp.jsx'
import './index.css'

function App() {
  const [key, setKey] = React.useState(0)
  return <MainApp key={key} onReset={() => setKey((k) => k + 1)} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
