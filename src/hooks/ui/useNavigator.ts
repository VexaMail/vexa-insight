import { useListState } from '@/hooks/core'
import type { NavigatorProps, UseNavigatorReturn } from '@/types/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export function useNavigator(props: NavigatorProps): UseNavigatorReturn {
  const router = useRouter()
  const {
    itemsScope,
    scopeMode,
    setScopeMode,
    setCurrentId,
    navigateContext,
    setScope,
  } = useListState()

  useEffect(() => {
    setCurrentId(props.currentId)
  }, [props.currentId, setCurrentId])

  const { currentIndex, hasNext, hasPrev, total } = useMemo(() => {
    const currentIndex = itemsScope.indexOf(props.currentId)
    const total = itemsScope.length

    return {
      currentIndex,
      hasNext: currentIndex !== -1 && currentIndex < total - 1,
      hasPrev: currentIndex !== -1 && currentIndex > 0,
      total,
    }
  }, [itemsScope, props.currentId])

  const handleNext = () => {
    const nextId = navigateContext('next')
    if (!nextId) return

    if (props.onNavigate) props.onNavigate(nextId)
    else if (props.basePath) router.push(`${props.basePath}/${nextId}`)
  }

  const handlePrev = () => {
    const prevId = navigateContext('prev')
    if (!prevId) return

    if (props.onNavigate) props.onNavigate(prevId)
    else if (props.basePath) router.push(`${props.basePath}/${prevId}`)
  }

  const handleSetScopeFiltered = () => {
    setScopeMode('filtered')
  }

  const handleSetScopeAll = () => {
    setScopeMode('all')
    if (!props.basePath) return

    void (async () => {
      try {
        const res = await fetch(`/api/v1${props.basePath}/ids`)
        if (!res.ok) return
        const json = (await res.json()) as { data: string[] }
        setScope(json.data)
      } catch (e) {
        console.error('Failed to load all items scope', e)
      }
    })()
  }

  return {
    currentIndex,
    hasNext,
    hasPrev,
    total,
    scopeMode,
    handleNext,
    handlePrev,
    handleSetScopeAll,
    handleSetScopeFiltered,
  }
}
