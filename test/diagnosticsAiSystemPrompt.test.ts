import { describe, expect, it } from 'vitest'

import {
  buildDiagnosticsAnalysisPrompt,
  DIAGNOSTICS_ANALYSIS_SYSTEM,
} from '@/services/ai'
import { makeDiagnosticsAnalysisInput } from './setup/makeDiagnosticsAnalysisInput'

describe('buildDiagnosticsAnalysisPrompt: system prompt', () => {
  it('uses the diagnostics system prompt with the do-not-repeat-runbook instruction', () => {
    const { systemPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(systemPrompt).toBe(DIAGNOSTICS_ANALYSIS_SYSTEM)
    expect(systemPrompt).toContain('deterministic operator runbook')
    expect(systemPrompt).toContain('Do not restate it')
    expect(systemPrompt).toContain(
      'add an insight only when you contribute materially new information',
    )
  })

  it('instructs the model to end with an ordered rollout plan section', () => {
    const { systemPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(systemPrompt).toContain(
      '"insights" (array) and "rolloutPlan" (array of strings)',
    )
    expect(systemPrompt).toContain('ROLLOUT PLAN')
    expect(systemPrompt).toContain(
      'End with "rolloutPlan": an ordered list of concrete next steps',
    )
    expect(systemPrompt).toContain('highest-impact first')
    expect(systemPrompt).toContain(
      'Start each step with the protocol it touches in square brackets',
    )
    expect(systemPrompt).toContain('{"insights":[],"rolloutPlan":[]}')
    expect(systemPrompt).toContain('"rolloutPlan": [')
  })
})
