import { Button } from '@/components/ui'
import { Check } from 'lucide-react'
import type { SndsConnectFormProps } from './SndsConnectFormProps'

/** Second step of connecting: paste the address the sign-in ended on. */
export function SndsConnectForm({
  authorizeUrl,
  redirectUrl,
  isBusy,
  onChange,
  onSubmit,
}: SndsConnectFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm">
        A Microsoft sign-in opened in a new tab. If it did not,{' '}
        <a
          href={authorizeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          open it here
        </a>
        .
      </p>
      <label htmlFor="snds-redirect-url" className="text-sm font-medium">
        Address the sign-in ended on
      </label>
      <div className="flex gap-2">
        <input
          id="snds-redirect-url"
          type="text"
          autoComplete="off"
          placeholder="http://localhost/?code=..."
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          value={redirectUrl}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={isBusy || !redirectUrl.trim()}
          onClick={onSubmit}
        >
          <Check className="mr-2 h-4 w-4" />
          {isBusy ? 'Connecting...' : 'Finish'}
        </Button>
      </div>
    </div>
  )
}
