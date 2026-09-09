import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'

export function createSpfUnalignedGuide(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide {
  return {
    id: 'spf-unaligned',
    severity: 'medium',
    title: 'Some traffic passes SPF but is not DMARC-aligned',
    summary: `SPF passes without alignment in ${String(stats.spf_pass_unaligned)} of ${String(stats.totalEvents)} observed events.`,
    whyItMatters:
      'This usually indicates delegated Return-Path usage, third-party bounce domains, or partial ESP configurations that pass SPF but do not satisfy DMARC.',
    howToFix:
      'Review each sending provider and configure a custom Return-Path or MAIL FROM under your domain so it aligns with the Header From.',
    verifySteps: [
      'Identify which platforms send with an external envelope sender.',
      'Confirm in later reports that the SPF unaligned rate goes down.',
    ],
  }
}
