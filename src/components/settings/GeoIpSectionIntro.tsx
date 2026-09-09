import { Database } from 'lucide-react'

/** Heading and MaxMind onboarding notice of the GeoIP settings card. */
export function GeoIpSectionIntro() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Database className="text-muted-foreground h-5 w-5" />
        <h2 className="text-xl font-semibold tracking-tight">
          GeoIP (MaxMind)
        </h2>
      </div>

      <p className="text-muted-foreground text-sm">
        Create a free MaxMind account and generate a license key to enable GeoIP
        enrichment. The database must be downloaded before features will work.
        <br />
        <span className="text-warning font-semibold">
          Notice: Database updates can be resource-intensive.
        </span>
      </p>
    </>
  )
}
