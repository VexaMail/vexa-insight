import type { FolderEntry } from './FolderEntry'

export type FolderState = {
  folders: FolderEntry[]
  loading: boolean
  error: string | null
}
