import Link from 'next/link'
import VexaLogo from '../shell/VexaLogo'

export function PublicHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
      <VexaLogo projectName="Vexa Insight" />
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-5 text-sm"
      >
        <Link
          href="/#how-it-works"
          className="text-muted-foreground hover:text-foreground hidden sm:block"
        >
          How it works
        </Link>
        <a
          href="#monitor"
          className="text-foreground hover:bg-accent inline-flex min-h-11 items-center rounded-md border px-4 py-2 font-medium"
        >
          About the app
        </a>
      </nav>
    </header>
  )
}
