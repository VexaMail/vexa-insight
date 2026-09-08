export type InstallTextFieldProps = {
  readonly id: string
  readonly label: string
  readonly type: 'text' | 'number' | 'password'
  readonly value: string | number
  readonly onChange: (value: string) => void
  readonly min?: number | undefined
  readonly max?: number | undefined
  readonly autoComplete?: string | undefined
}
