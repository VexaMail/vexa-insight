export async function writePublicReportClipboard(url: string): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      navigator.clipboard.writeText(url),
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => {
          reject(new Error('Clipboard access did not complete'))
        }, 1500)
      }),
    ])
  } finally {
    clearTimeout(timeout)
  }
}
