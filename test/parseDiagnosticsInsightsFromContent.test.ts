import { describe, expect, it } from 'vitest'

import { parseDiagnosticsInsightsFromContent } from '../src/services/ai/use-cases/parseDiagnosticsInsightsFromContent'

describe('parseDiagnosticsInsightsFromContent', () => {
  it('parses insights from a bare JSON object', () => {
    const content = JSON.stringify({
      insights: [{ title: 'SPF record is missing', severity: 'high' }],
    })

    expect(parseDiagnosticsInsightsFromContent(content)).toEqual([
      { title: 'SPF record is missing', severity: 'high' },
    ])
  })

  it('parses insights wrapped in markdown fences', () => {
    const content =
      '```json\n{"insights":[{"title":"SPF record is missing","severity":"high"}]}\n```'

    expect(parseDiagnosticsInsightsFromContent(content)).toEqual([
      { title: 'SPF record is missing', severity: 'high' },
    ])
  })

  it('parses a bare insight array', () => {
    expect(parseDiagnosticsInsightsFromContent('[{"title":"DKIM"}]')).toEqual([
      { title: 'DKIM' },
    ])
  })

  it('returns an empty array when insights is missing', () => {
    expect(parseDiagnosticsInsightsFromContent('{"rolloutPlan":[]}')).toEqual(
      [],
    )
  })

  it('returns null for unparseable content', () => {
    expect(parseDiagnosticsInsightsFromContent('not json at all')).toBeNull()
  })
})
