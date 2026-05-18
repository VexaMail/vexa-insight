'use client'

import { Button } from '@/components/ui'
import { useSelfUpdate } from '@/hooks/settings'
import { Rocket } from 'lucide-react'
import SelfUpdateLogViewer from './SelfUpdateLogViewer'
import type { SelfUpdatePanelProps } from './SelfUpdatePanelProps'

/**
 * In-app, WordPress-style "Apply update now" panel for source installs
 * supervised by systemd or PM2. Shows the capability check, the action
 * button, and a tail of the script log so admins can watch the upgrade
 * progress in the browser.
 */
export default function SelfUpdatePanel({
  apiKey,
  updateAvailable,
}: Readonly<SelfUpdatePanelProps>) {
  const { status, isLoading, isStarting, error, handleApplyClick } =
    useSelfUpdate(apiKey)

  if (isLoading || !status) return null

  const { capability, log } = status
  const isSupportedInstall =
    capability.installMethod === 'source-supervised' ||
    capability.installMethod === 'source-bare'

  if (!isSupportedInstall) return null

  let buttonLabel = 'Apply update now'
  if (log.running) {
    buttonLabel = 'Updating…'
  } else if (isStarting) {
    buttonLabel = 'Starting…'
  }

  return (
    <div className="border-border/50 bg-background/40 space-y-3 rounded-md border p-3">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <Rocket className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-foreground text-xs font-semibold">
            Apply update from the dashboard
          </p>
          <p className="text-muted-foreground text-xs">
            Backs up your SQLite database, pulls the latest tag, runs
            <code className="mx-1">pnpm install &amp; build</code>, then
            restarts via your supervisor (
            {capability.supervisor === 'pm2' ? 'PM2' : 'systemd'}). The
            dashboard is unreachable for ~30 seconds during the swap.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleApplyClick}
          disabled={
            isStarting ||
            log.running ||
            !apiKey.trim() ||
            !capability.canApply ||
            !updateAvailable
          }
        >
          {buttonLabel}
        </Button>
      </div>

      {capability.reasons.length > 0 ? (
        <ul className="text-muted-foreground list-disc space-y-0.5 pl-5 text-[11px]">
          {capability.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      ) : null}

      <SelfUpdateLogViewer lines={log.lines} running={log.running} />

      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  )
}
