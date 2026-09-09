import { useFolderPicker } from '@/hooks/settings'
import { FolderPickerCreateForm } from './FolderPickerCreateForm'
import type { FolderPickerProps } from './FolderPickerProps'
import { FolderPickerSelect } from './FolderPickerSelect'
import { FolderPickerToolbar } from './FolderPickerToolbar'

export function FolderPicker({
  accountId,
  apiKey,
  value,
  onChange,
}: Readonly<FolderPickerProps>) {
  const picker = useFolderPicker(accountId, apiKey, onChange)
  const { state } = picker

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FolderPickerSelect
          value={value}
          state={state}
          hasLoaded={picker.hasLoaded}
          onChange={onChange}
          onLoad={picker.handleLoadFolders}
        />
        <FolderPickerToolbar
          loading={state.loading}
          onReload={picker.handleLoadFolders}
          onToggleCreate={picker.handleToggleShowCreate}
        />
      </div>
      {state.error != null && state.error !== '' && (
        <p className="text-danger text-xs">{state.error}</p>
      )}
      {picker.showCreate ? (
        <FolderPickerCreateForm
          newFolderPath={picker.newFolderPath}
          creating={picker.creating}
          createError={picker.createError}
          onPathChange={picker.handleNewFolderPathChange}
          onCreate={picker.handleCreate}
          onCancel={picker.handleCancelCreate}
        />
      ) : null}
    </div>
  )
}
