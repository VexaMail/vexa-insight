import type { DiagnosticsViewProps } from './DiagnosticsViewProps'

export type DiagnosticsHeaderProps = Pick<
  DiagnosticsViewProps,
  'domains' | 'currentDomainName' | 'days' | 'fromDate' | 'toDate'
> & {
  onDomainChange: (domain: string) => void
}
