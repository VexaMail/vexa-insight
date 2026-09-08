import type { ImapMoveToTrashCheckboxProps } from './ImapMoveToTrashCheckboxProps'

/**
 * Disabled, and shown dimmed, while the account is set to move processed mail
 * to a named folder: the two destinations are mutually exclusive and the
 * folder wins.
 */
export function ImapMoveToTrashCheckbox({
  checked,
  index,
  moveToFolder,
  onChange,
}: Readonly<ImapMoveToTrashCheckboxProps>) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <input
        type="checkbox"
        checked={checked ? !moveToFolder : false}
        disabled={moveToFolder}
        onChange={(e) => {
          onChange(index, e.target.checked)
        }}
        className="accent-primary h-3.5 w-3.5 rounded disabled:opacity-40"
      />
      <span
        className={
          moveToFolder ? 'text-muted-foreground/40' : 'text-muted-foreground'
        }
      >
        Move to trash after processed
      </span>
    </label>
  )
}
