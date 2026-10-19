import type { UserModalErrorProps } from './UserModalErrorProps'

/** The submit error banner; renders nothing for an empty message. */
export function UserModalError({ message }: Readonly<UserModalErrorProps>) {
  if (message === '') return null
  return (
    <div
      role="alert"
      className="border-danger/30 bg-danger/10 text-danger rounded-md border px-3 py-2 text-sm"
    >
      {message}
    </div>
  )
}
