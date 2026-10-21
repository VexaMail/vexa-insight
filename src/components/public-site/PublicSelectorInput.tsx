export function PublicSelectorInput() {
  return (
    <details className="mt-3 text-sm">
      <summary className="text-muted-foreground cursor-pointer py-2">
        Have a DKIM selector? (optional)
      </summary>
      <label htmlFor="public-selector" className="mt-2 block font-medium">
        DKIM selector
      </label>
      <input
        id="public-selector"
        name="selector"
        maxLength={128}
        placeholder="google or selector1"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className="border-input bg-background focus-visible:ring-ring mt-2 min-h-11 w-full rounded-md border px-3 outline-none focus-visible:ring-2"
      />
      <p className="text-muted-foreground mt-2 text-xs">
        Find it in your provider settings or the s= field of a DKIM-Signature
        header. Leave blank to try common selectors.
      </p>
    </details>
  )
}
