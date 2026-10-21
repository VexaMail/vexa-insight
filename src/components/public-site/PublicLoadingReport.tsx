import type { PublicDomainInputProps } from '../../types/public-check/PublicDomainInputProps'

export function PublicLoadingReport({
  domain,
}: Readonly<PublicDomainInputProps>) {
  return (
    <section
      aria-label="Loading domain report"
      aria-busy="true"
      className="mb-6"
    >
      <h1 className="text-3xl font-semibold break-all">{domain}</h1>
      <p role="status" className="text-muted-foreground mt-3">
        Looking up public DNS records…
      </p>
      <div
        aria-hidden="true"
        className="bg-card mt-6 flex min-h-72 items-center gap-6 rounded-xl border p-6 sm:min-h-48"
      >
        <div className="bg-muted size-28 shrink-0 rounded-full motion-safe:animate-pulse" />
        <div className="flex-1 space-y-4">
          <div className="bg-muted h-5 w-3/4 rounded" />
          <div className="bg-muted h-4 w-1/2 rounded" />
        </div>
      </div>
      <div aria-hidden="true" className="mt-6 grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-card min-h-52 space-y-4 rounded-xl border p-6"
          >
            <div className="bg-muted h-5 w-1/3 rounded" />
            <div className="bg-muted h-4 w-3/4 rounded" />
            <div className="bg-muted h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </section>
  )
}
