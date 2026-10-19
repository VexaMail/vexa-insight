export type SidebarNavProps = {
  readonly onNavigate?: (() => void) | undefined
  /** Which groups to draw; the phone drawer draws both. */
  readonly placement?: 'main' | 'footer' | 'all'
}
