/** How the SNDS sign-in round trip works, shown above the connect controls. */
export function SndsSectionIntro() {
  return (
    <p className="text-muted-foreground text-sm">
      Sign in with the Microsoft account that holds your SNDS networks.
      Microsoft only allows{' '}
      <code className="bg-secondary rounded px-1 font-mono text-xs">
        http://localhost
      </code>{' '}
      as the return address, so the browser ends on an error page: copy that
      page&apos;s full address and paste it below within a minute.
    </p>
  )
}
