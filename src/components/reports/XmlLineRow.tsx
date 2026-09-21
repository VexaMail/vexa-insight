import { tokenizeXmlLine } from '@/utils/reports'
import type { XmlLineRowProps } from './XmlLineRowProps'
import { xmlTokenClassNames } from './xmlTokenClassNames'

/** One numbered line of the raw XML view. */
export function XmlLineRow({ line }: Readonly<XmlLineRowProps>) {
  const tokens = tokenizeXmlLine(line.content)

  return (
    <div className="flex">
      <span
        aria-hidden="true"
        className="text-muted-foreground/60 sticky left-0 w-12 shrink-0 bg-zinc-50 pr-3 text-right tabular-nums select-none dark:bg-zinc-900/40"
      >
        {line.number}
      </span>
      <code className="whitespace-pre">
        {tokens.length === 0 ? ' ' : null}
        {tokens.map((token, index) => (
          <span
            key={`${String(line.number)}-${String(index)}-${token.kind}`}
            className={xmlTokenClassNames[token.kind]}
          >
            {token.value}
          </span>
        ))}
      </code>
    </div>
  )
}
