/** "1 message", "12 messages". */
export function formatMessageCount(count: number): string {
  return `${count.toLocaleString()} ${count === 1 ? 'message' : 'messages'}`
}
