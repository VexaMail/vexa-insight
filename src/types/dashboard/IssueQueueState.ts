/**
 * Where a derived issue sits in the queue: `active` until an operator
 * acknowledges or snoozes it. A resolved issue that is still detected is
 * active again, since the condition came back.
 */
export type IssueQueueState = 'active' | 'acknowledged' | 'snoozed'
