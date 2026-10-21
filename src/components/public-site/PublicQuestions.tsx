export function PublicQuestions() {
  return (
    <div className="mt-12 max-w-prose space-y-2">
      <h3 className="mb-4 text-lg font-semibold tracking-normal">
        DMARC checker questions
      </h3>
      <details className="border-b pb-3 last:border-b-0">
        <summary className="cursor-pointer py-3 font-medium">
          How do I check my DMARC record?
        </summary>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enter your domain in the free checker above. It looks up
          _dmarc.your-domain and shows the record, policy and any basic
          validation issues. No account or mailbox access is required.
        </p>
      </details>
      <details className="border-b pb-3 last:border-b-0">
        <summary className="cursor-pointer py-3 font-medium">
          Does p=none mean my DMARC is broken?
        </summary>
        <p className="text-muted-foreground text-sm leading-relaxed">
          No. It is a valid monitoring policy that requests no quarantine or
          rejection. Review your legitimate senders and authentication results
          before moving to an enforcement policy.
        </p>
      </details>
      <details className="border-b pb-3 last:border-b-0">
        <summary className="cursor-pointer py-3 font-medium">
          Is this an email deliverability or spam test?
        </summary>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This is a public DNS configuration check. It does not send a message,
          validate an email address, check blocklists or measure inbox
          placement. DNS configuration and actual message delivery need
          different evidence.
        </p>
      </details>
      <details className="border-b pb-3 last:border-b-0">
        <summary className="cursor-pointer py-3 font-medium">
          How can I monitor authentication over time?
        </summary>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Install Vexa Insight and connect a mailbox that receives DMARC
          aggregate reports, or upload report files. The app shows observed
          sending sources and SPF, DKIM and DMARC results over time.
        </p>
      </details>
    </div>
  )
}
