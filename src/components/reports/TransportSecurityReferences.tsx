/** The normative RFC links that close the transport primer. */
export function TransportSecurityReferences() {
  const rfcMtaStsHref = 'https://www.rfc-editor.org/rfc/rfc8461'
  const rfcTlsRptHref = 'https://www.rfc-editor.org/rfc/rfc8460'

  return (
    <p className="text-muted-foreground">
      Normative references:{' '}
      <a
        href={rfcMtaStsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
      >
        RFC 8461 (MTA-STS)
      </a>
      ,{' '}
      <a
        href={rfcTlsRptHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
      >
        RFC 8460 (TLS-RPT)
      </a>
      .
    </p>
  )
}
