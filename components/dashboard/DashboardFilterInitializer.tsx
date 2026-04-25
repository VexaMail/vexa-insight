'use client'

import { useDashboardFilterInitializer } from '@/hooks/dashboard'
import type { DashboardFilterInitializerProps } from '@/types/dashboard'

/**
 * Seeds the Zustand dashboard filter store from URL-derived values.
 * Must be rendered before the dashboard widget components so the store
 * has the correct initial state before their first fetch.
 */
export default function DashboardFilterInitializer({
  days,
  from,
  to,
}: Readonly<DashboardFilterInitializerProps>) {
  const props: Readonly<DashboardFilterInitializerProps> = {
    days,
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
  }

  useDashboardFilterInitializer(props)

  return null
}
