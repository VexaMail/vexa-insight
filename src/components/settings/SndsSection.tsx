'use client'

import { StatusPill } from '@/components/ui'
import { MailCheck } from 'lucide-react'
import { useSnds } from '../../hooks/settings/useSnds'
import { SettingsSection } from './SettingsSection'
import { SndsActions } from './SndsActions'
import { SndsConnectForm } from './SndsConnectForm'
import { SndsConnectionStatus } from './SndsConnectionStatus'
import { SndsSectionIntro } from './SndsSectionIntro'

/** Settings section that connects Microsoft SNDS and triggers a sync. */
export function SndsSection({ apiKey }: Readonly<{ apiKey: string }>) {
  const snds = useSnds(apiKey)
  const connected = snds.connection?.connected === true

  return (
    <SettingsSection
      anchorId="snds"
      headingId="settings-snds-heading"
      icon={<MailCheck />}
      title="Microsoft SNDS"
      description="Outlook.com's daily view of your sending IPs: filter result, complaint rate, spam trap hits."
      actions={
        <StatusPill tone={connected ? 'success' : 'unknown'} dot>
          {connected ? 'Connected' : 'Not connected'}
        </StatusPill>
      }
    >
      <div className="flex flex-col gap-4">
        <SndsSectionIntro />
        <SndsConnectionStatus connection={snds.connection} />
        <SndsActions
          connected={connected}
          isBusy={snds.isBusy}
          onConnect={snds.handleConnect}
          onSync={snds.handleSync}
          onDisconnect={snds.handleDisconnect}
        />
        {snds.authorizeUrl ? (
          <SndsConnectForm
            authorizeUrl={snds.authorizeUrl}
            redirectUrl={snds.redirectUrl}
            isBusy={snds.isBusy}
            onChange={snds.setRedirectUrl}
            onSubmit={snds.handleSubmitRedirect}
          />
        ) : null}
        {snds.message !== '' ? (
          <p className="text-foreground text-sm font-medium" role="status">
            {snds.message}
          </p>
        ) : null}
      </div>
    </SettingsSection>
  )
}
