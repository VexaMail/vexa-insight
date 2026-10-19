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
        type="button"
        onClick={onToggle}
        aria-label="Account menu"
        aria-expanded={isOpen}
        className="focus-visible:ring-ring flex h-10 w-10 items-center justify-center rounded-full outline-none focus-visible:ring-2"
      >
        <Avatar className="border-border h-8 w-8 border transition-opacity hover:opacity-80">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            <User strokeWidth={2.5} className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen ? (
        <div className="border-border bg-popover text-popover-foreground absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md border py-1 shadow-xl">
          <div className="border-border text-muted-foreground mb-1 border-b px-4 py-2 text-sm">
            <p className="font-medium">Signed in</p>
          </div>

          <button
            onClick={onSignOut}
            type="button"
            className="hover:bg-accent focus-visible:bg-accent flex min-h-10 w-full items-center px-4 text-sm outline-none"
          >
            <LogOut className="text-muted-foreground mr-2 h-4 w-4" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
