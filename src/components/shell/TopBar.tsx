'use client'

import { Breadcrumbs, Button } from '@/components/ui'
import { useTopBar } from '@/hooks/shell'
import { Bell } from 'lucide-react'
import { ProfileMenu } from './ProfileMenu'
import ThemeToggle from './ThemeToggle'
import { TopBarSearch } from './TopBarSearch'

export default function TopBar() {
  const {
    isProfileOpen,
    menuRef,
    handleSignOutClick,
    handleToggleProfileClick,
  } = useTopBar()

  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 backdrop-blur-xl print:hidden">
      <div className="flex flex-1 items-center gap-3">
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        <TopBarSearch />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <Bell className="h-4 w-4" />
        </Button>

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
