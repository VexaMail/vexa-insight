CREATE TABLE `forensic_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reported_domain` text NOT NULL,
	`feedback_type` text NOT NULL,
	`auth_failure` text,
	`source_ip` text,
	`reporting_mta` text,
	`arrival_date` integer NOT NULL,
	`header_from_domain` text,
	`envelope_from_domain` text,
	`dkim_domain` text,
	`dkim_selector` text,
	`spf_result` text,
	`dkim_result` text,
	`dmarc_result` text,
	`original_message_id` text,
	`list_id` text,
	`source_message_id` text,
	`ingested_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `forensic_reports_domain_arrival_idx` ON `forensic_reports` (`reported_domain`,`arrival_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `forensic_reports_source_message_idx` ON `forensic_reports` (`source_message_id`);