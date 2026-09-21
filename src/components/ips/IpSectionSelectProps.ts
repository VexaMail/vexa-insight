import type { IpFilterOption } from '@/types/ips'

export type IpSectionSelectProps = {
  label: string
  value: string
  options: IpFilterOption[]
  /** Shown as the first entry; picking it clears the filter. */
  allLabel?: string
  onChange: (value: string) => void
}
