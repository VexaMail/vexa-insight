import type { DkimKeyAssessment } from './DkimKeyAssessment'

export type DkimPublicKeyAssessment = DkimKeyAssessment & {
  publicKeyPresent: boolean
}
