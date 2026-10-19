import type { Metadata } from 'next'

import { InstallForm, InstallSecretKeyNotice } from '@/components/install'
import { AuthScreen } from '@/components/login'
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
    <AuthScreen
      eyebrow={isPartial ? 'Finish setup' : 'First setup'}
      title={isPartial ? 'Complete setup' : 'Get started'}
      description={
        isPartial
          ? 'Your database is initialized. Create an admin user to continue.'
          : 'Create the admin account and the mailbox reports arrive in.'
      }
      width="wide"
    >
      {hasSecretKey ? (
        <InstallForm isPartial={isPartial} />
      ) : (
        <InstallSecretKeyNotice />
      )}
    </AuthScreen>
  )
}
