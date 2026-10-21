import VexaLogo from '../shell/VexaLogo'

export function PublicHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
      <VexaLogo projectName="Vexa Insight" />
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-5 text-sm"
      >
        <a
          href="#how-it-works"
          className="text-muted-foreground hover:text-foreground hidden sm:block"
        >
          How it works
        </a>
        <a
          href="#monitor"
          className="text-foreground hover:bg-accent rounded-md border px-4 py-2 font-medium"
        >
          Get Vexa Insight <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
