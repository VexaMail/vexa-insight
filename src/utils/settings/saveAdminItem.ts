import type { AdminApiResult } from '@/types/settings'
import { callAdminApi } from './callAdminApi'

/** Creates an item under `basePath`, or patches the one with `editingId`. */
export async function saveAdminItem(
  basePath: string,
  editingId: number | null,
  body: unknown,
): Promise<AdminApiResult<unknown>> {
  return editingId === null
    ? callAdminApi(basePath, 'POST', body)
    : callAdminApi(`${basePath}/${String(editingId)}`, 'PATCH', body)
}
