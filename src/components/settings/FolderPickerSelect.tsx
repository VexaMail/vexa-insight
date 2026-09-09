import type { FolderPickerSelectProps } from './FolderPickerSelectProps'

export function FolderPickerSelect({
  value,
  state,
  hasLoaded,
  onChange,
  onLoad,
}: FolderPickerSelectProps) {
  return (
    <select
      aria-label="Destination folder"
      value={value ?? ''}
      onChange={(e) => {
        onChange(e.target.value || null)
      }}
      className="bg-card border-border/50 text-foreground min-w-0 flex-1 rounded-md border px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
      onFocus={() => {
        if (!hasLoaded && !state.loading) {
          void onLoad()
        }
      }}
    >
      <option value="">-- Select folder --</option>
      {state.folders.map((f) => (
        <option key={f.path} value={f.path}>
          {f.path}
        </option>
      ))}
    </select>
  )
}
