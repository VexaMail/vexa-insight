import { imapAccountFieldId } from '@/utils/settings'
import type { ImapFetchOptionsProps } from './ImapFetchOptionsProps'

/**
 * `role="group"` + `aria-labelledby` rather than `fieldset`/`legend`: the
 * native pair is equivalent to AT, but a legend is laid out by the fieldset's
 * own rendering rules and cannot be made to match the current spacing
 * (measured: every row shifts 4px and the group grows 4px, with or without
 * `inline`). The caption stays a span -- it labels the group, not a control,
 * so `label` would be a lie to AT.
 */
export function ImapFetchOptions({
  account,
  index,
  onUpdate,
}: Readonly<ImapFetchOptionsProps>) {
  return (
    <div
      className="space-y-3 pt-1"
      role="group"
      aria-labelledby={imapAccountFieldId(index, 'fetch-options')}
    >
      <span
        id={imapAccountFieldId(index, 'fetch-options')}
        className="text-foreground text-xs font-semibold"
      >
        Fetch Options
      </span>
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={account.fetchIncludeTrash}
          onChange={(e) => {
            onUpdate(index, { fetchIncludeTrash: e.target.checked })
          }}
          className="accent-primary h-3.5 w-3.5 rounded"
        />
        <span className="text-muted-foreground">Include Trash folder</span>
      </label>
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={account.fetchIncludeAllFolders}
          onChange={(e) => {
            onUpdate(index, { fetchIncludeAllFolders: e.target.checked })
          }}
          className="accent-primary h-3.5 w-3.5 rounded"
        />
        <span className="text-muted-foreground">
          Include all subfolders (Sent, Spam, etc.)
        </span>
      </label>
    </div>
  )
}
