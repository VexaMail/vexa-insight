-- Remove legacy IMAP columns from app_settings; IMAP config lives in imap_accounts.
ALTER TABLE `app_settings` DROP COLUMN `imap_server`;
--> statement-breakpoint
ALTER TABLE `app_settings` DROP COLUMN `imap_port`;
--> statement-breakpoint
ALTER TABLE `app_settings` DROP COLUMN `imap_username`;
--> statement-breakpoint
ALTER TABLE `app_settings` DROP COLUMN `imap_password`;