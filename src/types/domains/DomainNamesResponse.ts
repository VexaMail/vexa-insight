import type { DomainNameRow } from './DomainNameRow'

/** Body of `GET /api/v1/domains` as the client reads it. */
export type DomainNamesResponse = { readonly data?: readonly DomainNameRow[] }
