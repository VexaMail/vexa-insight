CREATE TABLE `job_poll_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`job_run_id` integer NOT NULL,
	`imap_account_id` integer,
	`step` text NOT NULL,
	`message_label` text,
	`error` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`job_run_id`) REFERENCES `job_runs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`imap_account_id`) REFERENCES `imap_accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `job_runs` ADD `completed_at` integer;--> statement-breakpoint
ALTER TABLE `poll_status` ADD `active_job_run_id` integer REFERENCES job_runs(id);--> statement-breakpoint
ALTER TABLE `poll_status` DROP COLUMN `progress_items`;