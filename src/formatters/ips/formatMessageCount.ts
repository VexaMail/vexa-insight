/** "1 message", "12 messages". */
export function formatMessageCount(count: number): string {
  return `${count.toLocaleString('en-US')} ${count === 1 ? 'message' : 'messages'}`
}
