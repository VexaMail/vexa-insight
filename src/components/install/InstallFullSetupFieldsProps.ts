import type { InstallAction, InstallState } from '@/types/install'

export type InstallFullSetupFieldsProps = {
  readonly state: InstallState
  readonly dispatch: React.Dispatch<InstallAction>
  readonly onGenerateKey: () => void
}
