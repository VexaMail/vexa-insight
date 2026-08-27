export type ProtocolStatusRowProps = {
  protocol: string
  status: 'valid' | 'invalid' | 'not-found'
  detail?: string
}
