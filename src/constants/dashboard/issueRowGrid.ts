/**
 * Columns of an issue row by the width of its list (container queries, so
 * the same row fits the home panel and the full-width issues page): from
 * 36rem severity, domain or source, issue, impact, last seen and two action
 * buttons; from 48rem room for three; from 56rem a chevron as well. Fixed
 * widths, because the header and each row are separate grids.
 */
export const ISSUE_ROW_GRID =
  '@xl:grid-cols-[84px_minmax(0,0.85fr)_minmax(0,1.5fr)_70px_86px_68px] @3xl:grid-cols-[88px_minmax(0,0.8fr)_minmax(0,1.6fr)_88px_100px_104px] @4xl:grid-cols-[92px_minmax(0,0.8fr)_minmax(0,1.6fr)_96px_110px_104px_16px]'
