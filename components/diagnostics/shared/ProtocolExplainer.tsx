import type { ProtocolExplainerProps } from './ProtocolExplainerProps'

export function ProtocolExplainer({
  title,
  summary,
  exampleHost,
  exampleValue,
}: Readonly<ProtocolExplainerProps>) {
  return (
    <div className="bg-muted/20 rounded-xl border border-dashed p-4">
      <div className="space-y-2">
        <h4 className="text-foreground text-sm font-semibold">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {summary}
        </p>
        {(exampleHost || exampleValue) && (
          <div className="grid gap-2 md:grid-cols-2">
            {exampleHost && (
              <div className="bg-background rounded-lg border p-3">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
                  Example Host
                </p>
                <code className="text-foreground mt-1 block text-xs break-all">
                  {exampleHost}
                </code>
              </div>
            )}
            {exampleValue && (
              <div className="bg-background rounded-lg border p-3">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
                  Example Value
                </p>
                <code className="text-foreground mt-1 block text-xs break-all">
                  {exampleValue}
                </code>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
