/**
 * Part ids of an ARF message: the machine-readable feedback part and, when
 * present, the part carrying the reported message's headers.
 */
export type ArfPartIds = {
  feedbackPartId: string
  headersPartId: string | null
}
