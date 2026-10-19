import { TriangleAlert } from 'lucide-react'

/** MaxMind onboarding help of the GeoIP section. */
export function GeoIpSectionIntro() {
  return (
    <div className="text-muted-foreground space-y-2 text-sm">
      <p>
        Create a free MaxMind account and generate a license key. GeoIP
        enrichment starts once the database has been downloaded.
      </p>
      <p className="text-warning flex items-center gap-1.5 text-xs font-medium">
        <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Database updates are CPU and disk intensive.
      </p>
    </div>
  )
}
