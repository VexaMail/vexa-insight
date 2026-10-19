'use client'

import { EMPTY_WEBHOOK_FORM, WEBHOOKS_API_PATH } from '@/constants/settings'
import type {
  UseWebhooksSectionReturn,
  WebhookEndpointPublic,
} from '@/types/settings'
import { callAdminApi, toWebhookForm, toWebhookPayload } from '@/utils/settings'
import { useAdminCollection } from './useAdminCollection'
import { useEditorDialog } from './useEditorDialog'
import { useRowActions } from './useRowActions'

/** Webhook endpoints: the list, the editor, row actions and the test ping. */
export function useWebhooksSection(): UseWebhooksSectionReturn {
  const collection =
    useAdminCollection<WebhookEndpointPublic>(WEBHOOKS_API_PATH)
  const editor = useEditorDialog({
    basePath: WEBHOOKS_API_PATH,
    emptyForm: EMPTY_WEBHOOK_FORM,
    toForm: toWebhookForm,
    toPayload: toWebhookPayload,
    onSaved: collection.reload,
  })
  const actions = useRowActions(WEBHOOKS_API_PATH, collection.reload)

  const sendTest = async (id: number) => {
    const result = await callAdminApi(
      `${WEBHOOKS_API_PATH}/${String(id)}`,
      'POST',
    )
    await collection.reload()
    actions.setNotice(
      result.ok
        ? 'Sent test.ping to every enabled endpoint subscribed to it; the last delivery below shows the answer.'
        : result.message,
    )
  }

  return { collection, editor, actions, sendTest }
}
