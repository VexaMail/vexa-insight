export type IpSectionSearchInputProps = {
  value: string
  placeholder: string
  label: string
  /** Called once typing has settled, with the text to filter by. */
  onSearch: (value: string) => void
}
