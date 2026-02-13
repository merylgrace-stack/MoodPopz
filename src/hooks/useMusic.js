import { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler'

// Royalty-free ambient placeholder - replace with your preferred lo-fi track
const AMBIENT_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export function useMusic() {
  const [enabled, setEnabled] = useState(false)
  const [frequency, setFrequency] = useState('528Hz')
  const soundRef = useRef(null)
  const analyserRef = useRef(null)

  // Setup Analyser once
  useEffect(() => {
    if (!Howler.ctx) return
    const analyser = Howler.ctx.createAnalyser()
    analyser.fftSize = 256
    Howler.masterGain.connect(analyser)
    analyserRef.current = analyser
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('breath_music_enabled')
      if (saved === 'true') setEnabled(true)

      const savedFreq = localStorage.getItem('breath_music_freq')
      if (savedFreq) setFrequency(savedFreq)
    } catch { }
  }, [])

  useEffect(() => {
    // Save settings
    localStorage.setItem('breath_music_enabled', String(enabled))
    localStorage.setItem('breath_music_freq', frequency)

    if (!enabled) {
      if (soundRef.current) {
        soundRef.current.fade(0.15, 0, 1000)
        setTimeout(() => {
          soundRef.current?.stop()
          soundRef.current?.unload()
          soundRef.current = null
        }, 1000)
      }
      return
    }

    if (soundRef.current) {
      soundRef.current.stop()
      soundRef.current.unload()
    }

    // Placeholder tracks for "Healing Frequencies"
    // In a real app, these would be actual 528Hz/432Hz ambient loops
    const src = frequency === '528Hz'
      ? 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3' // Gentle Ambient
      : 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_13b6594611.mp3' // Meditative Drone

    const sound = new Howl({
      src: [src],
      html5: true,
      volume: 0,
      loop: true,
      onload: () => {
        sound.fade(0, 0.15, 2000)
      }
    })

    sound.play()
    soundRef.current = sound

    return () => {
      // Cleanup handled by next effect run or component unmount
    }
  }, [enabled, frequency])

  function toggle() {
    setEnabled(e => !e)
  }

  return { enabled, toggle, frequency, setFrequency, analyser: analyserRef.current }
}
