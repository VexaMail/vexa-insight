export function PublicProtocolStrip() {
  return (
    <div
      aria-label="Included checks"
      className="text-muted-foreground mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-5 text-center sm:grid-cols-4"
    >
      <p>
        <strong className="text-foreground block font-mono text-sm">SPF</strong>
        <span className="text-xs">Who may send</span>
      </p>
      <p>
        <strong className="text-foreground block font-mono text-sm">
          DKIM
        </strong>
        <span className="text-xs">Signing key discovery</span>
      </p>
      <p>
        <strong className="text-foreground block font-mono text-sm">
          DMARC
        </strong>
        <span className="text-xs">Your published policy</span>
      </p>
      <p>
        <strong className="text-foreground block font-mono text-sm">MX</strong>
        <span className="text-xs">Where mail arrives</span>
      </p>
    </div>
  )
}
