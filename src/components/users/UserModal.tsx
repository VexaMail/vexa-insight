'use client'

import { Button, Input } from '@/components/ui'
import { useUserModal } from '../../hooks/users/useUserModal'
import type { UserModalProps } from './UserModalProps'

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
        {error && (
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              required
              type="email"
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password{' '}
              {user && (
                <span className="text-muted-foreground text-xs">
                  (leave blank to keep current)
                </span>
              )}
            </label>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              required={!user}
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
              }}
              className="bg-background border-input text-foreground focus-visible:ring-primary h-9 w-full rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-muted-foreground text-xs">
              Admins have full access. Users have read-only analytics access.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Domain Access</label>
            <select
              value={domainMode}
              onChange={(e) => {
                setDomainMode(e.target.value as 'all' | 'selected')
              }}
              className="bg-background border-input text-foreground focus-visible:ring-primary h-9 w-full rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
            >
              <option value="all">All Domains</option>
              <option value="selected">Selected Domains</option>
            </select>
          </div>

          {domainMode === 'selected' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Specify Domains</label>
              <Input
                value={domainsInput}
                onChange={(e) => {
                  setDomainsInput(e.target.value)
                }}
                placeholder="example.com, another.com"
              />
              <p className="text-muted-foreground text-xs">
                Comma separated list of domains.
              </p>
            </div>
          )}

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
