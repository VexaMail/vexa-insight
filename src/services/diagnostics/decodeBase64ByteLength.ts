export function decodeBase64ByteLength(base64: string): number {
  let padding = 0
  if (base64.endsWith('==')) {
    padding = 2
  } else if (base64.endsWith('=')) {
    padding = 1
  }
  return Math.floor((base64.length * 3) / 4) - padding
}
