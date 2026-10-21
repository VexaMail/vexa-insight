# Product vocabulary

## Vexa Insight

The self-hosted email observability application. Its current evidence includes
authentication reports, DNS diagnostics and reviewed sending sources; the name
does not restrict future modules to DMARC.

Avoid: DMARC-only product, public checker as a synonym for the whole app.

## Public checker

The account-free DNS configuration tool at insight.vexamail.com. It provides a
current lookup and a documented SPF/DMARC configuration score.

Avoid: deliverability test, inbox-placement test, verified message
authentication.

## Domain report

A timestamped public DNS result for one domain. A shareable domain URL opens a
current check rather than a permanent historical snapshot.

Avoid: immutable scan, saved historical report unless a persisted snapshot is
explicitly meant.
