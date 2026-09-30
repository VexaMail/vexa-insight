'use client'

import { m as motion } from 'framer-motion'
import { useSnds } from '../../hooks/settings/useSnds'
import { SndsActions } from './SndsActions'
import { SndsConnectForm } from './SndsConnectForm'
import { SndsConnectionStatus } from './SndsConnectionStatus'
import { SndsSectionIntro } from './SndsSectionIntro'

/** Settings card that connects Microsoft SNDS and triggers a sync. */
export function SndsSection({ apiKey }: Readonly<{ apiKey: string }>) {
  const snds = useSnds(apiKey)
  const connected = snds.connection?.connected === true

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-border/50 bg-background/50 space-y-4 rounded-lg border p-6 backdrop-blur-sm"
    >
      <SndsSectionIntro />

      <div className="flex max-w-xl flex-col gap-4 pt-2">
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
    </motion.section>
  )
}
