/** Every id under the list's API path, or null when the request is rejected. */
export async function fetchAllItemIds(
  basePath: string,
): Promise<string[] | null> {
  const res = await fetch(`/api/v1${basePath}/ids`)
  if (!res.ok) return null
  const json = (await res.json()) as { data: string[] }
  return json.data
}
