declare module 'mailparser' {
  import type { Readable } from 'node:stream'

  export function simpleParser(source: Buffer | Readable | string): Promise<{
    attachments: Array<{
      filename?: string
      content: Buffer
      contentType: string
    }>
  }>
}
