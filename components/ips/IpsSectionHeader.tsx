export default function IpsSectionHeader() {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">Sending Sources</h1>
      <p className="text-muted-foreground max-w-2xl text-sm">
        IP addresses that sent email claiming to be from your domains, based on
        DMARC aggregate reports. Review authentication health to identify
        trusted and potentially unauthorized sources.
      </p>
    </div>
  )
}
