import type { UserDialogsProps } from './UserDialogsProps'
import UserModal from './UserModal'

/** The create and edit modals, each mounted only while open. */
export function UserDialogs({
  isCreateOpen,
  isEditOpen,
  selectedUser,
  closeCreate,
  closeEdit,
  onSuccessCreate,
  onSuccessEdit,
}: Readonly<UserDialogsProps>) {
  return (
    <>
      {isCreateOpen ? (
        <UserModal onClose={closeCreate} onSuccess={onSuccessCreate} />
      ) : null}
      {isEditOpen && selectedUser != null ? (
        <UserModal
          user={selectedUser}
          onClose={closeEdit}
          onSuccess={onSuccessEdit}
        />
      ) : null}
    </>
  )
}
