'use client'

import { useAlertRulesSection, useWebhooksSection } from '@/hooks/settings'
import { AlertRulesSection } from './AlertRulesSection'
import { WebhooksSection } from './WebhooksSection'

/**
 * Webhooks and alert rules. They save through their own API calls, so they
 * sit outside the settings form and its save bar.
 */
export function SettingsNotificationSections() {
  const webhooks = useWebhooksSection()
  const rules = useAlertRulesSection()
  return (
    <div className="space-y-4">
      <WebhooksSection webhooks={webhooks} />
      <AlertRulesSection rules={rules} webhooks={webhooks.collection.items} />
    </div>
  )
}
