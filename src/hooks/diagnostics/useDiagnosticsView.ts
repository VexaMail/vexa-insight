'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition } from 'react'

import type { UseDiagnosticsViewReturn } from '@/types/diagnostics'

export function useDiagnosticsView(): UseDiagnosticsViewReturn {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleDomainChange(name: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('domain')
    const qs = params.toString()
    const href = qs ? `/diagnostics/${name}?${qs}` : `/diagnostics/${name}`

    startTransition(() => {
      router.push(href)
    })
  }

  return { handleDomainChange }
}
