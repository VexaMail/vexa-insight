'use client'

import { IpHostnameToggle } from './IpHostnameToggle'
import type { IpHostnameTogglesProps } from './IpHostnameTogglesProps'

/** The two boolean settings of the IP-to-hostname lookup section. */
export function IpHostnameToggles({
  manualRefreshEnabled,
  allowPrivateIps,
  onChange,
}: IpHostnameTogglesProps) {
  return (
    <div className="col-span-1 flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:gap-6">
      <IpHostnameToggle
        id="ip-manual-refresh"
        label="Allow Manual Refresh"
        labelClassName="text-foreground text-sm"
        checked={manualRefreshEnabled}
        onToggle={(checked) => {
          onChange('ipHostnameManualRefreshEnabled', checked)
        }}
      />
      <IpHostnameToggle
        id="ip-allow-private"
        label="Allow Private IPs"
        labelClassName="text-foreground text-sm"
        checked={allowPrivateIps}
        onToggle={(checked) => {
          onChange('ipHostnameAllowPrivateIps', checked)
        }}
      />
    </div>
  )
}
