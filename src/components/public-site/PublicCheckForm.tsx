import { LoaderCircle, Search } from 'lucide-react'
import type { PublicCheckFormProps } from '../../types/public-check/PublicCheckFormProps'
import { PublicDomainInput } from './PublicDomainInput'

export function PublicCheckForm({
  domain,
  pending,
  submit,
}: Readonly<PublicCheckFormProps>) {
  return (
    <form
      onSubmit={(event) => {
        void submit(event)
      }}
      aria-busy={pending}
      className="bg-card mx-auto max-w-2xl rounded-xl border p-4 shadow-sm sm:p-5"
    >
      <label htmlFor="public-domain" className="mb-2 block text-sm font-medium">
        Your domain
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <PublicDomainInput key={domain} domain={domain} />
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-primary-foreground focus-visible:ring-ring flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {pending ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-4 motion-safe:animate-spin"
            />
          ) : (
            <Search aria-hidden="true" className="size-4" />
          )}
          {pending ? 'Checking DNS…' : 'Check my domain'}
        </button>
      </div>
      <p id="domain-help" className="text-muted-foreground mt-3 text-xs">
        No account. No email address. Only public DNS records.
      </p>
    </form>
  )
}
