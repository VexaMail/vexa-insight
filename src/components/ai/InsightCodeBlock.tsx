import type { InsightCodeBlockProps } from './InsightCodeBlockProps'

export function InsightCodeBlock({
  label,
  value,
  className,
}: Readonly<InsightCodeBlockProps>) {
  return (
    <div className={className}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <pre className="bg-muted overflow-x-auto rounded px-2 py-1 text-xs break-all whitespace-pre-wrap">
        <code>{value}</code>
      </pre>
    </div>
  )
}
