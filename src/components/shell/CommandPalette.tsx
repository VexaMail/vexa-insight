'use client'

import { Command, CommandInput } from '@/components/ui'
import { useCommandPalette } from '@/hooks/shell'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CommandPaletteResults } from './CommandPaletteResults'
import { CommandPaletteTrigger } from './CommandPaletteTrigger'

/**
 * Global jump box: type an IP, a domain or a report id and open it from any
 * page. Opens from the top bar field or with Cmd+K / Ctrl+K.
 */
export function CommandPalette() {
  const { open, setOpen, query, setQuery, targets, pages, go } =
    useCommandPalette()
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <CommandPaletteTrigger />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content className="border-border bg-popover fixed top-[12vh] left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border shadow-2xl">
          <DialogPrimitive.Title className="sr-only">
            Search
          </DialogPrimitive.Title>
          <Command shouldFilter={false} className="bg-popover">
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="IP address, domain or report id"
              className="h-12 text-base"
            />
            <CommandPaletteResults targets={targets} pages={pages} onGo={go} />
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
