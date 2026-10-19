/**
 * Columns of an issue row by the width of its list (container queries, so
 * the same row fits the home panel and the full-width issues page): from
 * 36rem severity, domain or source, issue, impact, last seen and two action
 * buttons; from 48rem room for three; from 56rem a chevron as well. The
 * domain column keeps a floor wide enough for most domains whole. Fixed
 * widths, because the header and each row are separate grids.
 */
export const ISSUE_ROW_GRID =
  '@xl:grid-cols-[76px_minmax(8rem,0.9fr)_minmax(0,1.4fr)_72px_84px_68px] @3xl:grid-cols-[88px_minmax(9rem,0.8fr)_minmax(0,1.6fr)_88px_100px_104px] @4xl:grid-cols-[92px_minmax(10rem,0.8fr)_minmax(0,1.6fr)_96px_110px_104px_16px]'
