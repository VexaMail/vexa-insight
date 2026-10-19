# Design system

Vexa Insight is an operations console for people who run mail for many domains.
Every screen answers one question first, then gives the evidence one click away.
These rules keep the screens consistent; `docs/ui-brief.md` says who the screens
are for.

## Principles

1. **Attention first.** Lead with what needs action, then context. A chart that
   does not change a decision goes below the fold or goes away.
2. **Every fact links to its evidence.** A domain links to its sources, a source
   to its reports, a report to its records and the DNS state. No dead ends.
3. **Name what a number is out of.** Every percentage says its denominator and
   window ("91.0% of 1,396 messages, last 30 days").
4. **Say the difference between auth and alignment.** SPF pass, SPF aligned,
   DKIM pass, DKIM aligned and the DMARC result are five different facts; never
   collapse them into one "pass".
5. **Both themes are finished.** Light and dark are checked on every change, at
   desktop and phone width.

## Tokens

Colours live in `app/globals.css` as HSL triplets on `:root` (light) and
`.dark`. Components use only the Tailwind names below, never palette classes
such as `bg-zinc-800`, `text-gray-500` or `bg-white`.

| Use               | Classes                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Canvas, text      | `bg-background`, `text-foreground`                                                            |
| Surfaces          | `bg-card`, `bg-secondary`, `bg-muted`, `bg-accent`                                            |
| Secondary text    | `text-muted-foreground`                                                                       |
| Lines             | `border-border`, `divide-border`                                                              |
| Brand accent      | `text-primary`, `bg-primary`, `ring-ring`                                                     |
| Verified pass     | `text-success`, `bg-success/10`, `border-success/30`                                          |
| Needs review      | `text-warning`, `bg-warning/10`                                                               |
| Confirmed failure | `text-danger`, `bg-danger/10`                                                                 |
| Neutral news      | `text-info`                                                                                   |
| Not enough data   | `text-unknown`                                                                                |
| Charts            | `--chart-pass`, `--chart-fail`, `--chart-spf`, `--chart-dkim`, `--chart-grid`, `--chart-axis` |

Status colour means state, never decoration. A domain with too little data is
`unknown`, not green.

### Contrast

Measured WCAG 2 ratios of the token pairs (normal text needs 4.5:1):

| Pair                               | Light     | Dark       |
| ---------------------------------- | --------- | ---------- |
| `muted-foreground` on `card`       | 6.3       | 8.5        |
| `muted-foreground` on `secondary`  | 5.6       | 7.9        |
| `muted-foreground` on `accent`     | 5.3       | 7.4        |
| `unknown` on `card`                | 5.4       | 6.7        |
| `success` / `warning` on `card`    | 5.3 / 5.7 | 9.4 / 10.1 |
| `info` / `danger` on `card`        | 5.5 / 5.5 | 7.0 / 5.3  |
| label on `primary` (filled button) | 4.95      | 9.9        |

Secondary text is `text-muted-foreground` at full strength. Do not fade it
further with an opacity suffix (`/70`, `/50`) for anything a reader needs: a
date, a hostname, a description, an icon-only action. Opacity is for decoration
only (a sort arrow at rest, a placeholder illustration).

Light and dark keep the same emphasis ranking: the dark soft pill tints at 15%
instead of 10% so it does not sink into the navy surface, and borders and inputs
are a step lighter in dark so neutral filters and outline buttons stay visible.

## Type

- Geist for interface text, Geist Mono (`font-mono`) for IPs, report ids,
  hostnames, DNS records, selectors and every figure in a stat tile.
- Page title `text-2xl sm:text-3xl font-semibold`; panel title
  `text-sm font-semibold`; body `text-sm`; captions `text-xs`.
- Eyebrows and group labels:
  `font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground`.
- Tables: 13-14px, `tabular-nums` on numbers, numbers right-aligned.
- Never break an IP or a hostname mid-token on a phone: truncate with a copy
  control, or let it wrap whole (`break-all` only on the page title).

## Layout and density

- Sidebar 224px from `lg`; below that a drawer opened from the top bar.
- Content `max-w-console` (1920px: a 1920px screen is used edge to edge, wider
  screens centre it), gaps of 16px between panels (`gap-4`), 24px between page
  sections (`space-y-6`).
- Table rows 40-44px; controls at least 40px tall; touch targets 44px on phone.
- Phone (390px): one column, no horizontal page scroll, tables become row
  summaries or scroll inside their panel.

## Motion

120-180 ms colour and border transitions; no animation on figures; respect
`prefers-reduced-motion` (handled globally).

## Primitives (`src/components/ui`)

