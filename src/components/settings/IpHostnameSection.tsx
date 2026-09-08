'use client'

import { m as motion } from 'framer-motion'
import { IpHostnameNumberFields } from './IpHostnameNumberFields'
import { IpHostnameSectionHeader } from './IpHostnameSectionHeader'
import type { IpHostnameSectionProps } from './IpHostnameSectionProps'
import { IpHostnameToggle } from './IpHostnameToggle'
import { IpHostnameToggles } from './IpHostnameToggles'

export default function IpHostnameSection(
  props: Readonly<IpHostnameSectionProps>,
) {
  const { enabled, manualRefreshEnabled, allowPrivateIps, onChange } = props

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="glass-card p-6"
      aria-labelledby="settings-ip-hostname-heading"
    >
      <IpHostnameSectionHeader />

      <div className="mb-6">
        <IpHostnameToggle
          id="ip-lookup-enabled"
          label="Enable Background IP to Hostname Lookups"
          labelClassName="text-foreground text-sm font-medium"
          checked={enabled}
          onToggle={(checked) => {
            onChange('ipHostnameLookupEnabled', checked)
          }}
        />
      </div>

      {enabled ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <IpHostnameNumberFields {...props} />
          <IpHostnameToggles
            manualRefreshEnabled={manualRefreshEnabled}
            allowPrivateIps={allowPrivateIps}
            onChange={onChange}
          />
        </div>
      ) : null}
    </motion.section>
  )
}
