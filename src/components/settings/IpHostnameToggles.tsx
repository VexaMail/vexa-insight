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
    <div className="col-span-full flex flex-col gap-1 sm:flex-row sm:gap-6">
      <IpHostnameToggle
        id="ip-manual-refresh"
        label="Allow manual refresh"
        labelClassName="text-foreground text-sm"
        checked={manualRefreshEnabled}
        onToggle={(checked) => {
          onChange('ipHostnameManualRefreshEnabled', checked)
        }}
      />
      <IpHostnameToggle
        id="ip-allow-private"
        label="Allow private IPs"
        labelClassName="text-foreground text-sm"
        checked={allowPrivateIps}
        onToggle={(checked) => {
          onChange('ipHostnameAllowPrivateIps', checked)
        }}
      />
    </div>
  )
}
