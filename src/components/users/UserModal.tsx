'use client'

import { Button } from '@/components/ui'
import { useUserModal } from '@/hooks/users'
import { UserModalError } from './UserModalError'
import { UserModalFields } from './UserModalFields'
import { UserModalHeader } from './UserModalHeader'
import type { UserModalProps } from './UserModalProps'

export default function UserModal({
  user,
  onClose,
  onSuccess,
}: Readonly<UserModalProps>) {
  const form = useUserModal(user, onSuccess)

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-end justify-center p-4 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        className="glass-card animate-scale-in max-h-full w-full max-w-md overflow-y-auto shadow-xl"
      >
        <UserModalHeader isEdit={user !== undefined} />

        <form
          onSubmit={(e) => {
            void form.handleSubmit(e)
          }}
          className="space-y-4 p-5"
        >
          <UserModalError message={form.error} />
          <UserModalFields form={form} isEdit={user !== undefined} />

          <div className="border-border flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-10"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-10">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
