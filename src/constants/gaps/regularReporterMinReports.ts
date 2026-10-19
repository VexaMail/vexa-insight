/**
 * Reports in the 30 days before its latest one that make a receiver a
 * regular reporter, whose silence is worth flagging. A receiver that sends a
 * few reports a month goes quiet for days as a matter of course.
 */
export const REGULAR_REPORTER_MIN_REPORTS = 7
