'use client'

import { usePollStatusLive } from '@/hooks/dashboard'
import type { LivePollStatusCardProps } from './LivePollStatusCardProps'
import PollStatusCard from './PollStatusCard'

export default function LivePollStatusCard({
  initialStatus,
}: Readonly<LivePollStatusCardProps>) {
  const status = usePollStatusLive(initialStatus)
  return <PollStatusCard status={status} />
}
