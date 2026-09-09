import type { SpfLookupTreeNodeItemProps } from './SpfLookupTreeNodeItemProps'

/** Mechanisms, unexpanded macros and the ignored-redirect note of one node. */
export function SpfTreeNodeNotes({
  node,
}: Readonly<SpfLookupTreeNodeItemProps>) {
  return (
    <>
      {node.mechanisms.length > 0 && (
        <p className="text-muted-foreground pl-3 font-mono text-xs">
          {node.mechanisms.join(' ')}
        </p>
      )}
      {node.macroMechanisms.length > 0 && (
        <p className="text-muted-foreground pl-3 text-xs">
          Macro target{node.macroMechanisms.length === 1 ? '' : 's'} not
          expanded (resolved per sender):{' '}
          <span className="font-mono">{node.macroMechanisms.join(' ')}</span>
        </p>
      )}
      {node.ignoredRedirect !== null && node.ignoredRedirect !== '' && (
        <p className="pl-3 text-xs text-amber-500">
          <span className="font-mono">redirect={node.ignoredRedirect}</span> is
          ignored because this record has an{' '}
          <span className="font-mono">all</span> mechanism (RFC 7208 6.1).
          Remove the <span className="font-mono">all</span> to make the redirect
          take effect.
        </p>
      )}
    </>
  )
}
