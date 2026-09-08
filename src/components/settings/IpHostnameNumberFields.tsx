'use client'

import { IP_HOSTNAME_NUMBER_FIELD_SPECS } from '@/constants/settings'
import { IpHostnameNumberField } from './IpHostnameNumberField'
import type { IpHostnameSectionProps } from './IpHostnameSectionProps'

/** The six numeric settings of the IP-to-hostname lookup section. */
export function IpHostnameNumberFields(
  props: Readonly<IpHostnameSectionProps>,
) {
  return (
    <>
      {IP_HOSTNAME_NUMBER_FIELD_SPECS.map((field) => (
        <IpHostnameNumberField
          key={field.id}
          id={field.id}
          label={field.label}
          min={field.min}
          max={field.max}
          step={field.step}
          value={props[field.valueKey]}
          fallback={field.fallback}
          onCommit={(value) => {
            props.onChange(field.settingKey, value)
          }}
        />
      ))}
    </>
  )
}
