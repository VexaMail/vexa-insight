'use client'

import {
  currentGreeting,
  serverGreeting,
  subscribeNever,
} from '@/utils/dashboard'
import { useSyncExternalStore } from 'react'

/**
 * The greeting for the viewer's local time, or null on the server and during
 * hydration, so the first client render matches the server HTML.
 */
export function useGreeting(): string | null {
  return useSyncExternalStore(subscribeNever, currentGreeting, serverGreeting)
}
