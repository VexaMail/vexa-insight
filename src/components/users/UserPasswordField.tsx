import { Input } from '@/components/ui'

/** Password field, optional while editing an existing user. */
export function UserPasswordField({
  password,
  isEdit,
  onChange,
}: Readonly<{
  password: string
  isEdit: boolean
  onChange: (value: string) => void
}>) {
  return (
    <div className="space-y-2">
      <label htmlFor="user-password" className="text-sm font-medium">
        Password{' '}
        {isEdit ? (
          <span className="text-muted-foreground text-xs">
            (leave blank to keep current)
          </span>
        ) : null}
      </label>
      <Input
        id="user-password"
        value={password}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        type="password"
        required={!isEdit}
        minLength={6}
      />
    </div>
  )
}
