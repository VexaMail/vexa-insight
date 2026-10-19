import { DOMAIN_STATUS_OPTIONS } from '@/constants/domains'
import { Filter } from 'lucide-react'
import type { DomainStatusSelectProps } from './DomainStatusSelectProps'
import { ToolbarSelect } from './ToolbarSelect'

/** The status filter of the domains list. */
export function DomainStatusSelect({
  value,
  onChange,
}: Readonly<DomainStatusSelectProps>) {
  return (
    <ToolbarSelect
      label="Filter domains by status"
      value={value}
      options={DOMAIN_STATUS_OPTIONS}
      onChange={onChange}
      icon={Filter}
    />
  )
}
