import type { UseIssueActionReturn } from '@/types/dashboard'

export type IssueSnoozeMenuProps = {
  readonly action: UseIssueActionReturn
  readonly issueTitle: string
}
