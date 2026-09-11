import { Key } from 'lucide-react'

/** Icon, heading and blurb that open the API key settings card. */
export function ApiKeySectionHeader() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
        <Key className="h-4 w-4" />
      </div>
      <div>
        <h2
          id="settings-api-key-heading"
          className="font-display text-foreground text-sm font-semibold"
        >
          API Key
        </h2>
        <p className="text-muted-foreground text-xs">
          SECRET_KEY from the environment. Used for API calls, crons and
          external scripts, and to encrypt stored credentials. Change it with
          `recovery.ts rotate-key`, not here.
        </p>
      </div>
    </div>
  )
}
