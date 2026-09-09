import type { UseUsersManagementReturn } from '@/types/users'

export type UserDialogsProps = Pick<
  UseUsersManagementReturn,
  | 'isCreateOpen'
  | 'isEditOpen'
  | 'selectedUser'
  | 'closeCreate'
  | 'closeEdit'
  | 'onSuccessCreate'
  | 'onSuccessEdit'
>
