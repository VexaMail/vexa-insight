# Self-hosted fonts

The two variable fonts the UI uses, vendored so `next build` works without
network access. Both are published under the SIL Open Font License 1.1; the
licence text is `LICENSE-Geist.txt`.

| File                       | Family     | Axes          | Source                       |
| -------------------------- | ---------- | ------------- | ---------------------------- |
| `Geist-variable.woff2`     | Geist      | wght 100..900 | `geist` 1.4.2, `dist/fonts/` |
| `GeistMono-variable.woff2` | Geist Mono | wght 100..900 | `geist` 1.4.2, `dist/fonts/` |

Geist Mono carries IP addresses, report ids, DNS records and other values an
operator copies. To upgrade, take the `*-Variable.woff2` files from a newer
release of the package and keep the licence file in step.
