import type { IpLookUpButtonProps } from '@/types/ips'
import { Loader2, Search } from 'lucide-react'

/** The small button that starts a live network lookup. */
export function IpLookUpButton({
  loading,
  onClick,
  label = 'Look up',
}: Readonly<IpLookUpButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {loading ? 'Looking up' : label}
    </button>
  )
}
