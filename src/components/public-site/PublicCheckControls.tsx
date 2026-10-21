import type { PublicCheckControlsProps } from '../../types/public-check/PublicCheckControlsProps'
import { PublicCheckFeedback } from './PublicCheckFeedback'
import { PublicCheckForm } from './PublicCheckForm'

export function PublicCheckControls({
  hasReport,
  domain,
  pending,
  submit,
  error,
}: Readonly<PublicCheckControlsProps>) {
  const controls = (
    <>
      <PublicCheckForm domain={domain} pending={pending} submit={submit} />
      <PublicCheckFeedback pending={pending} error={error} />
    </>
  )
  return hasReport ? (
    <details className="mt-6 border-t pt-2" open={error !== null || undefined}>
      <summary className="text-primary cursor-pointer py-3 font-medium">
        Check another domain
      </summary>
      {controls}
    </details>
  ) : (
    <div className={!domain ? 'mt-8' : ''}>{controls}</div>
  )
}
