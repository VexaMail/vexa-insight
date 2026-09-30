CREATE TABLE `tls_report_failures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`policy_id` integer NOT NULL,
	`result_type` text NOT NULL,
	`sending_mta_ip` text,
	`receiving_mx_hostname` text,
	`receiving_ip` text,
	`failed_session_count` integer NOT NULL,
	`failure_reason_code` text,
	FOREIGN KEY (`policy_id`) REFERENCES `tls_report_policies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `tls_report_failures_policy_idx` ON `tls_report_failures` (`policy_id`);--> statement-breakpoint
CREATE TABLE `tls_report_policies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tls_report_id` integer NOT NULL,
	`policy_type` text NOT NULL,
	`policy_domain` text NOT NULL,
	`mx_hosts` text NOT NULL,
	`successful_session_count` integer NOT NULL,
	`failed_session_count` integer NOT NULL,
	FOREIGN KEY (`tls_report_id`) REFERENCES `tls_reports`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `tls_report_policies_domain_idx` ON `tls_report_policies` (`policy_domain`);--> statement-breakpoint
CREATE INDEX `tls_report_policies_report_idx` ON `tls_report_policies` (`tls_report_id`);--> statement-breakpoint
CREATE TABLE `tls_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`report_id` text NOT NULL,
	`org_name` text NOT NULL,
	`contact_info` text,
	`begin_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`raw_json` text NOT NULL,
	`source_message_id` text,
	`ingested_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tls_reports_org_report_idx` ON `tls_reports` (`org_name`,`report_id`);