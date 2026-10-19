import type { FilterOption } from '@/types/dashboard'

export type IssueFilterSelectProps = {
  readonly label: string
  readonly value: string
  readonly options: readonly FilterOption[]
  readonly onChange: (value: string) => void
}
