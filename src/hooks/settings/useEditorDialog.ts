'use client'

import type {
  EditorDialogConfig,
  EditorDialogState,
  WithId,
} from '@/types/settings'
import { saveAdminItem } from '@/utils/settings'
import { useState } from 'react'

/** Create/edit dialog over one admin collection: open, fill, validate, save. */
export function useEditorDialog<F, T extends WithId>(
  config: EditorDialogConfig<F, T>,
): EditorDialogState<F, T> {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<F>(config.emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const show = (id: number | null, next: F) => {
    setEditingId(id)
    setForm(next)
    setError(null)
    setOpen(true)
  }

  const submit = async () => {
    const payload = config.toPayload(form, editingId !== null)
    if (!payload.ok) {
      setError(payload.message)
      return
    }
    setSaving(true)
    const result = await saveAdminItem(config.basePath, editingId, payload.data)
    setSaving(false)
    setError(result.ok ? null : result.message)
    if (!result.ok) return
    setOpen(false)
    await config.onSaved()
  }

  return {
    open,
    editingId,
    form,
    setForm,
    saving,
    error,
    openCreate: () => {
      show(null, config.emptyForm)
    },
    openEdit: (item) => {
      show(item.id, config.toForm(item))
    },
    close: () => {
      setOpen(false)
    },
    submit,
  }
}
