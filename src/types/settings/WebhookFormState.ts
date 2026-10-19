/** Fields of the create/edit webhook dialog. */
export type WebhookFormState = {
  readonly name: string
  readonly url: string
  readonly enabled: boolean
  readonly events: readonly string[]
  /** A new signing secret; empty keeps the stored one. */
  readonly secret: string
  /** Remove the stored secret on save. */
  readonly clearSecret: boolean
  /** Whether a secret is stored now, so the dialog can say so. */
  readonly hasSecret: boolean
}
