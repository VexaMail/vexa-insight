/** The viewer options Vexa sets; everything else keeps the viewer default. */
export type ApiReferenceOptions = {
  readonly url: string
  readonly withDefaultFonts: boolean
  readonly telemetry: boolean
  readonly showDeveloperTools: 'never'
  readonly agent: { readonly disabled: boolean }
  readonly mcp: { readonly disabled: boolean }
}
