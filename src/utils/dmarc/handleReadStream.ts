export function handleReadStream(
  err2: Error | null,
  readStream: NodeJS.ReadableStream | undefined,
  setXmlBuffer: (b: Buffer) => void,
  readNext: () => void,
) {
  if (err2 || !readStream) {
    readNext()
    return
  }
  const chunks: Buffer[] = []
  readStream.on('data', (c: Buffer) => chunks.push(c))
  readStream.on('end', () => {
    setXmlBuffer(Buffer.concat(chunks))
    readNext()
  })
  readStream.on('error', () => readNext())
}
