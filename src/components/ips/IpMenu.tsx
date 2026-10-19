'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { IP_MENU_ICONS, IP_MENU_TRIGGER_ICONS } from '@/constants/ips'
import { useMenuState } from '@/hooks/ips'
import { cn } from '@/lib/utils'
import type { IpMenuProps } from '@/types/ips'
import { ChevronDown } from 'lucide-react'
import { IpMenuLink } from './IpMenuLink'

/** A button that opens a short list of links: investigate, external tools. */
export function IpMenu({
  label,
  trigger,
  items,
  block = false,
}: Readonly<IpMenuProps>) {
  const { open, setOpen, close } = useMenuState()
  const Lead = IP_MENU_TRIGGER_ICONS[trigger]
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
            block && 'w-full',
            trigger === 'filter' && 'min-h-9 px-2.5 text-xs',
          )}
        >
          <Lead className="h-4 w-4" aria-hidden="true" />
          {label}
          <ChevronDown
            className="text-muted-foreground h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-1.5">
        <ul aria-label={label} className="flex flex-col">
          {items.map((item) => (
            <IpMenuLink
              key={item.key}
              item={item}
              Icon={IP_MENU_ICONS[item.kind]}
              onSelect={close}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
