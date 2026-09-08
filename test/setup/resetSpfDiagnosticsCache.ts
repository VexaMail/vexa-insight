/** Drops the per-process diagnostics cache between SPF tree tests. */
export function resetSpfDiagnosticsCache(): void {
  delete (globalThis as { __vexaDiagnosticsCache?: unknown })
    .__vexaDiagnosticsCache
}
