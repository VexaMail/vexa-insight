export function PublicProtocolGuide() {
  return (
    <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <article id="dmarc-checker">
        <h3 className="text-lg font-semibold tracking-normal">
          DMARC checker &amp; record lookup
        </h3>
        <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
          A DMARC lookup reads the TXT record at _dmarc.your-domain. It explains
          the published policy: none for monitoring, quarantine for suspicious
          mail, or reject for mail that fails DMARC. If no direct policy is
          found, a bounded DNS tree walk checks inherited policies and shows
          their source.
        </p>
      </article>
      <article id="spf-checker">
        <h3 className="text-lg font-semibold tracking-normal">SPF checker</h3>
        <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
          SPF describes which senders a domain authorizes. Check for a single
          published record and basic syntax issues. A SoftFail policy (~all) is
          valid. Includes and redirects are checked recursively within a DNS
          budget. Static lookup counts are upper bounds; a passing check is not
          proof of a passing message.
        </p>
      </article>
      <article id="dkim-lookup">
        <h3 className="text-lg font-semibold tracking-normal">
          DKIM key discovery
        </h3>
        <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
          DKIM public keys live under selector._domainkey.your-domain. We try
          common selectors, or you can enter your provider’s selector. A
          discovered key cannot prove that mail is signed correctly; a missing
          candidate does not prove that DKIM is absent. Confirm your selector
          with your email provider.
        </p>
      </article>
      <article id="mx-lookup">
        <h3 className="text-lg font-semibold tracking-normal">MX lookup</h3>
        <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
          MX records identify where incoming mail is routed. They are useful
          when checking domain email configuration, but they do not identify
          every outbound sender. A domain that does not receive mail may
          intentionally publish a null MX.
        </p>
      </article>
    </div>
  )
}
