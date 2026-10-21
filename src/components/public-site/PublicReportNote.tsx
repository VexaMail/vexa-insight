export function PublicReportNote() {
  return (
    <p className="text-muted-foreground mt-4 max-w-prose text-xs leading-relaxed">
      This is a DNS snapshot, not a delivery test. DMARC inheritance and SPF
      include/redirect dependencies are checked within explicit DNS budgets;
      message-specific authentication is not evaluated. Missing records may be
      intentional for domains that do not send or receive mail.
    </p>
  )
}
