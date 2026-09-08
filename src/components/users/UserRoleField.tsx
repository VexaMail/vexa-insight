import { USER_SELECT_CLASS_NAME } from '@/constants/users'

/** Role of the user, and what each role may see. */
export function UserRoleField({
  role,
  onChange,
}: Readonly<{ role: string; onChange: (value: string) => void }>) {
  return (
    <div className="space-y-2">
      <label htmlFor="user-role" className="text-sm font-medium">
        Role
      </label>
      <select
        id="user-role"
        value={role}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className={USER_SELECT_CLASS_NAME}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <p className="text-muted-foreground text-xs">
        Admins have full access. Users have read-only analytics access.
      </p>
    </div>
  )
}
