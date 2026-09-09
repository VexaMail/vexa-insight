import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'
import { createDkimFailureRateGuide } from './trafficAdminGuides/createDkimFailureRateGuide'
import { createForwardingOverridesGuide } from './trafficAdminGuides/createForwardingOverridesGuide'
import { createSpfPermerrorGuide } from './trafficAdminGuides/createSpfPermerrorGuide'
import { createSpfUnalignedGuide } from './trafficAdminGuides/createSpfUnalignedGuide'

export function createTrafficAdminGuides(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide[] {
  const guides: DiagnosticsAdminGuide[] = []
  const spfPermerrorRatio =
    stats.failedEvents > 0 ? stats.spf_permerror / stats.failedEvents : 0
  const spfUnalignedRatio =
    stats.totalEvents > 0 ? stats.spf_pass_unaligned / stats.totalEvents : 0
  const dkimFailureRatio =
    stats.totalEvents > 0 ? stats.dkim_all_fail / stats.totalEvents : 0
  const forwardedRatio =
    stats.failedEvents > 0
      ? stats.dmarc_override_forwarded / stats.failedEvents
      : 0

  if (spfPermerrorRatio >= 0.05) guides.push(createSpfPermerrorGuide(stats))
  if (spfUnalignedRatio >= 0.05) guides.push(createSpfUnalignedGuide(stats))
  if (dkimFailureRatio >= 0.05) guides.push(createDkimFailureRateGuide(stats))
  if (forwardedRatio >= 0.1) guides.push(createForwardingOverridesGuide(stats))

  return guides
}
