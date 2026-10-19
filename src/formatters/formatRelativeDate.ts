import { formatDate } from './formatDate'
import { formatTimeAgo } from './formatTimeAgo'

/**
 * "3 days ago" for the cell and "Oct 16, 2026" (UTC) for its title, so the
 * relative age always comes with the absolute date behind it.
 */
export function formatRelativeDate(epochSeconds: number): {
  relative: string
  absolute: string
} {
  const date = new Date(epochSeconds * 1000)
  return {
    relative: formatTimeAgo(Math.floor((Date.now() - date.getTime()) / 1000)),
    absolute: formatDate(date),
  }
}
