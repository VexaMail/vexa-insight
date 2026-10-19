import dns from 'node:dns'

/** The first TXT string of a name, joined; null when there is none. */
export async function resolveTxtFirst(name: string): Promise<string | null> {
  try {
    const records = await dns.promises.resolveTxt(name)
    return records[0]?.join('') ?? null
  } catch {
    return null
  }
}
