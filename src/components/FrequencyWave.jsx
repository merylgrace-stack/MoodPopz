import { useRef, useEffect } from 'react'

export default function FrequencyWave({ moodId, analyser }) {
  const pathRef = useRef(null)
  const pathRef2 = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!analyser) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const animate = () => {
      analyser.getByteFrequencyData(dataArray)

      // Calculate average for simple amplitude scaling
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avg = sum / bufferLength;

      // Map avg (0-255) to a subtle wave height (0-20)
      const amplitude = (avg / 255) * 40;

      if (pathRef.current) {
        // Create a wave path that shifts phase
        const time = Date.now() / 1000;

        const makePath = (offset, phaseSpeed) => {
          let d = `M0,60`
          const width = 1200
          const points = 10
          // Unused loop code - relying on simple return below for now
          // for (let i = 1; i <= points; i++) { ... }
          // Simple Sine Approx
          return `M0,${60 + Math.sin(time + offset) * 20} \
                   Q300,${60 - 30 - amplitude} 600,${60 + Math.sin(time + offset + 2) * 10} \
                   T1200,${60 + Math.sin(time) * 10} \
                   V120 L0,120 Z`
        }

        pathRef.current.setAttribute('d', makePath(0, 1))
        if (pathRef2.current) pathRef2.current.setAttribute('d', makePath(2, 1.2))
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [analyser])

  return (
    <div className="frequency-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#20B2AA" stopOpacity="0.4" /> {/* Teal */}
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.4" /> {/* Violet */}
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="url(#waveGrad)"
          d="M0,60 Q600,0 1200,60 V120 H0 Z"
        />
        <path
          ref={pathRef2}
          fill="url(#waveGrad)"
          d="M0,80 Q600,20 1200,80 V120 H0 Z"
          style={{ opacity: 0.6 }}
        />
      </svg>
    </div>
  )
}
