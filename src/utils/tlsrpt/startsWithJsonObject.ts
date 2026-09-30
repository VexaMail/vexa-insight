/** Whether the first non-whitespace byte opens a JSON object. */
export function startsWithJsonObject(content: Buffer): boolean {
  const head = content.subarray(0, 64).toString('utf-8').trimStart()
  return head.startsWith('{')
}
