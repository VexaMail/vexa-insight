export type InstallRequiredFieldProps = {
  readonly id: string
  readonly label: string
  readonly type: 'text' | 'password'
  readonly value: string
  readonly placeholder: string
  readonly onChange: (value: string) => void
}
