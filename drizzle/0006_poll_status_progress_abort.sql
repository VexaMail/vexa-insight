-- Add progress and abort columns to poll_status for cron UI.
ALTER TABLE `poll_status`
ADD COLUMN `current_processed` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `poll_status`
ADD COLUMN `abort_requested` integer DEFAULT 0 NOT NULL;