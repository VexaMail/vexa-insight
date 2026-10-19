import { Input } from '@/components/ui'
import { USER_INPUT_CLASS_NAME } from '@/constants/users'

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
      <label
        htmlFor="user-password"
        className="text-foreground block text-sm font-medium"
      >
        Password{' '}
        {isEdit ? (
          <span className="text-muted-foreground text-xs">
            (leave blank to keep current)
          </span>
        ) : null}
      </label>
      <Input
        id="user-password"
        className={USER_INPUT_CLASS_NAME}
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
