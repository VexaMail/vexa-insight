import { CircleAlert } from 'lucide-react'
import type { LoginErrorBannerProps } from './LoginErrorBannerProps'

/** The failed-attempt message; nothing until an attempt has failed. */
export function LoginErrorBanner({ state }: Readonly<LoginErrorBannerProps>) {
  if (state === undefined || state.error === '') return null
  return (
    <div
      role="alert"
      className="border-danger/30 bg-danger/10 text-danger flex items-start gap-2 rounded-md border px-3 py-2 text-sm"
    >
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{state.error}</span>
    </div>
  )
}
