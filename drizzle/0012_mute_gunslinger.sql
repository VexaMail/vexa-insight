ALTER TABLE `imap_accounts` ADD `fetch_include_trash` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `imap_accounts` ADD `fetch_include_all_folders` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `imap_accounts` ADD `post_process_action` text DEFAULT 'mark_read' NOT NULL;--> statement-breakpoint
ALTER TABLE `imap_accounts` ADD `post_process_folder` text;