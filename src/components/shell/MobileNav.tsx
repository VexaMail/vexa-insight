'use client'

import { Button } from '@/components/ui'
import { useMobileNav } from '@/hooks/shell'
import type { MobileNavProps } from '@/types/shell'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import SidebarVersionStatus from './SidebarVersionStatus'
import VexaLogo from './VexaLogo'

/** Phone and tablet navigation: a menu button that opens a left drawer. */
export function MobileNav({ projectName }: Readonly<MobileNavProps>) {
  const { open, setOpen, close } = useMobileNav()
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-10 w-10 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" />
        <DialogPrimitive.Content className="bg-sidebar border-sidebar-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r shadow-2xl duration-200 lg:hidden">
          <DialogPrimitive.Title className="sr-only">
            Navigation
          </DialogPrimitive.Title>
          <div className="border-sidebar-border flex h-14 items-center justify-between border-b px-3">
            <VexaLogo projectName={projectName} />
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pt-5">
            <SidebarNav onNavigate={close} />
          </div>
          <div className="border-sidebar-border border-t p-4">
            <SidebarVersionStatus />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
