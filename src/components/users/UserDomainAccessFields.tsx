import { Input } from '@/components/ui'
import { USER_SELECT_CLASS_NAME } from '@/constants/users'

/** Whether the user sees every domain, and which ones when not. */
export function UserDomainAccessFields({
  domainMode,
  domainsInput,
  onModeChange,
  onDomainsChange,
}: Readonly<{
  domainMode: 'all' | 'selected'
  domainsInput: string
  onModeChange: (mode: 'all' | 'selected') => void
  onDomainsChange: (value: string) => void
}>) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="user-domain-mode" className="text-sm font-medium">
          Domain Access
        </label>
        <select
          id="user-domain-mode"
          value={domainMode}
          onChange={(e) => {
            onModeChange(e.target.value as 'all' | 'selected')
          }}
          className={USER_SELECT_CLASS_NAME}
        >
          <option value="all">All Domains</option>
          <option value="selected">Selected Domains</option>
        </select>
      </div>

      {domainMode === 'selected' && (
        <div className="space-y-2">
          <label htmlFor="user-domains" className="text-sm font-medium">
            Specify Domains
          </label>
          <Input
            id="user-domains"
            value={domainsInput}
            onChange={(e) => {
              onDomainsChange(e.target.value)
            }}
            placeholder="example.com, another.com"
          />
          <p className="text-muted-foreground text-xs">
            Comma separated list of domains.
          </p>
        </div>
      )}
    </>
  )
}
