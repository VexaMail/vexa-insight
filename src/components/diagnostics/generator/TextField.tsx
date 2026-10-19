import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { TextFieldProps } from './TextFieldProps'

/** A labelled text input of a record generator form. */
export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
}: Readonly<TextFieldProps>) {
  return (
    <div className={cn('min-w-0 space-y-1.5', className)}>
      <label htmlFor={id} className="text-muted-foreground block text-xs">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className="h-9 font-mono text-xs"
      />
    </div>
  )
}
