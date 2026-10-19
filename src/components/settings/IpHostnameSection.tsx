'use client'

import { StatusPill } from '@/components/ui'
import { Globe } from 'lucide-react'
import { IpHostnameNumberFields } from './IpHostnameNumberFields'
import type { IpHostnameSectionProps } from './IpHostnameSectionProps'
import { IpHostnameToggle } from './IpHostnameToggle'
import { IpHostnameToggles } from './IpHostnameToggles'
import { SettingsSection } from './SettingsSection'

export default function IpHostnameSection(
  props: Readonly<IpHostnameSectionProps>,
) {
  const { enabled, manualRefreshEnabled, allowPrivateIps, onChange } = props

  return (
    <SettingsSection
      anchorId="ip-hostname"
      headingId="settings-ip-hostname-heading"
      icon={<Globe />}
      title="IP hostname lookup"
      description="Resolve and cache reverse DNS names for the source IPs in reports."
      actions={
        <StatusPill tone={enabled ? 'success' : 'neutral'} dot>
          {enabled ? 'On' : 'Off'}
        </StatusPill>
      }
    >
      <IpHostnameToggle
        id="ip-lookup-enabled"
        label="Enable background IP to hostname lookups"
        labelClassName="text-foreground cursor-pointer text-sm font-medium"
        checked={enabled}
        onToggle={(checked) => {
          onChange('ipHostnameLookupEnabled', checked)
        }}
      />

      {enabled ? (
        <div className="border-border mt-4 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2 xl:grid-cols-3">
          <IpHostnameNumberFields {...props} />
          <IpHostnameToggles
            manualRefreshEnabled={manualRefreshEnabled}
            allowPrivateIps={allowPrivateIps}
            onChange={onChange}
          />
        </div>
      ) : null}
    </SettingsSection>
  )
}
