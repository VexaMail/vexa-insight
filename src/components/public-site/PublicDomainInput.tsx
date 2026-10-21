import type { PublicDomainInputProps } from '../../types/public-check/PublicDomainInputProps'

export function PublicDomainInput({
  domain,
}: Readonly<PublicDomainInputProps>) {
  return (
    <input
      id="public-domain"
      name="domain"
      type="text"
      required
      maxLength={253}
      defaultValue={domain}
      placeholder="example.com"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      autoComplete="off"
      aria-describedby="domain-help"
      className="bg-background focus-visible:ring-ring min-w-0 flex-1 rounded-md border px-4 py-3 font-mono text-base outline-none focus-visible:ring-2"
    />
  )
}
