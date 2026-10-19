import Image from 'next/image'
import type { VexaWordmarkProps } from './VexaWordmarkProps'

/** The full logo, with a light-text variant for the dark theme. */
export function VexaWordmark({ alt }: Readonly<VexaWordmarkProps>) {
  return (
    <>
      <Image
        src="/vexa-insight-logo.svg"
        alt={alt}
        width={123}
        height={32}
        className="h-10 w-auto dark:hidden"
        priority
      />
      <Image
        src="/vexa-insight-logo-dark.svg"
        alt={alt}
        width={123}
        height={32}
        className="hidden h-10 w-auto dark:block"
        priority
      />
    </>
  )
}
