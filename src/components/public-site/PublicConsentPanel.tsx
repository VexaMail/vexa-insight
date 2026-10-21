import type { PublicConsentPanelProps } from '../../types/public-check/PublicConsentPanelProps'

export function PublicConsentPanel({
  accept,
  reject,
}: Readonly<PublicConsentPanelProps>) {
  return (
    <section
      aria-label="Analytics preferences"
      className="bg-card fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-lg border p-5 shadow-lg"
    >
      <h2 className="text-sm font-semibold">Optional analytics</h2>
      <p className="text-muted-foreground mt-2 max-w-prose leading-relaxed">
        Allow Google Analytics to measure visits, completed checks and
        installation clicks? Your scanned domain, DKIM selector and DNS records
        are excluded. Google processes usage data and sets analytics cookies
        only after you accept. Your browser remembers your choice; you can
        change it here at any time.
      </p>
      <a
        href="https://policies.google.com/privacy"
        className="mt-2 inline-block underline"
      >
        Google privacy policy
      </a>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reject}
          className="min-h-11 rounded-md border px-4 text-sm font-medium"
        >
          Reject analytics
        </button>
        <button
          type="button"
          onClick={accept}
          className="min-h-11 rounded-md border px-4 text-sm font-medium"
        >
          Accept analytics
        </button>
      </div>
    </section>
  )
}
