import type { SpfLookupTreeNodeItemProps } from './SpfLookupTreeNodeItemProps'
import { SpfTreeNodeHeader } from './SpfTreeNodeHeader'
import { SpfTreeNodeNotes } from './SpfTreeNodeNotes'

export function SpfLookupTreeNodeItem({
  node,
}: Readonly<SpfLookupTreeNodeItemProps>) {
  return (
    <li className="flex flex-col gap-1">
      <SpfTreeNodeHeader node={node} />
      <SpfTreeNodeNotes node={node} />
      {node.children.length > 0 && (
        <ul className="border-border/60 ml-4 flex flex-col gap-1 border-l pl-3">
          {node.children.map((child, index) => (
            <SpfLookupTreeNodeItem
              key={`${child.domain}-${String(index)}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
