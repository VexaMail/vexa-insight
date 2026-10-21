export function PublicFooter() {
  return (
    <footer className="text-muted-foreground border-t px-5 py-6 text-xs sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
        <p>Vexa Insight · Email authentication, made visible.</p>
        <div className="flex gap-5">
          <a
            href="https://github.com/VexaMail/vexa-insight"
            className="hover:text-foreground inline-flex min-h-11 items-center"
          >
            Source code
          </a>
          <a
            href="https://github.com/VexaMail/vexa-insight/blob/main/LICENSE"
            className="hover:text-foreground inline-flex min-h-11 items-center"
          >
            Apache 2.0
          </a>
        </div>
      </div>
    </footer>
  )
}
