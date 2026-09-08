/** Green for a passing SPF or DKIM result, red for every other outcome. */
export function authResultClassName(result: string): string {
  return result === 'pass'
    ? 'font-bold text-green-600 dark:text-green-400'
    : 'font-bold text-red-600 dark:text-red-400'
}
