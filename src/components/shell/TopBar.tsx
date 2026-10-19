'use client'

import { useTopBar } from '@/hooks/shell'
import type { TopBarProps } from '@/types/shell'
import { CommandPalette } from './CommandPalette'
import { MobileNav } from './MobileNav'
import { ProfileMenu } from './ProfileMenu'
import ThemeToggle from './ThemeToggle'

export default function TopBar({ projectName }: Readonly<TopBarProps>) {
  const {
    isProfileOpen,
    menuRef,
    handleSignOutClick,
    handleToggleProfileClick,
  } = useTopBar()

  return (
    <header className="border-border bg-background/85 sticky top-0 z-30 flex h-16 items-center gap-2 border-b px-3 backdrop-blur-xl sm:gap-4 sm:px-4 print:hidden">
      <MobileNav projectName={projectName} />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <CommandPalette />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <ProfileMenu
          isOpen={isProfileOpen}
          menuRef={menuRef}
          onToggle={handleToggleProfileClick}
          onSignOut={handleSignOutClick}
        />
      </div>
    </header>
  )
}
