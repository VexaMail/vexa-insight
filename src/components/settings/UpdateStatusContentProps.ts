import type { UpdateStatusPublic } from '@/types/updates'

export type UpdateStatusContentProps = {
  status: UpdateStatusPublic
  apiKey: string
  handleCopyText: (text: string) => void
}
