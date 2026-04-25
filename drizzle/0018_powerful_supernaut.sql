PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_normalized_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`raw_report_id` integer NOT NULL,
	`domain_id` integer NOT NULL,
	`ip_address_id` integer NOT NULL,
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
	FOREIGN KEY (`domain_id`) REFERENCES `domains`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ip_address_id`) REFERENCES `ip_addresses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_normalized_events`("id", "raw_report_id", "domain_id", "ip_address_id", "spf_result", "dkim_result", "spf_aligned", "dkim_aligned", "disposition", "count", "report_begin_date", "report_end_date", "created_at") SELECT "id", "raw_report_id", "domain_id", "ip_address_id", "spf_result", "dkim_result", "spf_aligned", "dkim_aligned", "disposition", "count", "report_begin_date", "report_end_date", "created_at" FROM `normalized_events`;--> statement-breakpoint
DROP TABLE `normalized_events`;--> statement-breakpoint
ALTER TABLE `__new_normalized_events` RENAME TO `normalized_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;