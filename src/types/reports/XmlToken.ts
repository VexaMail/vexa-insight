import type { XmlTokenKind } from './XmlTokenKind'

export type XmlToken = {
  kind: XmlTokenKind
  value: string
}
