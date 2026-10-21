# Public checker research and product roadmap

Vexa Insight is an email observability application. DMARC reports are its
current evidence source, not a limit on the product's future scope. The public
checker is a free discovery tool; the self-hosted app adds observed sending
sources, historical authentication results, investigations and alerts.

This review inspected official public pages on 2026-10-21. It compares visible
tool flows, page structure and documented capabilities. It does not establish
search rankings, traffic, conversion rates, search volume or paid-plan behavior.
No test email was sent and no account was created.

## Comparable tools

| Tool and official source                                                                                                          | Discovery and user flow observed                                                                                                                                                                               | Gap or adaptation for Vexa                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [MXToolbox SuperTool](https://mxtoolbox.com/SuperTool.aspx) and [blocklist check](https://mxtoolbox.com/blacklists.aspx)          | Names individual jobs such as MX, SPF, DMARC, SMTP and blocklist lookup. Results link to related tools. Its public page describes chronological result history.                                                | Build related diagnostics around actual sender IPs; retain evidence and change history. Blocklist checks and active SMTP probes are future modules, not current public-checker capabilities.                        |
| [dmarcian DMARC Inspector](https://dmarcian.com/dmarc-inspector/) and [SPF Surveyor](https://dmarcian.com/spf-survey/)            | Dedicated checker headings, tag explanations, a library of linked tools and educational material. The inspector describes parent-domain DMARC policy behavior.                                                 | Explain records in plain language. Extend the public checker with organizational-domain inheritance and bounded recursive SPF evaluation; reuse the existing app's SPF planner rather than build another evaluator. |
| [EasyDMARC Domain Scanner](https://easydmarc.com/tools/domain-scanner) and [DKIM lookup](https://easydmarc.com/tools/dkim-lookup) | Tool-specific pages, explanatory sections, FAQs, related free tools, an embeddable widget and an email-report form. DKIM lookup accepts a selector.                                                            | Add a known-selector input, useful per-tool content and optional exports. An embed is worth considering after a shared request budget exists. Keep the current checker usable without providing contact details.    |
| [mail-tester](https://mail-tester.com/) and its [FAQ](https://mail-tester.com/faq)                                                | Gives the visitor a test inbox address. The visitor sends a real message and requests a report on the message, server and sending IP. Its FAQ explicitly says a perfect score does not ensure inbox placement. | Add an isolated receive-and-analyze test inbox with expiry and retention controls. Keep DNS configuration, received-message authentication, SMTP acceptance and inbox placement as separate observations.           |
| [Red Sift Investigate](https://redsift.com/tools/investigate)                                                                     | Leads with DMARC, SPF and DKIM testing using a real email, shows steps and explains what DNS-only checks cannot establish.                                                                                     | Link a controlled test message to its sending service and authentication evidence. Do not present a published DKIM key as a verified message signature.                                                             |

## Search strategy

The public homepage targets free DMARC checker, check DMARC, DMARC record lookup
and SPF checker. Email authentication checker and MX lookup are supporting
intents. Broad email checker searches can instead mean address verification or
inbox placement, neither of which the DNS scan performs.

Use a descriptive title and H1, useful server-rendered explanations, visible
FAQs, a valid public sitemap and crawlable links. Domain reports remain noindex
because they are changing snapshots rather than editorial pages. The sitemap
contains acquisition content, not private login/install routes or every scanned
domain. Do not publish duplicate checker pages solely to cover spelling
variations. Separate tool pages should arrive with distinct functionality and
explanations.

The homepage uses WebApplication structured data without ratings, invented
reviews or unimplemented features. FAQ content is written for visitors; no FAQ
rich-result visibility is promised. Official guidance:
[titles](https://developers.google.com/search/docs/appearance/title-link),
[sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview),
[noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Search Console should measure indexing, impressions, queries and clicks after
publication. No Search Console property was queried or sitemap submitted during
this review. Domain verification and search-service changes require the normal
external-write authorization.

## Delivered changes

- A result-first report with transparent scoring, a prioritized next step,
  expandable evidence, a share-link control and a compact change-domain form.
- A failed retry preserves the last valid report; the empty 960px reservation is
  removed.
- A concrete DMARC/SPF headline, accurate descriptions and public sharing
  metadata.
- A public XML sitemap and robots declaration; reserved asset filenames cannot
  become scanned domains.
- Protocol explanations, visible questions and one product section with an
  actual dashboard screenshot using synthetic data.

## Future implementation boundaries

The actionable backlog is in
[TODO.md](../TODO.md#email-observability-expansion). Each feature should
identify evidence type, freshness, partial failures, provider limitations and
the smallest implementation step. New modules should reuse source inventory,
domain ownership, alert rules, jobs and history where appropriate. A website IP,
MX IP and observed sending IP can be different assets; reputation findings must
preserve that distinction.

Public exposure of any active test follows the authenticated app implementation
and its abuse controls. A future feature is not advertised as available until
its server behavior, empty/error states and verification are present.
