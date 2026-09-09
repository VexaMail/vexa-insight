/** Styles one of the scope toggle buttons, highlighted when it is active. */
export function navigatorScopeButtonClassName(active: boolean): string {
  return `rounded px-2 py-0.5 text-xs font-medium transition-colors ${
    active
      ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'
      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
  }`
}
