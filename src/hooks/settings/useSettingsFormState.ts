import type {
  SettingsConfigFormProps,
  SettingsFormState,
  UseSettingsFormStateReturn,
} from '@/types/settings'
import { getSettingsFormState, isSettingsFormDirty } from '@/utils/settings'
import { useMemo, useState } from 'react'

/** The settings form values next to the last saved values, so unsaved edits can be shown. */
export function useSettingsFormState(
  initialData: SettingsConfigFormProps['initialData'],
): UseSettingsFormStateReturn {
  const [form, setForm] = useState<SettingsFormState>(() =>
    getSettingsFormState(initialData),
  )
  const [saved, setSaved] = useState<SettingsFormState>(form)
  const isDirty = useMemo(() => isSettingsFormDirty(form, saved), [form, saved])
  return { form, setForm, isDirty, markSaved: setSaved }
}
