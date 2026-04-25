CREATE TABLE `domains` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`active` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `domains_name_unique` ON `domains` (`name`);--> statement-breakpoint
CREATE TABLE `raw_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`report_id` text NOT NULL,
	`org_name` text NOT NULL,
	`begin_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`raw_xml` text NOT NULL,
	`source_email` text,
	`ingested_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `raw_reports_report_id_unique` ON `raw_reports` (`report_id`);--> statement-breakpoint
CREATE TABLE `normalized_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`raw_report_id` integer NOT NULL,
	`domain_id` integer NOT NULL,
	`source_ip` text NOT NULL,
	`spf_result` text NOT NULL,
	`dkim_result` text NOT NULL,
	`spf_aligned` integer NOT NULL,
	`dkim_aligned` integer NOT NULL,
	`disposition` text NOT NULL,
	`count` integer NOT NULL,
	`report_begin_date` integer NOT NULL,
	`report_end_date` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`raw_report_id`) REFERENCES `raw_reports`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`domain_id`) REFERENCES `domains`(`id`) ON UPDATE no action ON DELETE no action
);