| Component        | Use it for                                                                             |
| ---------------- | -------------------------------------------------------------------------------------- |
| `Panel`          | Any card: optional title, description, icon, actions, `flush` for edge-to-edge tables. |
| `StatTile`       | A KPI: label, figure, `badge`, `hint` (denominator, window), `tone`, `trend`, `href`.  |
| `StatusPill`     | Every state label (`tone`, `variant`, optional `dot`, `icon`). See Badges.             |
| `EntityHeader`   | Top of a detail page: kind, identifier, copy control, chips, actions.                  |
| `TabNav`         | Tabs as links (`?tab=`), so sections can be shared.                                    |
| `CopyIconButton` | Copy an IP, hostname, record or id.                                                    |
| `DataTable`      | Sortable, filterable tables.                                                           |
| `EmptyState`     | Nothing to show, with what to do next.                                                 |
| `DropdownMenu`   | A button that opens a short menu of actions or links; arrow keys, Home/End, Escape.    |
| `PageHeader`     | Top of every list page (from `@/components/shell`). See Page header.                   |

### Badges

One rule decides whether a `StatusPill` is filled:

- **Solid** (`variant="solid"`) answers the row's question with something to act
  on: a severity that asks for action (Critical, High, Medium, Warning), or the
  pass/fail verdict of a check (SPF, DKIM, DMARC result, a domain's Passing /
  Warning / Critical band, a DNS check, a diagnostics grade, a run that
  succeeded or failed, an upload accepted or rejected).
- **Soft** (default) describes: states (Open, Acknowledged, Snoozed, Silent,
  Running), categories and classifications, policies (`p=none`), freshness,
  counts, roles, settings states, and severities that only inform (Low, Info,
  Pass in a findings list).
- "Not enough data" (`unknown`) is always soft, even where a verdict would be
  solid.

Use `severityPillVariant(tone)` for severities and `verdictPillVariant(tone)`
for verdicts (`@/utils/ui`) rather than choosing per screen.

### Buttons

One primary per header:

| Role                                 | Button                                                                |
| ------------------------------------ | --------------------------------------------------------------------- |
| The one action that runs or saves    | `default` (filled green): Run diagnostics, Trigger now, Save, Upload  |
| Going to a related screen, exploring | `outline`: Open domain, DNS diagnostics, Investigate, Export, Actions |
| In-card and tertiary navigation      | `ghost` or `link`: View all, Full diagnostics                         |
| Removing or overwriting data         | `destructive`                                                         |

Never fill a button in `info` blue or any status colour; a status colour on a
button is reserved for the outline of a card-foot link. A screen with nothing to
run has no filled button.

### Page header

Every list page starts with `PageHeader`: title, one-sentence description, then
on the right the `period` slot (the date-range picker, always first) and
`actions`. The breadcrumb comes from the shell, so pages never render their own.
List pages leave out `eyebrow`; the mono uppercase kind label belongs to
`EntityHeader` on detail pages ("DOMAIN", "SENDING SOURCE").

### Stat tiles

`StatTile` is the only KPI card. Both variants share `p-4`, `min-h-[112px]`, a
`text-sm` label, a `font-mono text-2xl tabular-nums` figure and a `text-xs`
muted hint. A verdict pill goes in `badge` (beside the figure), never inside
`value` or `hint`; a trend goes in `trend`. `variant="feature"` adds the icon
square; use it for page KPI strips.

### Dates and numbers

All display formatters live in `src/formatters` (exported from `@/utils/format`)
and print in UTC with a fixed en-US locale, so the server render and hydration
agree:

| What              | Format                            | Formatter                             |
| ----------------- | --------------------------------- | ------------------------------------- |
| A day             | `Oct 16, 2026`                    | `formatDate`                          |
| A moment          | `Oct 16, 2026 08:12 UTC`          | `formatDateTime`                      |
| A time of day     | `08:12 UTC`                       | `formatClockTime`                     |
| Elapsed time      | `3 days ago`, absolute in `title` | `formatRelativeDate`, `formatTimeAgo` |
| A share or a rate | `91.3%`, `0.0%`, `100.0%`         | `formatPercent`                       |
| A count           | `24,612`                          | `toLocaleString('en-US')`             |

Progress bars, chart axis ticks and the diagnostics score (points out of 100)
are not shares and keep whole numbers. API responses keep ISO 8601.

`glass-card` / `glass-card-hover` are the surface classes behind `Panel` and
`StatTile`; use the components rather than the classes in new code.

## Copy

Short, technical and literal. Say what happened and what to do ("SPF fails for 3
sources, all forwarders"), not adjectives. No product or vendor names in UI copy
except the receivers that send the reports.
