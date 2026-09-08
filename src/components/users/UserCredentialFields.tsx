import { Input } from '@/components/ui'
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
        <label htmlFor="user-username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="user-username"
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
