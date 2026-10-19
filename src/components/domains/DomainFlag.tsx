import { IpFlag } from '@/components/ips'
import { tldCountryCode } from '@/utils/domains'
import type { TitleControlsProps } from './TitleControlsProps'

/** The flag of a country-code TLD before the title; nothing for generic TLDs. */
export function DomainFlag({ domainName }: Readonly<TitleControlsProps>) {
  const code = tldCountryCode(domainName)
  if (code === null) return null
  return (
    <span className="shrink-0 text-[1.75rem] leading-none sm:text-[2.1rem]">
      <IpFlag countryCode={code} countryName={`.${code.toLowerCase()} TLD`} />
    </span>
  )
}
