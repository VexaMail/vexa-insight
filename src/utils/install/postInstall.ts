import type { InstallRequestBody, InstallSubmitResult } from '@/types/install'

/** Posts the install and reports where to go next, or why it failed. */
export async function postInstall(
  body: InstallRequestBody,
): Promise<InstallSubmitResult> {
  const res = await fetch('/api/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = (await res.json()) as
    | { data?: { redirect?: string } }
    | { error?: { code?: string; message?: string } }

  if (!res.ok) {
    const err = json as { error?: { message?: string } }
    return {
      ok: false,
      message: err.error?.message ?? `Error ${String(res.status)}`,
    }
  }

  const data = (json as { data: { redirect: string } }).data
  return { ok: true, redirect: data.redirect || '/settings' }
}
