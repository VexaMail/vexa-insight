import type { Metadata } from 'next'

import type { DashboardPageProps } from '@/types/dashboard'
import { TriageOverviewScreen } from '../TriageOverviewScreen'

export const metadata: Metadata = {
  title: 'Overview',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  return (
    <TriageOverviewScreen
      searchParams={await searchParams}
      basePath="/dashboard"
    />
  )
}
