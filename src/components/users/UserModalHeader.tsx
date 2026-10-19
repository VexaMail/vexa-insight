import type { UserModalHeaderProps } from './UserModalHeaderProps'

/** Title and one help line of the create/edit user dialog. */
export function UserModalHeader({ isEdit }: Readonly<UserModalHeaderProps>) {
  return (
    <header className="border-border border-b px-5 py-4">
      <h2
        id="user-modal-title"
        className="text-foreground text-base font-semibold"
      >
        {isEdit ? 'Edit user' : 'Create user'}
      </h2>
      <p className="text-muted-foreground mt-0.5 text-xs">
        {isEdit
          ? 'Change the role, the domains this account sees, or its password.'
          : 'Sign-in credentials, a role and the domains this account sees.'}
      </p>
    </header>
  )
}
