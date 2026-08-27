'use client'

import { Button } from '@/components/ui'
import { useAiSettings, useProviderModels } from '@/hooks/settings'
import type { AIProviderId } from '@/types/ai'
import { m as motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Sparkles, Trash2 } from 'lucide-react'
import { AI_PROVIDERS } from './aiProviders'
import type { AiSettingsSectionProps } from './AiSettingsSectionProps'
import { getAiSaveButtonLabel } from './getAiSaveButtonLabel'
import { ModelCombobox } from './ModelCombobox'

export function AiSettingsSection({
  apiKey,
}: Readonly<AiSettingsSectionProps>) {
  const {
    form,
    apiKeyMasked,
    isConfigured,
    saveStatus,
    message,
    handleProviderChange,
    handleApiKeyChange,
    handleModelChange,
    handleSave,
    handleClear,
  } = useAiSettings(apiKey)

  const {
    models,
    isLoading: isLoadingModels,
    error: modelsError,
  } = useProviderModels(apiKey, form.providerId, form.apiKey)

  const selectedProvider = AI_PROVIDERS.find((p) => p.id === form.providerId)
  const isSaving = saveStatus === 'loading' || saveStatus === 'validating'

  const savedModelMissing =
    form.model && models.length > 0 && !models.some((m) => m.id === form.model)

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-border/50 bg-background/50 space-y-4 rounded-lg border p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="text-muted-foreground h-5 w-5" />
        <h2 className="text-xl font-semibold tracking-tight">AI Provider</h2>
        {isConfigured && (
          <span className="bg-success/10 text-success rounded-full px-2 py-0.5 text-xs font-medium">
            Configured
          </span>
        )}
      </div>

      <p className="text-muted-foreground text-sm">
        Connect an AI provider to enable AI-powered report insights,
        explanations, and recommendations. Your API key is encrypted at rest.
      </p>

      <div className="flex max-w-xl flex-col gap-4 pt-2">
        {/* Provider selector */}
        <div className="flex flex-col gap-2">
          <label htmlFor="ai-provider" className="text-sm font-medium">
            Provider
          </label>
          <select
            id="ai-provider"
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            value={form.providerId ?? ''}
            onChange={(e) => {
              const providerId = e.target.value
              handleProviderChange(
                providerId === '' ? null : (providerId as AIProviderId),
              )
            }}
          >
            <option value="">Select a provider…</option>
            {AI_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* API Key */}
        {form.providerId && (
          <div className="flex flex-col gap-2">
            <label htmlFor="ai-api-key" className="text-sm font-medium">
              API Key
            </label>
            <input
              id="ai-api-key"
              type="password"
              placeholder={
                apiKeyMasked
                  ? `Current: ${apiKeyMasked}`
                  : (selectedProvider?.placeholder ?? 'Enter API key...')
              }
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={form.apiKey}
              onChange={(e) => {
                handleApiKeyChange(e.target.value)
              }}
            />
            {apiKeyMasked && !form.apiKey && (
              <p className="text-muted-foreground text-xs">
                Leave blank to keep the existing key.
              </p>
            )}
          </div>
        )}

        {/* Model selector (searchable combobox) */}
        {form.providerId && (
          <ModelCombobox
            models={models}
            value={form.model}
            isLoading={isLoadingModels}
            error={modelsError}
            savedModelMissing={Boolean(savedModelMissing)}
            onChange={handleModelChange}
          />
        )}

        {/* Action buttons */}
        {form.providerId && (
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={isSaving || (!form.apiKey.trim() && !isConfigured)}
              onClick={() => {
                void handleSave()
              }}
            >
              {getAiSaveButtonLabel(saveStatus)}
            </Button>

            {isConfigured && (
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={() => {
                  void handleClear()
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        )}

        {/* Status message */}
        {message && (
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              saveStatus === 'error' ? 'text-danger' : 'text-success'
            }`}
          >
            {saveStatus === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
    </motion.section>
  )
}
