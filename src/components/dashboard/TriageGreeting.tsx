'use client'

import { useGreeting } from '@/hooks/dashboard'

/**
 * "Good morning" and friends by the viewer's clock. The server and the first
 * client render show "Overview", so hydration matches, then it swaps.
 */
export function TriageGreeting() {
  const greeting = useGreeting()
  return (
    <h1 className="text-foreground font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      {greeting ?? 'Overview'}
    </h1>
  )
}
