import { domainTabHref } from './domainTabHref'

/** The sources tab over `days`, filtered to one class, scrolled to the table. */
export function sourcesReviewHref(
  domainName: string,
  days: number,
  sourceClass: string,
): string {
  const query = { days: String(days), class: sourceClass }
  return `${domainTabHref(domainName, 'sources', query)}#sources-table`
}
