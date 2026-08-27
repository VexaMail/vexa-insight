'use client'

import { logoutAction } from '@/actions'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { UseTopBarReturn } from '@/types/shell'
import { useCallback, useRef, useState } from 'react'

export function useTopBar(): UseTopBarReturn {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false)
  }, [])
  useClickOutside(menuRef, closeProfile)

  function handleToggleProfileClick() {
    setIsProfileOpen((v) => !v)
  }

  function handleSignOutClick() {
    setIsProfileOpen(false)
    void logoutAction()
  }

  return {
    isProfileOpen,
    menuRef,
    handleSignOutClick,
    handleToggleProfileClick,
  }
}
