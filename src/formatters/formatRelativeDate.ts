import { SECONDS_PER_DAY } from '../utils/format/secondsPerDay'
import { SECONDS_PER_HOUR } from '../utils/format/secondsPerHour'
import { SECONDS_PER_MINUTE } from '../utils/format/secondsPerMinute'

export function formatRelativeDate(epochSeconds: number): {
  relative: string
  absolute: string
} {
  const date = new Date(epochSeconds * 1000)
  const absolute = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (diffSeconds < SECONDS_PER_MINUTE)
    return { relative: 'just now', absolute }
  if (diffSeconds < SECONDS_PER_HOUR) {
    const minutes = Math.floor(diffSeconds / SECONDS_PER_MINUTE)
    return { relative: `${minutes}m ago`, absolute }
  }
  if (diffSeconds < SECONDS_PER_DAY) {
    const hours = Math.floor(diffSeconds / SECONDS_PER_HOUR)
    return { relative: `${hours}h ago`, absolute }
  }
  const days = Math.floor(diffSeconds / SECONDS_PER_DAY)
  if (days < 30) return { relative: `${days}d ago`, absolute }
  if (days < 365) {
    const months = Math.floor(days / 30)
    return { relative: `${months}mo ago`, absolute }
  }
  const years = Math.floor(days / 365)
  return { relative: `${years}y ago`, absolute }
}
