'use client'

import { Button } from '@/components/ui'
import { useSelfUpdate } from '@/hooks/settings'
import {
  isSelfUpdateApplyDisabled,
  isSourceInstallMethod,
  selfUpdateButtonLabel,
} from '@/utils/settings'
import { SelfUpdateIntro } from './SelfUpdateIntro'
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
  if (!isSourceInstallMethod(capability.installMethod)) return null

  return (
    <div className="border-border/50 bg-background/40 space-y-3 rounded-md border p-3">
      <div className="flex items-start gap-3">
        <SelfUpdateIntro supervisor={capability.supervisor} />
        <Button
          type="button"
          size="sm"
          onClick={handleApplyClick}
          disabled={isSelfUpdateApplyDisabled({
            isStarting,
            running: log.running,
            apiKey,
            canApply: capability.canApply,
            updateAvailable,
          })}
        >
          {selfUpdateButtonLabel(log.running, isStarting)}
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
