'use client'

import {
  Avatar,
  AvatarFallback,
  Breadcrumbs,
  Button,
  Input,
} from '@/components/ui'
import { useTopBar } from '@/hooks/shell'
import { Bell, LogOut, Search, User } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function TopBar() {
  const {
    isProfileOpen,
    menuRef,
    handleSignOutClick,
    handleToggleProfileClick,
  } = useTopBar()

  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-3">
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search..."
            className="bg-secondary border-border/50 focus:border-primary/50 h-8 w-52 pl-8 text-xs"
            readOnly
          />
        </div>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={handleToggleProfileClick}
            className="flex items-center rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Avatar className="border-border/50 h-7 w-7 cursor-pointer border transition-opacity hover:opacity-80">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                <User strokeWidth={2.5} className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
          </button>

          {isProfileOpen && (
            <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-1 border-b border-gray-100 px-4 py-2 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-200">
                <p className="font-medium">Signed in</p>
              </div>

              <button
                onClick={handleSignOutClick}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <LogOut className="mr-2 h-4 w-4 space-x-2 text-gray-500" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
