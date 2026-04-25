export type NavigatorProps = {
  readonly currentId: string
  readonly basePath?: string
  readonly onNavigate?: (id: string) => void
}
