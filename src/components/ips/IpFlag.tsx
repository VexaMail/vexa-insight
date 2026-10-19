import ReactCountryFlag from 'react-country-flag'
import type { IpFlagProps } from './IpFlagProps'

export function IpFlag({ countryCode, countryName }: IpFlagProps) {
  return (
    <div
      className="flex shrink-0 cursor-default items-center"
      title={
        countryName && countryCode
          ? `${countryName} (${countryCode})`
          : countryName || countryCode || 'Unknown'
      }
    >
      {countryCode ? (
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{ width: '1.2em', height: '1.2em' }}
          title={countryName || countryCode}
        />
      ) : (
        <div className="bg-secondary text-muted-foreground flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold">
          ?
        </div>
      )}
    </div>
  )
}
