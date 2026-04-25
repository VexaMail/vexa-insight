import type { DnsDiagnostics } from '@/types/diagnostics'
import type { DiagnosticsDnsSummary } from '../contracts/DiagnosticsDnsSummary'

/** Transforms raw DNS diagnostics into a compact AI-ready shape. */
export function buildDiagnosticsDnsSummary(
  dns: DnsDiagnostics,
): DiagnosticsDnsSummary {
  return {
    spfRecord: dns.spf,
    spfValid: dns.spfValid,
    spfWarning: dns.spfWarning,
    spfCategories: dns.spfValidationCategories.map((category) => ({
      category: category.category,
      checks: category.checks.map((check) => ({
        name: check.name,
        passed: check.passed,
        detail: check.detail,
      })),
    })),
    dmarcRecord: dns.dmarc,
    dmarcPolicy: dns.dmarcPolicy,
    dmarcValid: dns.dmarcValid,
    dmarcWarnings: dns.dmarcWarnings,
    dmarcTags: dns.dmarcTags.map((tag) => ({
      tag: tag.tag,
      value: tag.value,
      description: tag.description,
    })),
    dkimSelectors: dns.dkimParsedRecords.map((record) => ({
      selector: record.selector,
      valid: record.valid,
      record: record.raw,
      keyType: record.keyType,
      keyLengthBits: record.keyLengthBits,
      publicKeyPresent: record.publicKeyPresent,
      errors: record.errors,
    })),
    mxHosts: dns.mx.map((m) => m.exchange),
    aRecords: dns.aRecords,
    nsRecords: dns.nsRecords,
    bimiRecord: dns.bimi.raw,
    bimiValid: dns.bimi.valid,
    bimiLogoUrl: dns.bimi.logoUrl,
    bimiCertificateUrl: dns.bimi.certificateUrl,
    mtaStsRecord: dns.mtaSts.raw,
    mtaStsValid: dns.mtaSts.valid,
    mtaStsPolicyAccessible: dns.mtaSts.policyFileAccessible,
    mtaStsMode: dns.mtaSts.mode,
    mtaStsMxRecords: dns.mtaSts.mxRecords,
    tlsRptRecord: dns.tlsRpt.raw,
    tlsRptValid: dns.tlsRpt.valid,
    tlsRptRuaAddresses: dns.tlsRpt.ruaAddresses,
  }
}
