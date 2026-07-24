import { describe, expect, it } from 'vitest'

import { parseDiagnosticsRolloutPlanFromContent } from '../services/ai/use-cases/parseDiagnosticsRolloutPlanFromContent'

describe('parseDiagnosticsRolloutPlanFromContent', () => {
  it('parses ordered rollout plan steps from a valid response', () => {
    const content = JSON.stringify({
      insights: [],
      rolloutPlan: [
        '[SPF] Confirm all senders are covered.',
        '[DMARC] Move policy to p=quarantine.',
      ],
    })

    expect(parseDiagnosticsRolloutPlanFromContent(content)).toEqual([
      '[SPF] Confirm all senders are covered.',
      '[DMARC] Move policy to p=quarantine.',
    ])
  })

  it('parses rollout plan steps wrapped in markdown fences', () => {
    const content =
      '```json\n{"insights":[],"rolloutPlan":["[DKIM] Publish selector1."]}\n```'

    expect(parseDiagnosticsRolloutPlanFromContent(content)).toEqual([
      '[DKIM] Publish selector1.',
    ])
  })

  it('returns an empty array when rolloutPlan is missing', () => {
    expect(parseDiagnosticsRolloutPlanFromContent('{"insights":[]}')).toEqual(
      [],
    )
  })

  it('drops non-string and empty entries', () => {
    const content = JSON.stringify({
      insights: [],
      rolloutPlan: ['[SPF] Valid step.', 42, null, '   '],
    })

    expect(parseDiagnosticsRolloutPlanFromContent(content)).toEqual([
      '[SPF] Valid step.',
    ])
  })

  it('returns an empty array for unparseable content', () => {
    expect(parseDiagnosticsRolloutPlanFromContent('not json at all')).toEqual(
      [],
    )
  })
})
