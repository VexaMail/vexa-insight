import { ProtocolExplainer } from '@/components/diagnostics'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

describe('ProtocolExplainer accessibility', () => {
  it('has no axe violations with example host and value', async () => {
    const { container } = render(
      <main>
        <h1>SPF</h1>
        <h2>Details</h2>
        <h3>Record</h3>
        <ProtocolExplainer
          title="What SPF does"
          summary="SPF lists the servers allowed to send mail for your domain."
          exampleHost="example.com"
          exampleValue="v=spf1 include:_spf.example.net -all"
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations without the optional examples', async () => {
    const { container } = render(
      <main>
        <h1>DMARC</h1>
        <h2>Details</h2>
        <h3>Record</h3>
        <ProtocolExplainer
          title="What DMARC does"
          summary="DMARC tells receivers what to do when SPF and DKIM both fail."
        />
      </main>,
    )

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
