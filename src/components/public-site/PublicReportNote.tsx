export function PublicReportNote() {
  return (
    <p className="text-muted-foreground mt-4 max-w-prose text-xs leading-relaxed">
      This is a DNS snapshot, not a delivery test. Parent-domain DMARC
      inheritance and recursive SPF dependencies are not evaluated. Missing
      records may be intentional for domains that do not send or receive mail.
    </p>
  )
}
