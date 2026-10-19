/**
 * Days a job poll event is kept. The events only feed the progress view of
 * recent runs and the stuck-job repair, so three months is ample history.
 */
export const POLL_EVENT_RETENTION_DAYS = 90
