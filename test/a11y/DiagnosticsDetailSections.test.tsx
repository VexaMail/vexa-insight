import { DmarcDetailSection, SpfDetailSection } from '@/components/diagnostics'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { makeDnsDiagnostics } from '../setup/makeDnsDiagnostics'

describe('diagnostics detail section accessibility', () => {
  it('SpfDetailSection has no axe violations for a healthy record', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>SPF</h2>
        <SpfDetailSection dns={makeDnsDiagnostics()} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('SpfDetailSection has no axe violations when the record is missing and warned about', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>SPF</h2>
        <SpfDetailSection
          dns={makeDnsDiagnostics({
            spf: null,
            spfValid: false,
            spfWarning: 'No SPF record was published for this domain.',
          })}
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('DmarcDetailSection has no axe violations for a healthy record', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>DMARC</h2>
        <DmarcDetailSection dns={makeDnsDiagnostics()} />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('DmarcDetailSection has no axe violations when the policy is missing and warned about', async () => {
    const { container } = render(
      <main>
        <h1>example.com</h1>
        <h2>DMARC</h2>
        <DmarcDetailSection
          dns={makeDnsDiagnostics({
            dmarc: null,
            dmarcPolicy: null,
            dmarcValid: false,
            dmarcWarnings: ['No DMARC record was published for this domain.'],
          })}
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
