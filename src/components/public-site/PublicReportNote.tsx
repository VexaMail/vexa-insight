export function PublicReportNote() {
  return (
    <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
      This is a direct DNS snapshot, not a delivery test. DMARC inheritance from
      a parent domain and recursive SPF dependencies are not evaluated. Missing
      records may be intentional for domains that do not send or receive mail.
    </p>
  )
}
