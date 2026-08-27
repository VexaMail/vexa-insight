import { useEffect, useState } from 'react'

export function usePassRateRingDisplay(rate: number): number {
  const [displayRate, setDisplayRate] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const durationMs = 1500

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setDisplayRate(Math.round(easeOut * rate))

        if (progress < 1) window.requestAnimationFrame(step)
      }

      window.requestAnimationFrame(step)
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [rate])

  return displayRate
}
