'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import type { IssueFilterSelectProps } from './IssueFilterSelectProps'

/** A labelled select over a fixed list of filter options. */
export function IssueFilterSelect({
  label,
  value,
  options,
  onChange,
}: Readonly<IssueFilterSelectProps>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className="bg-card h-10 w-full cursor-pointer sm:w-44"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
