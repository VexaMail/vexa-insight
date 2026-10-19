import type { Metadata } from 'next'

import type { DashboardPageProps } from '@/types/dashboard'
import { IssuesScreen } from './IssuesScreen'

export const metadata: Metadata = {
  title: 'Issues',
}

export const dynamic = 'force-dynamic'

export default async function IssuesPage({ searchParams }: DashboardPageProps) {
  return <IssuesScreen searchParams={await searchParams} basePath="/issues" />
}
