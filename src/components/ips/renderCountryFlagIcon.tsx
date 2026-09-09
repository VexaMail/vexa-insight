import type { ReactNode } from 'react'
import ReactCountryFlag from 'react-country-flag'

export function renderCountryFlagIcon(code: string): ReactNode {
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      style={{ width: '1.2em', height: '1.2em', flexShrink: 0 }}
    />
  )
}
