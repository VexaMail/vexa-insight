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
    <div className="bg-surface-1 border-border/30 overflow-hidden rounded-lg border">
      <ImapAccountRowHeader
        displayLabel={
          account.label || account.username || `Account ${String(index + 1)}`
        }
        index={index}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      />
      {isExpanded ? (
        <div className="border-border/30 space-y-3 border-t p-4">
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
          <div className="border-border/20 mt-4 grid gap-4 border-t pt-2 sm:grid-cols-2">
            <ImapFetchOptions {...fields} />
            <ImapPostProcessing {...fields} apiKey={apiKey} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
