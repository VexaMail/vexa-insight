'use client'

import { Popover, PopoverAnchor } from '@/components/ui'
import { useModelCombobox } from '../../hooks/settings/useModelCombobox'
import { ModelComboboxPanel } from './ModelComboboxPanel'
import type { ModelComboboxProps } from './ModelComboboxProps'
import { ModelComboboxTrigger } from './ModelComboboxTrigger'
import { MODEL_LISTBOX_ID } from './modelListboxId'

/**
 * Searchable combobox for selecting an AI model from a provider.
 * Uses Radix Popover with inline search and keyboard navigation.
 */
export function ModelCombobox({
  models,
  value,
  isLoading,
  error,
  savedModelMissing,
  onChange,
}: Readonly<ModelComboboxProps>) {
  const combobox = useModelCombobox(models, value, onChange)
  const { isOpen, setIsOpen } = combobox

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ai-model-combobox" className="text-sm font-medium">
        Model{' '}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverAnchor asChild>
          <ModelComboboxTrigger
            isOpen={isOpen}
            isLoading={isLoading}
            listboxId={MODEL_LISTBOX_ID}
            label={
              savedModelMissing
                ? `${value} (unavailable)`
                : combobox.displayLabel
            }
            hasValue={Boolean(value)}
            savedModelMissing={savedModelMissing}
            onToggle={() => {
              setIsOpen(!isOpen)
            }}
          />
        </PopoverAnchor>
        <ModelComboboxPanel combobox={combobox} models={models} value={value} />
      </Popover>

      {error != null && error !== '' && (
        <p className="text-warning text-xs">{error}</p>
      )}
    </div>
  )
}
