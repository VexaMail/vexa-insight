import { SETTINGS_CONTROL_CLASS_NAME } from '@/constants/settings'
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
      className={`${SETTINGS_CONTROL_CLASS_NAME} min-w-0 flex-1`}
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
