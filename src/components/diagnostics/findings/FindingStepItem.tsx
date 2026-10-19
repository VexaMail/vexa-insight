import type { FindingStepItemProps } from './FindingStepItemProps'

/** One numbered step: its label, the sentence, and the record or command when there is one. */
export function FindingStepItem({
  step,
  index,
}: Readonly<FindingStepItemProps>) {
  return (
    <li className="border-border bg-secondary/30 min-w-0 space-y-1.5 rounded-lg border p-3">
      <p className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="border-border text-foreground inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] tracking-normal">
          {index + 1}
        </span>
        {step.label}
      </p>
      <p className="text-foreground/90 text-xs leading-relaxed">{step.text}</p>
      {step.code === null ? null : (
        <code className="bg-muted/60 text-muted-foreground block rounded px-1.5 py-1 font-mono text-[11px] break-all">
          {step.code}
        </code>
      )}
    </li>
  )
}
