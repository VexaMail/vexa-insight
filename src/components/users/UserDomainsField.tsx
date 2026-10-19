import { Input } from '@/components/ui'
import { USER_INPUT_CLASS_NAME } from '@/constants/users'
import type { UserDomainsFieldProps } from './UserDomainsFieldProps'

/** The comma-separated list of domains a restricted user may see. */
export function UserDomainsField({
  value,
  onChange,
}: Readonly<UserDomainsFieldProps>) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="user-domains"
        className="text-foreground block text-sm font-medium"
      >
        Domains
      </label>
      <Input
        id="user-domains"
        className={`${USER_INPUT_CLASS_NAME} font-mono`}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder="example.com, example.org"
        aria-describedby="user-domains-help"
      />
      <p id="user-domains-help" className="text-muted-foreground text-xs">
        Comma-separated list of domains.
      </p>
    </div>
  )
}
