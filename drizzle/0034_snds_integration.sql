CREATE TABLE `snds_connection` (
	`id` integer PRIMARY KEY NOT NULL,
	`refresh_token_encrypted` text,
	`pending_verifier_encrypted` text,
	`pending_created_at` integer,
	`connected_at` integer,
	`last_sync_at` integer,
	`last_sync_status` text,
	`last_sync_error` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `snds_ip_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`report_date` text NOT NULL,
	`ip` text NOT NULL,
	`activity_start` text,
	`activity_end` text,
	`rcpt_commands` integer,
	`data_commands` integer,
	`message_recipients` integer,
	`filter_result` text,
	`complaint_rate` real,
	`trap_period_start` text,
	`trap_period_end` text,
	`trap_hits` integer,
	`sample_helo` text,
	`sample_mail_from` text,
	`comments` text,
	`raw` text NOT NULL,
	`fetched_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `snds_ip_data_date_ip_idx` ON `snds_ip_data` (`report_date`,`ip`);--> statement-breakpoint
CREATE INDEX `snds_ip_data_ip_idx` ON `snds_ip_data` (`ip`);--> statement-breakpoint
CREATE TABLE `snds_ip_status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_ip` text,
	`last_ip` text,
	`blocked` text,
	`details` text,
	`raw` text NOT NULL,
	`fetched_at` integer NOT NULL
);
