import { Button } from '@/components/ui'
import { Trash2 } from 'lucide-react'
import type { ImapAccountRowToolbarProps } from './ImapAccountRowToolbarProps'

export function ImapAccountRowToolbar({
  accountId,
  index,
  onRemove,
  onTestConnection,
  removable,
}: Readonly<ImapAccountRowToolbarProps>) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-primary h-7 text-xs"
        onClick={() => {
          onTestConnection(accountId)
        }}
      >
        Test Connection
      </Button>
      {removable ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-danger hover:text-danger h-7 w-7"
          onClick={() => {
            onRemove(index)
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      ) : null}
    </div>
  )
}
