import type { PublicDomainInputProps } from '../../types/public-check/PublicDomainInputProps'

export function PublicDomainHeading({
  domain,
}: Readonly<PublicDomainInputProps>) {
  return (
    <div className="mt-12 mb-6">
      <p className="text-muted-foreground text-sm">
        Email authentication check
      </p>
      <h1 className="mt-2 text-3xl font-semibold break-all">{domain}</h1>
    </div>
  )
}
