import { USER_SELECT_CLASS_NAME } from '@/constants/users'
import { UserDomainsField } from './UserDomainsField'

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
        <label
          htmlFor="user-domain-mode"
          className="text-foreground block text-sm font-medium"
        >
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
          <option value="all">All domains</option>
          <option value="selected">Selected domains</option>
        </select>
      </div>

      {domainMode === 'selected' && (
        <UserDomainsField value={domainsInput} onChange={onDomainsChange} />
      )}
    </>
  )
}
