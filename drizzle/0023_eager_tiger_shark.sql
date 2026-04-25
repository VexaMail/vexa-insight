ALTER TABLE `imap_accounts` ADD `mark_as_read_after_process` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `poll_status` ADD `status_text` text;