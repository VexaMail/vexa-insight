import type { DiagnosticsGuideVerifyStepsProps } from './DiagnosticsGuideVerifyStepsProps'

export function DiagnosticsGuideVerifySteps({
  steps,
}: Readonly<DiagnosticsGuideVerifyStepsProps>) {
  return (
    <div>
      <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
        Verify
      </p>
      <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
        {steps.map((step) => (
          <li key={step} className="bg-background/70 rounded-md px-3 py-2">
            <code className="font-mono text-xs break-all whitespace-pre-wrap">
              {step}
            </code>
          </li>
        ))}
      </ul>
    </div>
  )
}
