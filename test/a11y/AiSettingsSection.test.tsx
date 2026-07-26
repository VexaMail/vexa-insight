import { AiSettingsSection } from '@/components/settings'
import type * as SettingsHooks from '@/hooks/settings'
import { useAiSettings, useProviderModels } from '@/hooks/settings'
import type { ProviderModelInfo } from '@/types/ai'
import type { AiSettingsSaveStatus } from '@/types/settings'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

// Both hooks hit the network when left real. Everything else in the barrel is
// kept intact, since importing the settings components pulls it in too.
vi.mock('@/hooks/settings', async (importOriginal) => ({
  ...(await importOriginal<typeof SettingsHooks>()),
  useAiSettings: vi.fn(),
  useProviderModels: vi.fn(),
}))

describe('AiSettingsSection accessibility', () => {
  const aiSettings = (overrides: Record<string, unknown> = {}) => ({
    form: { providerId: null, apiKey: '', model: '' },
    apiKeyMasked: null,
    isConfigured: false,
    saveStatus: 'idle' as AiSettingsSaveStatus,
    message: '',
    handleProviderChange: vi.fn(),
    handleApiKeyChange: vi.fn(),
    handleModelChange: vi.fn(),
    handleSave: vi.fn(),
    handleClear: vi.fn(),
    ...overrides,
  })

  const mockHooks = (
    settings: ReturnType<typeof aiSettings>,
    providerModels: {
      models: ProviderModelInfo[]
      isLoading: boolean
      error: string | null
      refetch: () => Promise<void>
    },
  ) => {
    vi.mocked(useAiSettings).mockReturnValue(settings)
    vi.mocked(useProviderModels).mockReturnValue(providerModels)
  }

  const renderSection = () =>
    render(
      <main>
        <h1>Settings</h1>
        <AiSettingsSection apiKey="secret-key" />
      </main>,
    )

  beforeEach(() => {
    mockHooks(aiSettings(), {
      models: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })
  })

  // The section is a framer-motion element that starts at `opacity: 0`, and
  // jsdom never advances the animation, so `toBeVisible` would fail on every
  // node here for a reason unrelated to accessibility. Resolving each control
  // by role *and* accessible name is the assertion that matters.
  it('has no axe violations before a provider is picked', async () => {
    const { container } = renderSection()

    expect(
      screen.getByRole('combobox', { name: 'Provider' }),
    ).toBeInTheDocument()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations with a provider configured', async () => {
    mockHooks(
      aiSettings({
        form: { providerId: 'openai', apiKey: '', model: 'gpt-5.5' },
        apiKeyMasked: 'sk-…abcd',
        isConfigured: true,
        saveStatus: 'success',
        message: 'Settings saved.',
      }),
      {
        models: [{ id: 'gpt-5.5', name: 'GPT-5.5', providerId: 'openai' }],
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      },
    )

    const { container } = renderSection()

    expect(screen.getByLabelText('API Key')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('has no axe violations while the model list is failing to load', async () => {
    mockHooks(
      aiSettings({
        form: { providerId: 'openai', apiKey: 'sk-test', model: '' },
      }),
      {
        models: [],
        isLoading: false,
        error: 'Could not reach the provider.',
        refetch: vi.fn(),
      },
    )

    const { container } = renderSection()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
