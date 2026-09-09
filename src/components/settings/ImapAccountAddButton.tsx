'use client'

import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { ImapAccountAddButtonProps } from './ImapAccountAddButtonProps'

export function ImapAccountAddButton({
  onClick,
}: Readonly<ImapAccountAddButtonProps>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-primary text-xs"
      onClick={onClick}
    >
      <Plus className="mr-1 h-3.5 w-3.5" />
      Add another account
    </Button>
  )
}
