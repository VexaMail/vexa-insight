import type { DemoSource } from './DemoSource'

/**
 * Addresses come from the documentation ranges reserved by RFC 5737, so the
 * demo never names a real sender. A seed where every source fails reads as a
 * broken product rather than a populated one, so the estate is mixed: healthy
 * senders carry most of the volume, and the problems are the minority they are
 * in a real estate.
 */
export const DEMO_SOURCES: readonly DemoSource[] = [
  // The primary mail server: aligned on both identifiers, most of the volume.
  {
    ip: '192.0.2.10',
    spfPassRate: 0.999,
    dkimPassRate: 0.999,
    alignmentRate: 0.999,
    volumeWeight: 1,
  },
  // Transactional provider, configured properly.
  {
    ip: '192.0.2.25',
    spfPassRate: 0.998,
    dkimPassRate: 0.996,
    alignmentRate: 0.998,
    volumeWeight: 0.9,
  },
  // Second office relay.
  {
    ip: '198.51.100.7',
    spfPassRate: 0.999,
    dkimPassRate: 0.995,
    alignmentRate: 0.999,
    volumeWeight: 0.35,
  },
  // Marketing platform: mostly right, enough drift to be worth a look.
  {
    ip: '203.0.113.77',
    spfPassRate: 0.98,
    dkimPassRate: 0.96,
    alignmentRate: 0.98,
    volumeWeight: 0.6,
  },
  // Newsletter tool that never had DKIM set up: SPF alone carries DMARC.
  {
    ip: '198.51.100.42',
    spfPassRate: 0.99,
    dkimPassRate: 0.03,
    alignmentRate: 0.99,
    volumeWeight: 0.5,
  },
  // A forwarder: SPF breaks on the hop, the DKIM signature survives it.
  {
    ip: '203.0.113.5',
    spfPassRate: 0.08,
    dkimPassRate: 0.97,
    alignmentRate: 0.98,
    volumeWeight: 0.2,
  },
  // An internal application server someone stood up without telling anyone.
  {
    ip: '203.0.113.19',
    spfPassRate: 0.8,
    dkimPassRate: 0.62,
    alignmentRate: 0.9,
    volumeWeight: 0.15,
  },
  // Nobody authorised this one. It passes nothing, and the policy acts on it.
  {
    ip: '198.51.100.88',
    spfPassRate: 0.02,
    dkimPassRate: 0.01,
    alignmentRate: 0.5,
    volumeWeight: 0.08,
  },
]
