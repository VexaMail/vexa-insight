/**
 * The tracked records of one domain at one moment, keyed by record kind
 * (`spf`, `dmarc`, `mx`, `mta_sts`, `tls_rpt`, `bimi`, `dkim:<selector>`).
 * A null value means the record is absent.
 */
export type TrackedDnsRecords = Record<string, string | null>
