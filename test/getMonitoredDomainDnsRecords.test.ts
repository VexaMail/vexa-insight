import { describe, expect, it, vi } from 'vitest'
import { getDomainDnsRecords } from '../src/services/diagnostics/getDomainDnsRecords'
import { getMonitoredDomainDnsRecords } from '../src/services/diagnostics/getMonitoredDomainDnsRecords'
import { getReportedDkimSelectors } from '../src/services/diagnostics/getReportedDkimSelectors'
import { makeDnsDiagnostics } from './setup/makeDnsDiagnostics'

vi.mock('../src/services/diagnostics/getReportedDkimSelectors', () => ({
  getReportedDkimSelectors: vi.fn(),
}))
vi.mock('../src/services/diagnostics/getDomainDnsRecords', () => ({
  getDomainDnsRecords: vi.fn(),
}))

describe('monitored domain DNS checks', () => {
  it('probes the observed provider selector even when it is not in the common list', async () => {
    vi.mocked(getReportedDkimSelectors).mockResolvedValue(['provider-unique'])
    const dns = makeDnsDiagnostics()
    vi.mocked(getDomainDnsRecords).mockResolvedValue(dns)
    expect(await getMonitoredDomainDnsRecords(42, 'example.com')).toBe(dns)
    expect(getReportedDkimSelectors).toHaveBeenCalledWith(42, 'example.com')
    expect(getDomainDnsRecords).toHaveBeenCalledWith('example.com', [
      'provider-unique',
    ])
  })
})
