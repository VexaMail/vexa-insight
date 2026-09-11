import type { Metadata } from 'next'

import { InstallForm, InstallSecretKeyNotice } from '@/components/install'
import { ThemeToggle } from '@/components/shell'
import { isInstalled, isPartiallyInstalled } from '@/services/install'
import { getEnvSecretKey } from '@/services/settings-store'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Install | Vexa Insight',
  description: 'Install Vexa Insight',
}

export const dynamic = 'force-dynamic'

export default function InstallPage() {
  if (isInstalled()) {
    redirect('/settings')
  }

  const isPartial = isPartiallyInstalled()
  const hasSecretKey = getEnvSecretKey() !== null

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isPartial ? 'Complete Setup' : 'Get started'}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {isPartial
              ? 'Your database is initialized. Create an Admin user to continue.'
              : 'Complete the form below to configure your instance.'}
          </p>
        </div>
        {hasSecretKey ? (
          <InstallForm isPartial={isPartial} />
        ) : (
          <InstallSecretKeyNotice />
        )}
      </div>
    </div>
  )
}
