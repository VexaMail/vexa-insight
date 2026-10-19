import Image from 'next/image'

/** The full logo for the sign-in and setup screens, with a dark-theme variant. */
export function AuthWordmark() {
  return (
    <>
      <Image
        src="/vexa-insight-logo.svg"
        alt="Vexa Insight"
        width={154}
        height={40}
        className="h-10 w-auto dark:hidden"
        priority
      />
      <Image
        src="/vexa-insight-logo-dark.svg"
        alt="Vexa Insight"
        width={154}
        height={40}
        className="hidden h-10 w-auto dark:block"
        priority
      />
    </>
  )
}
