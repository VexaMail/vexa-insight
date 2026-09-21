'use client'

import { Input } from '@/components/ui'
import { useIpSectionSearch } from '@/hooks/ips'
import { Search } from 'lucide-react'
import type { IpSectionSearchInputProps } from './IpSectionSearchInputProps'

/** Debounced free-text search of an IP detail section. */
export function IpSectionSearchInput({
  value,
  placeholder,
  label,
  onSearch,
}: Readonly<IpSectionSearchInputProps>) {
  const { text, handleChange } = useIpSectionSearch({ value, onSearch })

  return (
    <div className="relative min-w-[10rem] flex-1">
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        aria-label={label}
        placeholder={placeholder}
        value={text}
        onChange={(event) => {
          handleChange(event.target.value)
        }}
        className="bg-card border-border/50 h-9 pl-9"
      />
    </div>
  )
}
