/** The high-level MTA-STS rollout steps listed in the transport primer. */
export function TransportSecurityChecklist() {
  return (
    <div>
      <p className="text-foreground mb-2 font-medium">Checklist (high level)</p>
      <ul className="text-muted-foreground list-inside list-disc space-y-1.5">
        <li>
          Publish a policy file at{' '}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
            https://mta-sts.your-domain/.well-known/mta-sts.txt
          </code>{' '}
          over HTTPS with a publicly trusted certificate for{' '}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
            mta-sts.your-domain
          </code>{' '}
          (replace <span className="font-mono">your-domain</span> with your apex
          domain).
        </li>
        <li>
          Add a <code className="font-mono text-xs">TXT</code> record at{' '}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
            _mta-sts.your-domain
          </code>{' '}
          (e.g. <code className="font-mono text-xs">v=STSv1; id=…</code> — bump{' '}
          <code className="font-mono text-xs">id</code> when the policy
          changes).
        </li>
        <li>
          Include every MX hostname from your DNS in the policy; keep them
          consistent with live MX records.
        </li>
        <li>
          Start with <code className="font-mono text-xs">mode: testing</code>,
          monitor delivery and TLS reports, then move to{' '}
          <code className="font-mono text-xs">mode: enforce</code> when
          confident.
        </li>
        <li>Ensure inbound MX servers negotiate TLS 1.2 or higher for SMTP.</li>
      </ul>
    </div>
  )
}
