import { Input } from '@/components/ui'
import { USER_INPUT_CLASS_NAME } from '@/constants/users'
import { UserPasswordField } from './UserPasswordField'

/** Username and password of the user being created or edited. */
export function UserCredentialFields({
  username,
  password,
  isEdit,
  onUsernameChange,
  onPasswordChange,
}: Readonly<{
  username: string
  password: string
  isEdit: boolean
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
}>) {
  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="user-username"
          className="text-foreground block text-sm font-medium"
        >
          Username
        </label>
        <Input
          id="user-username"
          className={USER_INPUT_CLASS_NAME}
          value={username}
          onChange={(e) => {
            onUsernameChange(e.target.value)
          }}
          required
          type="email"
          placeholder="user@example.com"
        />
      </div>
      <UserPasswordField
        password={password}
        isEdit={isEdit}
        onChange={onPasswordChange}
      />
    </>
  )
}
