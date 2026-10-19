import { IpFlag } from '@/components/ips'
import { tldCountryCode } from '@/utils/domains'
import type { DomainNameProps } from './DomainNameProps'

/** The flag of a country-code TLD before the title; nothing for generic TLDs. */
export function DomainFlag({ domainName }: Readonly<DomainNameProps>) {
  const code = tldCountryCode(domainName)
  if (code === null) return null
  return (
    <span className="shrink-0 text-[1.75rem] leading-none sm:text-[2.1rem]">
      <IpFlag countryCode={code} countryName={`.${code.toLowerCase()} TLD`} />
    </span>
  )
}
