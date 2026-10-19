/** A store subscription that never fires, for values read once per mount. */
export function subscribeNever(): () => void {
  return () => undefined
}
