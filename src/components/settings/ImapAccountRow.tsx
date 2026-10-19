import { ImapAccountCredentialFields } from './ImapAccountCredentialFields'
import { ImapAccountLabelField } from './ImapAccountLabelField'
import { ImapAccountRowHeader } from './ImapAccountRowHeader'
import type { ImapAccountRowProps } from './ImapAccountRowProps'
import { ImapAccountRowToolbar } from './ImapAccountRowToolbar'
import { ImapAccountServerFields } from './ImapAccountServerFields'
import { ImapFetchOptions } from './ImapFetchOptions'
import { ImapPostProcessing } from './ImapPostProcessing'

export function ImapAccountRow({
  account,
  apiKey,
  index,
  isExpanded,
  onRemove,
  onTestConnection,
  onToggleExpand,
  onUpdate,
  removable,
}: Readonly<ImapAccountRowProps>) {
  const fields = { account, index, onUpdate }

  return (
    <div className="bg-secondary border-border overflow-hidden rounded-md border">
      <ImapAccountRowHeader
        displayLabel={
          account.label || account.username || `Account ${String(index + 1)}`
        }
        index={index}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      />
      {isExpanded ? (
        <div className="border-border space-y-4 border-t p-4">
          <ImapAccountRowToolbar
            accountId={account.id}
            index={index}
            onRemove={onRemove}
            onTestConnection={onTestConnection}
            removable={removable}
          />
          <ImapAccountLabelField {...fields} />
          <ImapAccountServerFields {...fields} />
          <ImapAccountCredentialFields {...fields} />
          <div className="border-border grid gap-4 border-t pt-4 sm:grid-cols-2">
            <ImapFetchOptions {...fields} />
            <ImapPostProcessing {...fields} apiKey={apiKey} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
