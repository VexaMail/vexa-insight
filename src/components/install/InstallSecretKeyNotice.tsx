import { SECRET_KEY_REQUIRED_MESSAGE } from '@/constants/install'

/**
 * Stands in for the installer form when the environment has no `SECRET_KEY`.
 *
 * There is nothing to submit in that state: the encryption root is read from
 * the environment only, so the instance cannot be installed until the operator
 * supplies one and restarts.
 */
export function InstallSecretKeyNotice() {
  return (
    <div
      role="alert"
      className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
    >
      <p className="font-semibold">SECRET_KEY is missing</p>
      <p className="mt-2">{SECRET_KEY_REQUIRED_MESSAGE}</p>
    </div>
  )
}
