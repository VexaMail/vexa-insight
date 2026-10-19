'use client'

import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { ImapAccountAddButtonProps } from './ImapAccountAddButtonProps'

export function ImapAccountAddButton({
  onClick,
  hasAccounts,
}: Readonly<ImapAccountAddButtonProps>) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <Plus />
      {hasAccounts ? 'Add another account' : 'Add account'}
    </Button>
  )
}
