import type { SenderCategory } from '@/types/senders'

/** A sender category as a short human label. */
export function formatSenderCategory(category: SenderCategory): string {
  switch (category) {
    case 'mailbox-provider':
      return 'Mailbox provider'
    case 'email-service':
      return 'Email service'
    case 'marketing':
      return 'Marketing'
    case 'crm':
      return 'CRM'
    case 'support':
      return 'Support / tools'
    case 'security-gateway':
      return 'Security gateway'
    case 'hosting':
      return 'Hosting'
    case 'mailing-list':
      return 'Mailing list / forwarder'
  }
}
