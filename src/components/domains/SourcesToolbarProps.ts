import type { SourceClassFilter } from '@/types/domains'

export type SourcesToolbarProps = {
  readonly classFilter: SourceClassFilter
  readonly country: string
  readonly days: number | undefined
  readonly countryOptions: readonly { value: string; label: string }[]
  readonly csvHref: string | undefined
  readonly onClassChange: (value: string) => void
  readonly onCountryChange: (value: string) => void
  readonly onDaysChange: (value: string) => void
}
