import type { AlertRuleListProps } from './AlertRuleListProps'
import { AlertRuleRow } from './AlertRuleRow'

/** The rule rows, edge to edge inside the section panel. */
export function AlertRuleList({ rules }: Readonly<AlertRuleListProps>) {
  const { collection, editor, actions } = rules
  return (
    <ul className="border-border divide-border -mx-4 -mb-4 divide-y border-t first:-mt-4 first:border-t-0">
      {collection.items.map((rule) => (
        <AlertRuleRow
          key={rule.id}
          rule={rule}
          actions={actions}
          onEdit={() => {
            editor.openEdit(rule)
          }}
        />
      ))}
    </ul>
  )
}
