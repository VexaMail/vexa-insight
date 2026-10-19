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
- Content `max-w-7xl`, gaps of 16px between panels (`gap-4`), 24px between page
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
| `StatTile`       | A KPI: label, figure, `hint` (denominator, window, delta), `tone`, optional `href`.    |
| `StatusPill`     | Every state label (`tone`, optional `dot`).                                            |
| `EntityHeader`   | Top of a detail page: kind, identifier, copy control, chips, actions.                  |
| `TabNav`         | Tabs as links (`?tab=`), so sections can be shared.                                    |
| `CopyIconButton` | Copy an IP, hostname, record or id.                                                    |
| `DataTable`      | Sortable, filterable tables.                                                           |
| `EmptyState`     | Nothing to show, with what to do next.                                                 |

`glass-card` / `glass-card-hover` are the surface classes behind `Panel` and
`StatTile`; use the components rather than the classes in new code.

## Copy

Short, technical and literal. Say what happened and what to do ("SPF fails for 3
sources, all forwarders"), not adjectives. No product or vendor names in UI copy
except the receivers that send the reports.
