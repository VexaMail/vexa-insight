'use client'

import { useState } from 'react'

import type {
  GeneratorFieldValues,
  UseGeneratorFieldsReturn,
} from '@/types/diagnostics'

/** The values of one record generator form, starting from the live record. */
export function useGeneratorFields<T extends GeneratorFieldValues>(
  initial: T,
): UseGeneratorFieldsReturn<T> {
  const [values, setValues] = useState<T>(initial)

  function setField<K extends keyof T>(key: K, value: T[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  return { values, setField }
}
