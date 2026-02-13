import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

// Royalty-free ambient placeholder - replace with your preferred lo-fi track
const AMBIENT_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export function useMusic() {
  const [enabled, setEnabled] = useState(false)
  const soundRef = useRef(null)

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem('breath_music') === 'true')
    } catch {}
  }, [])

  useEffect(() => {
    if (!enabled) {
      if (soundRef.current) {
        soundRef.current.stop()
        soundRef.current.unload()
        soundRef.current = null
      }
      localStorage.setItem('breath_music', 'false')
      return
    }

    try {
      const sound = new Howl({
        src: [AMBIENT_URL],
        html5: true,
        volume: 0.15,
        loop: true,
      })
      sound.play()
      soundRef.current = sound
      localStorage.setItem('breath_music', 'true')
    } catch {
      localStorage.setItem('breath_music', 'false')
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop()
        soundRef.current.unload()
        soundRef.current = null
      }
    }
  }, [enabled])

  function toggle() {
    setEnabled((e) => !e)
  }

  return { enabled, toggle }
}
