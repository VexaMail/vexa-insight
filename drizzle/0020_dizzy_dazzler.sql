ALTER TABLE `normalized_events` ADD `spf_auth_result` text DEFAULT 'none' NOT NULL;--> statement-breakpoint
CREATE INDEX `domain_date_idx` ON `normalized_events` (`domain_id`,`report_begin_date`);--> statement-breakpoint
CREATE INDEX `domain_spf_auth_idx` ON `normalized_events` (`domain_id`,`spf_auth_result`);