import Image from 'next/image'
import Link from 'next/link'

export default function VexaLogo({
  collapsed = false,
}: Readonly<{
  collapsed?: boolean
}>) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 px-2 py-1"
      suppressHydrationWarning
    >
      {collapsed ? (
        <div className="relative flex h-8 w-8 items-center justify-center transition-opacity group-hover:opacity-80">
          <Image
            src="/vexa-insight-icon.svg"
            alt="Vexa Insight Icon"
            width={32}
            height={32}
          />
        </div>
      ) : (
        <div className="relative flex h-8 items-center transition-opacity group-hover:opacity-80">
          <Image
            src="/vexa-insight-logo.svg"
            alt="Vexa Insight Logo"
            // 123x32 matches the artwork's real proportions (viewBox
            // 2286.29x592.55). The old 140x32 box was wider than the drawing,
            // so the rendered width never equalled the declared width and
            // next/image warned that one dimension was modified without the
            // other. `w-auto` keeps width tied to the fixed h-8 height.
            width={123}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </div>
      )}
    </Link>
  )
}
