import { SECRET_KEY_REQUIRED_MESSAGE } from '@/constants/install'
import { TriangleAlert } from 'lucide-react'

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
      className="border-warning/30 bg-warning/10 text-foreground flex gap-3 rounded-md border p-4 text-sm"
    >
      <TriangleAlert className="text-warning mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="font-semibold">
          <code className="font-mono">SECRET_KEY</code> is missing
        </p>
        <p className="text-muted-foreground mt-1.5">
          {SECRET_KEY_REQUIRED_MESSAGE}
        </p>
      </div>
    </div>
  )
}
