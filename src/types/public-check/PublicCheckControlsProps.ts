import type { PublicCheckFormProps } from './PublicCheckFormProps'
import type { PublicFeedbackProps } from './PublicFeedbackProps'

export type PublicCheckControlsProps = PublicCheckFormProps &
  PublicFeedbackProps & { hasReport: boolean }
