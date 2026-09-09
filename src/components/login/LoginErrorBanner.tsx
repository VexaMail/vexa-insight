import type { LoginErrorBannerProps } from './LoginErrorBannerProps'

/** The failed-attempt message; nothing until an attempt has failed. */
export function LoginErrorBanner({ state }: Readonly<LoginErrorBannerProps>) {
  if (state === undefined || state.error === '') return null
  return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
      {state.error}
    </div>
  )
}
