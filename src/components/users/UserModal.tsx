'use client'

import { Button } from '@/components/ui'
import { useUserModal } from '@/hooks/users'
import { UserModalError } from './UserModalError'
import { UserModalFields } from './UserModalFields'
import type { UserModalProps } from './UserModalProps'

export default function UserModal({
  user,
  onClose,
  onSuccess,
}: Readonly<UserModalProps>) {
  const form = useUserModal(user, onSuccess)

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="glass-card animate-scale-in w-full max-w-md p-6">
        <h2 className="mb-4 text-xl font-bold">
          {user ? 'Edit User' : 'Create User'}
        </h2>
        <UserModalError message={form.error} />

        <form
          onSubmit={(e) => {
            void form.handleSubmit(e)
          }}
          className="space-y-4"
        >
          <UserModalFields form={form} isEdit={user !== undefined} />

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
