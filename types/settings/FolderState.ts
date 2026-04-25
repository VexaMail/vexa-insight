import type { FolderEntry } from '@/types/settings'

export type FolderState = {
  folders: FolderEntry[]
  loading: boolean
  error: string | null
}
