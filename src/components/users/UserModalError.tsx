import type { UserModalErrorProps } from './UserModalErrorProps'

/** The submit error banner; renders nothing for an empty message. */
export function UserModalError({ message }: Readonly<UserModalErrorProps>) {
  if (message === '') return null
  return (
    <div className="text-destructive bg-destructive/10 mb-4 rounded p-2 text-sm">
      {message}
    </div>
  )
}
