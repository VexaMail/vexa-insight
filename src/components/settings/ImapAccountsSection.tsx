'use client'

import { Button, Input } from '@/components/ui'

import { useImapAccountsSection } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Mail, Plus, Trash2 } from 'lucide-react'
import { FolderPicker } from './FolderPicker'
import type { ImapAccountsSectionProps } from './ImapAccountsSectionProps'

export default function ImapAccountsSection({
  accounts,
  apiKey,
  onUpdate,
  onAdd,
  onRemove,
  onTestConnection,
}: Readonly<ImapAccountsSectionProps>) {
  const { expandedIndices, toggleExpand, handleAdd } = useImapAccountsSection(
    accounts,
    onAdd,
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6"
      aria-labelledby="settings-imap-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg">
          <Mail className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-imap-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            IMAP Accounts
          </h2>
          <p className="text-muted-foreground text-xs">
            Email accounts for fetching DMARC reports
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {accounts.map((acc, index) => {
          const isExpanded = expandedIndices.has(index)
          const displayLabel =
            acc.label || acc.username || `Account ${String(index + 1)}`
          const moveToFolder = acc.postProcessAction === 'move_to_folder'

          return (
            <div
              key={acc.id ? acc.id : `new-${acc.server}-${acc.username}`}
              className="bg-surface-1 border-border/30 overflow-hidden rounded-lg border"
            >
              {/* Collapsed header. A real button rather than a `role="button"`
                  div, which also gets Enter/Space for free. The Edit/Close
                  affordance only toggles this same panel, so it is rendered as
                  a styled span: a real button nested inside another control is
                  axe `nested-interactive` (serious, wcag2a) and is not reliably
                  announced. `asChild` keeps the visual identical. */}
              <button
                type="button"
                onClick={() => {
                  toggleExpand(index)
                }}
                aria-expanded={isExpanded}
                className="hover:bg-accent/50 focus-visible:ring-ring flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left transition-colors focus-visible:ring-1 focus-visible:outline-none"
              >
                <span className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="text-muted-foreground h-4 w-4" />
                  ) : (
                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                  )}
                  <Mail className="text-muted-foreground h-3.5 w-3.5" />
                  <span className="text-foreground text-sm font-medium">
                    {displayLabel}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary h-7 text-xs"
                  >
                    <span>{isExpanded ? 'Close' : 'Edit'}</span>
                  </Button>
                </span>
              </button>

              {/* Expanded form */}
              {isExpanded && (
                <div className="border-border/30 space-y-3 border-t p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-primary h-7 text-xs"
                      onClick={() => {
                        onTestConnection(acc.id)
                      }}
                    >
                      Test Connection
                    </Button>
                    {accounts.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-danger hover:text-danger h-7 w-7"
                        onClick={() => {
                          onRemove(index)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`imap-account-${String(index)}-label`}
                      className="text-foreground text-xs font-medium"
                    >
                      Account Label
                    </label>
                    <Input
                      id={`imap-account-${String(index)}-label`}
                      type="text"
                      value={acc.label}
                      onChange={(e) => {
                        onUpdate(index, { label: e.target.value })
                      }}
                      placeholder="e.g. Primary Inbox"
                      className="bg-card border-border/50 text-xs"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label
                        htmlFor={`imap-account-${String(index)}-server`}
                        className="text-foreground text-xs font-medium"
                      >
                        IMAP Server
                      </label>
                      <Input
                        id={`imap-account-${String(index)}-server`}
                        type="text"
                        value={acc.server}
                        onChange={(e) => {
                          onUpdate(index, { server: e.target.value })
                        }}
                        placeholder="imap.example.com"
                        className="bg-card border-border/50 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`imap-account-${String(index)}-port`}
                        className="text-foreground text-xs font-medium"
                      >
                        Port
                      </label>
                      <Input
                        id={`imap-account-${String(index)}-port`}
                        type="number"
                        min={1}
                        max={65535}
                        value={acc.port}
                        onChange={(e) => {
                          onUpdate(index, {
                            port: parseInt(e.target.value, 10) || 993,
                          })
                        }}
                        placeholder="993"
                        className="bg-card border-border/50 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`imap-account-${String(index)}-username`}
                        className="text-foreground text-xs font-medium"
                      >
                        Username
                      </label>
                      <Input
                        id={`imap-account-${String(index)}-username`}
                        type="text"
                        value={acc.username}
                        onChange={(e) => {
                          onUpdate(index, { username: e.target.value })
                        }}
                        placeholder="user@example.com"
                        className="bg-card border-border/50 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`imap-account-${String(index)}-password`}
                        className="text-foreground text-xs font-medium"
                      >
                        Password / App Password
                      </label>
                      <Input
                        id={`imap-account-${String(index)}-password`}
                        type="password"
                        value={acc.passwordNew ?? ''}
                        onChange={(e) => {
                          onUpdate(index, { passwordNew: e.target.value })
                        }}
                        placeholder={
                          acc.passwordMasked ? '••••••••' : 'Password'
                        }
                        className="bg-card border-border/50 text-xs"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="border-border/20 mt-4 grid gap-4 border-t pt-2 sm:grid-cols-2">
                    {/* Fetch Options. `role="group"` + `aria-labelledby`
                        rather than `fieldset`/`legend`: the native pair is
                        equivalent to AT, but a legend is laid out by the
                        fieldset's own rendering rules and cannot be made to
                        match the current spacing (measured: every row shifts
                        4px and the group grows 4px, with or without `inline`).
                        The caption stays a span -- it labels the group, not a
                        control, so `label` would be a lie to AT. */}
                    <div
                      className="space-y-3 pt-1"
                      role="group"
                      aria-labelledby={`imap-account-${String(index)}-fetch-options`}
                    >
                      <span
                        id={`imap-account-${String(index)}-fetch-options`}
                        className="text-foreground text-xs font-semibold"
                      >
                        Fetch Options
                      </span>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={acc.fetchIncludeTrash}
                          onChange={(e) => {
                            onUpdate(index, {
                              fetchIncludeTrash: e.target.checked,
                            })
                          }}
                          className="accent-primary h-3.5 w-3.5 rounded"
                        />
                        <span className="text-muted-foreground">
                          Include Trash folder
                        </span>
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={acc.fetchIncludeAllFolders}
                          onChange={(e) => {
                            onUpdate(index, {
                              fetchIncludeAllFolders: e.target.checked,
                            })
                          }}
                          className="accent-primary h-3.5 w-3.5 rounded"
                        />
                        <span className="text-muted-foreground">
                          Include all subfolders (Sent, Spam, etc.)
                        </span>
                      </label>
                    </div>

                    {/* Post-Processing. See the Fetch Options group above. */}
                    <div
                      className="space-y-3 pt-1"
                      role="group"
                      aria-labelledby={`imap-account-${String(index)}-post-processing`}
                    >
                      <span
                        id={`imap-account-${String(index)}-post-processing`}
                        className="text-foreground text-xs font-semibold"
                      >
                        Post-Processing
                      </span>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={acc.markAsReadAfterProcess}
                          onChange={(e) => {
                            onUpdate(index, {
                              markAsReadAfterProcess: e.target.checked,
                            })
                          }}
                          className="accent-primary h-3.5 w-3.5 rounded"
                        />
                        <span className="text-muted-foreground">
                          Mark as read
                        </span>
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={acc.moveToTrashAfterProcess && !moveToFolder}
                          disabled={moveToFolder}
                          onChange={(e) => {
                            onUpdate(index, {
                              moveToTrashAfterProcess: e.target.checked,
                            })
                          }}
                          className="accent-primary h-3.5 w-3.5 rounded disabled:opacity-40"
                        />
                        <span
                          className={
                            moveToFolder
                              ? 'text-muted-foreground/40'
                              : 'text-muted-foreground'
                          }
                        >
                          Move to trash after processed
                        </span>
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={moveToFolder}
                          onChange={(e) => {
                            onUpdate(index, {
                              postProcessAction: e.target.checked
                                ? 'move_to_folder'
                                : 'none',
                              moveToTrashAfterProcess: e.target.checked
                                ? false
                                : acc.moveToTrashAfterProcess,
                            })
                          }}
                          className="accent-primary h-3.5 w-3.5 rounded"
                        />
                        <span className="text-muted-foreground">
                          Move to a folder
                        </span>
                      </label>
                      {moveToFolder && acc.id > 0 && (
                        <FolderPicker
                          accountId={acc.id}
                          apiKey={apiKey}
                          value={acc.postProcessFolder}
                          onChange={(path) => {
                            onUpdate(index, { postProcessFolder: path })
                          }}
                        />
                      )}
                      {moveToFolder && acc.id === 0 && (
                        <p className="text-muted-foreground text-xs italic">
                          Save the account first to pick a folder.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-primary text-xs"
          onClick={handleAdd}
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add another account
        </Button>
      </div>
    </motion.section>
  )
}
