'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import type { IpMoreMenuProps } from '@/types/ips'
import { EllipsisVertical } from 'lucide-react'
import { IpCopyMenuItem } from './IpCopyMenuItem'

/** Secondary actions of a source: copy its address and its hostname. */
export function IpMoreMenu({ ip, hostname }: Readonly<IpMoreMenuProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="More actions"
          className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
        >
          <EllipsisVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-1.5">
        <ul aria-label="More actions" className="flex flex-col">
          <IpCopyMenuItem label="IP address" value={ip} />
          {hostname ? (
            <IpCopyMenuItem label="hostname" value={hostname} />
          ) : null}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
