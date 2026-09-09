# Self-hosted fonts

The two variable fonts the UI uses, vendored so `next build` works without
network access. Both are published under the SIL Open Font License 1.1; the
licence text sits next to each file.

| File                                | Family        | Axes          | Source                                     |
| ----------------------------------- | ------------- | ------------- | ------------------------------------------ |
| `Inter-latin-variable.woff2`        | Inter         | wght 100..900 | `@fontsource-variable/inter` 5.3.0         |
| `SpaceGrotesk-latin-variable.woff2` | Space Grotesk | wght 300..700 | `@fontsource-variable/space-grotesk` 5.3.0 |

Both are the `latin` subset only, which is what the previous `next/font/google`
configuration requested. To upgrade, take the
`files/<name>-latin-wght-normal.woff2` file from a newer Fontsource release and
keep the licence file in step.
