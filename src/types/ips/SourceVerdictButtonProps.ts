import type { SourceVerdictOption } from '@/types/source-reviews'

export type SourceVerdictButtonProps = {
  readonly option: SourceVerdictOption
  readonly active: boolean
  readonly disabled: boolean
  readonly onToggle: () => void
}
