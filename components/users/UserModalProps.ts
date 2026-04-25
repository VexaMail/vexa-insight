import type { User } from '@/types/users'

export type UserModalProps = {
  user?: User
  onClose: () => void
  onSuccess: () => void
}
