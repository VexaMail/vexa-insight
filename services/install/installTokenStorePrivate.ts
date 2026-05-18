/**
 * Process-scoped install token store. Single source of truth; do NOT mutate
 * elsewhere. Imported only by services/install/{generate,set,get,clear,getOrCreate}InstallToken.ts.
 */
export const installTokenStore: { value: string | null } = { value: null }
