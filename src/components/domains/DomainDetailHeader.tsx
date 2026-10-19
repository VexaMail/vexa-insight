import { EntityHeader, Navigator } from '@/components/ui'
import { DomainActionsMenu } from './DomainActionsMenu'
import type { DomainDetailHeaderProps } from './DomainDetailHeaderProps'
import { DomainFlag } from './DomainFlag'
import { DomainMoreMenu } from './DomainMoreMenu'
import { DomainSubtitle } from './DomainSubtitle'

/** Name, flag, policy mode, report freshness and the domain's actions. */
export function DomainDetailHeader({
  domainId,
  domainName,
  policy,
}: Readonly<DomainDetailHeaderProps>) {
  return (
    <EntityHeader
      kind="Domain"
      title={domainName}
      titleAddon={<DomainFlag domainName={domainName} />}
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
