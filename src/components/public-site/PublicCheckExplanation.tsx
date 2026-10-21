import type { PublicCheckCardProps } from '../../types/public-check/PublicCheckCardProps'

export function PublicCheckExplanation({
  check,
}: Readonly<PublicCheckCardProps>) {
  return (
    <details className="mt-2 text-sm">
      <summary className="text-primary cursor-pointer py-3 font-medium">
        What this means
      </summary>
      <p className="text-muted-foreground max-w-prose leading-relaxed">
        {check.recommendation}
      </p>
    </details>
  )
}
