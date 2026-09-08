import type { PrometheusScalarMetric } from '@/types/metrics'

/** Row-count series of the metrics endpoint. */
export const PROMETHEUS_COUNT_METRICS: PrometheusScalarMetric[] = [
  {
    name: 'vexa_domains_total',
    help: 'Number of distinct domains tracked.',
    type: 'gauge',
    read: (snapshot) => snapshot.domainsTotal,
  },
  {
    name: 'vexa_ip_addresses_total',
    help: 'Number of distinct source IPs seen.',
    type: 'gauge',
    read: (snapshot) => snapshot.ipAddressesTotal,
  },
  {
    name: 'vexa_dmarc_reports_total',
    help: 'Number of DMARC aggregate reports ingested.',
    type: 'counter',
    read: (snapshot) => snapshot.rawReportsTotal,
  },
  {
    name: 'vexa_dmarc_events_total',
    help: 'Number of normalized DMARC events stored.',
    type: 'counter',
    read: (snapshot) => snapshot.normalizedEventsTotal,
  },
]
