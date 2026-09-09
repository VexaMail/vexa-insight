import { useDateRangeFilterContent } from '@/hooks/filters'
import type { DateRangeFilterProps } from '@/types/filters'
import { CustomRangePopover } from './CustomRangePopover'
import { QuickRangeSelect } from './QuickRangeSelect'

export function DateRangeFilterContent({
  currentDays,
  basePath,
  from,
  to,
}: Readonly<DateRangeFilterProps>) {
  const {
    date,
    isCustom,
    isOpen,
    selectValue,
    setDate,
    setIsOpen,
    handleApply,
    handleQuickRangeChange,
  } = useDateRangeFilterContent({ basePath, currentDays, from, to })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <QuickRangeSelect
        value={selectValue}
        onValueChange={handleQuickRangeChange}
      />

      {isCustom ? (
        <CustomRangePopover
          date={date}
          isOpen={isOpen}
          onDateChange={setDate}
          onOpenChange={setIsOpen}
          onApply={handleApply}
        />
      ) : null}
    </div>
  )
}
