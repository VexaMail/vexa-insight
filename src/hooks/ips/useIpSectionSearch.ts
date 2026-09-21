'use client'

import { ipSearchDebounceMs } from '@/constants/ips'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import type {
  UseIpSectionSearchParams,
  UseIpSectionSearchReturn,
} from '@/types/ips'
import { useEffect, useState } from 'react'

/** Keeps the typed text local and reports it once typing has settled. */
export function useIpSectionSearch({
  value,
  onSearch,
}: UseIpSectionSearchParams): UseIpSectionSearchReturn {
  const [text, setText] = useState(value)
  const debounced = useDebouncedValue(text, ipSearchDebounceMs)

  useEffect(() => {
    if (debounced !== value) {
      onSearch(debounced)
    }
    // The debounced text is the only trigger; onSearch and value change
    // identity on every parent render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return { text, handleChange: setText }
}
