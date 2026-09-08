/** Body of `POST /api/v1/admin/trigger-poll`, success or failure. */
export type TriggerPollResponse =
  | {
      data?: {
        success?: boolean
        processed?: number
        ingested?: number
        errors?: number
      }
    }
  | { error?: { message?: string } }
