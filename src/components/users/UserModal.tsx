'use client'

import { Button } from '@/components/ui'
import { useUserModal } from '../../hooks/users/useUserModal'
import { UserCredentialFields } from './UserCredentialFields'
import { UserDomainAccessFields } from './UserDomainAccessFields'
import type { UserModalProps } from './UserModalProps'
import { UserRoleField } from './UserRoleField'

export default function UserModal({
  user,
  onClose,
  onSuccess,
}: Readonly<UserModalProps>) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    domainMode,
    setDomainMode,
    domainsInput,
    setDomainsInput,
    error,
    handleSubmit,
  } = useUserModal(user, onSuccess)

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="glass-card animate-scale-in w-full max-w-md p-6">
        <h2 className="mb-4 text-xl font-bold">
          {user ? 'Edit User' : 'Create User'}
        </h2>
        {error !== '' && (
          <div className="text-destructive bg-destructive/10 mb-4 rounded p-2 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
          className="space-y-4"
        >
          <UserCredentialFields
            username={username}
            password={password}
            isEdit={user !== undefined}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
          />
          <UserRoleField role={role} onChange={setRole} />
          <UserDomainAccessFields
            domainMode={domainMode}
            domainsInput={domainsInput}
            onModeChange={setDomainMode}
            onDomainsChange={setDomainsInput}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
