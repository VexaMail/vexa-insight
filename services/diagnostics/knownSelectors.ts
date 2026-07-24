// Documented, stable selectors only: providers that generate per-account
// selectors (Amazon SES, HubSpot, newer Postmark accounts) cannot be probed
// with a fixed list. Each entry costs one parallel TXT lookup per uncached
// diagnostics run.
export const KNOWN_SELECTORS = [
  // Generic conventions
  'default',
  'dkim',
  'mail',
  'smtp',
  // Google Workspace
  'google',
  // Microsoft 365
  'selector1',
  'selector2',
  // Mailchimp / Mandrill and Mailgun legacy
  'k1',
  'k2',
  'k3',
  // SendGrid
  's1',
  's2',
  'smtpapi',
  // Mailgun
  'mg',
  // Zoho
  'zoho',
  // Postmark (legacy fixed selector)
  'pm',
  // Fastmail
  'fm1',
  'fm2',
  'fm3',
  // Proton Mail
  'protonmail',
  'protonmail2',
  'protonmail3',
  // iCloud custom domains
  'sig1',
  // Constant Contact
  'ctct1',
  'ctct2',
  // Zendesk
  'zendesk1',
  'zendesk2',
] as const
