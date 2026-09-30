import type { DomainSectionProps } from './DomainSectionProps'

/** A titled section of the domain page, labelled by its heading. */
export function DomainSection({ id, title, children }: DomainSectionProps) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
