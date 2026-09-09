import { Avatar, AvatarFallback } from '@/components/ui'
import { LogOut, User } from 'lucide-react'
import type { ProfileMenuProps } from './ProfileMenuProps'

/** The avatar button and the sign-out dropdown it opens. */
export function ProfileMenu({
  isOpen,
  menuRef,
  onToggle,
  onSignOut,
}: Readonly<ProfileMenuProps>) {
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className="flex items-center rounded-full outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Avatar className="border-border/50 h-7 w-7 cursor-pointer border transition-opacity hover:opacity-80">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            <User strokeWidth={2.5} className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen ? (
        <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-1 border-b border-gray-100 px-4 py-2 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-200">
            <p className="font-medium">Signed in</p>
          </div>

          <button
            onClick={onSignOut}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <LogOut className="mr-2 h-4 w-4 space-x-2 text-gray-500" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
