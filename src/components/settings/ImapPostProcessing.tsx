import { imapAccountFieldId } from '@/utils/settings'
import { ImapMoveToFolderControl } from './ImapMoveToFolderControl'
import { ImapMoveToTrashCheckbox } from './ImapMoveToTrashCheckbox'
import type { ImapPostProcessingProps } from './ImapPostProcessingProps'

/** See the accessibility note on `ImapFetchOptions` for the group markup. */
export function ImapPostProcessing({
  account,
  apiKey,
  index,
  onUpdate,
}: Readonly<ImapPostProcessingProps>) {
  const moveToFolder = account.postProcessAction === 'move_to_folder'

  return (
    <div
      className="space-y-3 pt-1"
      role="group"
      aria-labelledby={imapAccountFieldId(index, 'post-processing')}
    >
      <span
        id={imapAccountFieldId(index, 'post-processing')}
        className="text-foreground text-xs font-semibold"
      >
        Post-Processing
      </span>
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={account.markAsReadAfterProcess}
          onChange={(e) => {
            onUpdate(index, { markAsReadAfterProcess: e.target.checked })
          }}
          className="accent-primary h-3.5 w-3.5 rounded"
        />
        <span className="text-muted-foreground">Mark as read</span>
      </label>
      <ImapMoveToTrashCheckbox
        checked={account.moveToTrashAfterProcess}
        index={index}
        moveToFolder={moveToFolder}
        onChange={(rowIndex, checked) => {
          onUpdate(rowIndex, { moveToTrashAfterProcess: checked })
        }}
      />
      <ImapMoveToFolderControl
        account={account}
        apiKey={apiKey}
        index={index}
        moveToFolder={moveToFolder}
        onUpdate={onUpdate}
      />
    </div>
  )
}
