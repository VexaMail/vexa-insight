export async function doFetch(url: string) {
  return fetch(url, { cache: 'no-store' })
}
