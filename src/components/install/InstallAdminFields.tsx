import type { InstallAction } from '@/types/install'
import { InstallRequiredField } from './InstallRequiredField'

/** Administrator credentials created by the installer. */
export function InstallAdminFields({
  email,
  password,
  dispatch,
}: Readonly<{
  email: string
  password: string
  dispatch: React.Dispatch<InstallAction>
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InstallRequiredField
        id="install-admin-email"
        label="Admin Username / Email"
        type="text"
        value={email}
        placeholder="admin@example.com"
        onChange={(value) => {
          dispatch({ type: 'SET_ADMIN_EMAIL', payload: value })
        }}
      />
      <InstallRequiredField
        id="install-admin-password"
        label="Admin Password"
        type="password"
        value={password}
        placeholder="Secure password"
        onChange={(value) => {
          dispatch({ type: 'SET_ADMIN_PASSWORD', payload: value })
        }}
      />
    </div>
  )
}
