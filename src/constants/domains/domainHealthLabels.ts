/** How each domain status filter value reads on a pill. */
export const DOMAIN_HEALTH_LABELS: Readonly<Record<string, string>> = {
  Active: 'Passing',
  Warning: 'Warning',
  Critical: 'Critical',
  'No data': 'No data',
}
