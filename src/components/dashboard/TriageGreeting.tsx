'use client'

import { useGreeting } from '@/hooks/dashboard'

/**
 * "Good morning" and friends by the viewer's clock, as the page title text.
 * The server and the first client render show "Overview", so hydration
 * matches, then it swaps.
 */
export function TriageGreeting() {
  const greeting = useGreeting()
  return <>{greeting ?? 'Overview'}</>
}
