export type LoginErrorBannerProps = {
  /** The login action's last result; undefined before the first attempt. */
  readonly state: { readonly error: string } | undefined
}
