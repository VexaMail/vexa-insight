import type { InsightCodeBlockProps } from './InsightCodeBlockProps'

export function InsightCodeBlock({
  label,
  value,
  className,
}: Readonly<InsightCodeBlockProps>) {
  return (
    <div className={className}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <pre className="overflow-x-auto rounded bg-zinc-100 px-2 py-1 text-xs break-all whitespace-pre-wrap dark:bg-zinc-800">
        <code>{value}</code>
      </pre>
    </div>
  )
}
