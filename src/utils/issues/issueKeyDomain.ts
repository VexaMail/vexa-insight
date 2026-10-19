/**
 * The domain an issue key is about. Keys are `<kind>:<domain>` or
 * `<kind>:<domain>:<detail>` (e.g. `source_failing:example.com:192.0.2.10`);
 * a key without a second segment is not about one domain.
 */
export function issueKeyDomain(issueKey: string): string | null {
  const domain = issueKey.split(':')[1]?.trim().toLowerCase()
  return domain ? domain : null
}
