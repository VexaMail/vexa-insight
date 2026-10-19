import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import type { SelectFieldProps } from './SelectFieldProps'

/** A labelled select of a record generator form. */
export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: Readonly<SelectFieldProps>) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label htmlFor={id} className="text-muted-foreground block text-xs">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="bg-background h-9 text-xs">
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
    </div>
  )
}
