import { EntityHeader, Navigator } from '@/components/ui'
import { DomainActionsMenu } from './DomainActionsMenu'
import type { DomainDetailHeaderProps } from './DomainDetailHeaderProps'
import { DomainFlag } from './DomainFlag'
import { DomainHealthPill } from './DomainHealthPill'
import { DomainMoreMenu } from './DomainMoreMenu'
import { DomainSubtitle } from './DomainSubtitle'

/** Name, flag, status, policy mode, report freshness and the actions. */
export function DomainDetailHeader({
  domainId,
  domainName,
  policy,
  summary,
}: Readonly<DomainDetailHeaderProps>) {
  return (
    <EntityHeader
      kind="Domain"
      title={domainName}
      titleAddon={
        <>
          <DomainFlag domainName={domainName} />
          <DomainHealthPill {...summary} />
        </>
      }
      chips={<DomainSubtitle policy={policy} />}
      actions={
        <>
          <Navigator currentId={domainName} basePath="/domains" />
          <DomainActionsMenu domainId={domainId} domainName={domainName} />
          <DomainMoreMenu domainId={domainId} domainName={domainName} />
        </>
      }
    />
  )
}
