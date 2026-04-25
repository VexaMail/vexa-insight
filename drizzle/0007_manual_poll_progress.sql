-- Phase 1 manual poll progress: imap_accounts, app_settings, processed_messages, poll_status.
ALTER TABLE `imap_accounts` ADD COLUMN `move_to_trash_after_process` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `app_settings` ADD COLUMN `ingestion_include_trash` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `app_settings` ADD COLUMN `ingestion_include_all_folders` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
CREATE TABLE `processed_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`imap_account_id` integer NOT NULL REFERENCES `imap_accounts`(`id`),
	`message_id` text NOT NULL,
	`processed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `processed_messages_imap_message_idx` ON `processed_messages` (`imap_account_id`,`message_id`);
--> statement-breakpoint
ALTER TABLE `poll_status` ADD COLUMN `progress_items` text;
