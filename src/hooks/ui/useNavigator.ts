import { useListState } from '@/hooks/core'
import type { NavigatorProps, UseNavigatorReturn } from '@/types/ui'
import { useEffect } from 'react'
import { useNavigateTo } from './useNavigateTo'
import { useNavigatorPosition } from './useNavigatorPosition'
import { useScopeModeHandlers } from './useScopeModeHandlers'

export function useNavigator(props: NavigatorProps): UseNavigatorReturn {
  const { itemsScope, scopeMode, setCurrentId, navigateContext } =
    useListState()
  const navigateTo = useNavigateTo(props)
  const scopeHandlers = useScopeModeHandlers(props.basePath)

  useEffect(() => {
    setCurrentId(props.currentId)
  }, [props.currentId, setCurrentId])

  const position = useNavigatorPosition(itemsScope, props.currentId)

  const handleNext = () => {
    const nextId = navigateContext('next')
    if (nextId) navigateTo(nextId)
  }

  const handlePrev = () => {
    const prevId = navigateContext('prev')
    if (prevId) navigateTo(prevId)
  }

  return { ...position, scopeMode, handleNext, handlePrev, ...scopeHandlers }
}
