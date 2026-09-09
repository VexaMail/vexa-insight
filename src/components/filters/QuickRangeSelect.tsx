import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { DATE_RANGE_DAYS, DATE_RANGE_LABELS } from '@/types/filters'
import type { QuickRangeSelectProps } from './QuickRangeSelectProps'

export function QuickRangeSelect({
  value,
  onValueChange,
}: Readonly<QuickRangeSelectProps>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      {/*
        The trigger's only text comes from SelectValue, which renders nothing
        until the matching SelectItem has mounted. Screen readers would
        announce an unnamed button in that window, so name it explicitly.
      */}
      <SelectTrigger
        aria-label="Date range"
        className="bg-background h-9 w-[160px]"
      >
        <SelectValue placeholder="Select Range" />
      </SelectTrigger>
      <SelectContent>
        {DATE_RANGE_DAYS.map((days) => (
          <SelectItem key={days} value={String(days)}>
            {DATE_RANGE_LABELS[days as number]}
          </SelectItem>
        ))}
        <SelectItem value="custom">Custom Range</SelectItem>
      </SelectContent>
    </Select>
  )
}
