/**
 * Process-scoped install token store. Single source of truth; do NOT mutate
 * from outside this module's accessors.
 *
 * Lives on `globalThis` because Next.js bundles `instrumentation.ts` and each
 * route handler separately: a module-scope object would be instantiated once
 * per bundle, so the token printed at boot would never match the one the
 * install route compares against.
 */
export const installTokenStore: { value: string | null } = ((
  globalThis as typeof globalThis & {
    __vexaInstallTokenStore?: { value: string | null }
  }
).__vexaInstallTokenStore ??= { value: null })
