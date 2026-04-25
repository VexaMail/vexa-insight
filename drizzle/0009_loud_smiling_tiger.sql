ALTER TABLE `poll_status`
ADD `total_emails` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `poll_status`
ADD `processing_emails` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `poll_status` ADD `eta_ms` integer DEFAULT 0 NOT NULL;