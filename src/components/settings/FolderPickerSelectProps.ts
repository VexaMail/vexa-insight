import type { FolderState } from '@/types/settings'

export type FolderPickerSelectProps = {
  readonly value: string | null
  readonly state: FolderState
  readonly hasLoaded: boolean
  readonly onChange: (path: string | null) => void
  readonly onLoad: () => Promise<void>
}
