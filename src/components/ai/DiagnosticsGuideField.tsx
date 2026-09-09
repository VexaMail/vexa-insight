import type { DiagnosticsGuideFieldProps } from './DiagnosticsGuideFieldProps'

export function DiagnosticsGuideField({
  label,
  text,
}: Readonly<DiagnosticsGuideFieldProps>) {
  return (
    <div>
      <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>
      <p className="text-muted-foreground mt-1 text-sm">{text}</p>
    </div>
  )
}
