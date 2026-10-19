import { IpFlag } from '@/components/ips'
import { tldCountryCode } from '@/utils/domains'
import type { TitleControlsProps } from './TitleControlsProps'

/** A domain name in a list, led by its ccTLD flag or a blank of the same width. */
export function DomainNameCell({ domainName }: Readonly<TitleControlsProps>) {
  const code = tldCountryCode(domainName)
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="flex w-5 shrink-0 justify-center">
        {code ? (
          <IpFlag
            countryCode={code}
            countryName={`.${code.toLowerCase()} TLD`}
          />
        ) : (
          <span className="bg-muted-foreground/40 h-1 w-1 rounded-full" />
        )}
      </span>
      <span className="text-foreground truncate text-sm font-medium">
        {domainName}
      </span>
    </span>
  )
}
