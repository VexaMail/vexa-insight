'use client'

import { Key } from 'lucide-react'
import { ApiKeyCurrentField } from './ApiKeyCurrentField'
import type { ApiKeySectionProps } from './ApiKeySectionProps'
import { SettingsSection } from './SettingsSection'

export default function ApiKeySection({ apiKey, onCopy }: ApiKeySectionProps) {
  return (
    <SettingsSection
      anchorId="api-key"
      headingId="settings-api-key-heading"
      icon={<Key />}
      title="API key"
      description={
        <>
          Derived from <code className="font-mono">SECRET_KEY</code> for API
          calls, crons and scripts. It is not the encryption key, and it changes
          when you rotate <code className="font-mono">SECRET_KEY</code> with{' '}
          <code className="font-mono">recovery.ts rotate-key</code>.
        </>
      }
    >
      <ApiKeyCurrentField apiKey={apiKey} onCopy={onCopy} />
    </SettingsSection>
  )
}
