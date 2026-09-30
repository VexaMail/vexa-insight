import { MailCheck } from 'lucide-react'

/** Heading and explanation of the Microsoft SNDS settings card. */
export function SndsSectionIntro() {
  return (
    <>
      <div className="flex items-center gap-2">
        <MailCheck className="text-muted-foreground h-5 w-5" />
        <h2 className="text-xl font-semibold tracking-tight">Microsoft SNDS</h2>
      </div>

      <p className="text-muted-foreground text-sm">
        Pulls Outlook.com&apos;s daily view of your sending IPs (filter result,
        complaint rate, spam trap hits) from Smart Network Data Services. Sign
        in with the Microsoft account that holds your SNDS networks. Microsoft
        only allows <code>http://localhost</code> as the return address, so the
        browser ends on an error page: copy that page&apos;s full address and
        paste it below within a minute.
      </p>
    </>
  )
}
