import { FolderPicker } from './FolderPicker'
import type { ImapMoveToFolderControlProps } from './ImapMoveToFolderControlProps'

export function ImapMoveToFolderControl({
  account,
  apiKey,
  index,
  moveToFolder,
  onUpdate,
}: Readonly<ImapMoveToFolderControlProps>) {
  return (
    <>
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={moveToFolder}
          onChange={(e) => {
            onUpdate(index, {
              postProcessAction: e.target.checked ? 'move_to_folder' : 'none',
              moveToTrashAfterProcess: e.target.checked
                ? false
                : account.moveToTrashAfterProcess,
            })
          }}
          className="accent-primary h-3.5 w-3.5 rounded"
        />
        <span className="text-muted-foreground">Move to a folder</span>
      </label>
      {moveToFolder && account.id > 0 ? (
        <FolderPicker
          accountId={account.id}
          apiKey={apiKey}
          value={account.postProcessFolder}
          onChange={(path) => {
            onUpdate(index, { postProcessFolder: path })
          }}
        />
      ) : null}
      {moveToFolder && account.id === 0 ? (
        <p className="text-muted-foreground text-xs italic">
          Save the account first to pick a folder.
        </p>
      ) : null}
    </>
  )
}
