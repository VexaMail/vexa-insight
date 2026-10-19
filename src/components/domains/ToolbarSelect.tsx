import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { ToolbarSelectProps } from './ToolbarSelectProps'

/** A labelled native select for table toolbars: works on phones as is. */
export function ToolbarSelect({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}: Readonly<ToolbarSelectProps>) {
  return (
    <span className="relative inline-flex w-full min-w-0 sm:w-auto">
      {Icon ? (
        <Icon
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          aria-hidden
        />
      ) : null}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className={cn(
          'border-border bg-card text-foreground hover:bg-accent/60 focus-visible:ring-ring h-10 w-full min-w-0 cursor-pointer appearance-none rounded-md border pr-9 pl-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none sm:min-w-[10rem]',
          Icon && 'pl-9',
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
        aria-hidden
      />
    </span>
  )
}
