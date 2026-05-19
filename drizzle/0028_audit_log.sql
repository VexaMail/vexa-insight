CREATE TABLE `audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`ts` integer NOT NULL,
	`actor_id` text,
	`actor_email` text,
	`action` text NOT NULL,
	`target_type` text,
	`target_id` text,
	`ip` text,
	`user_agent` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `audit_log_ts_idx` ON `audit_log` (`ts`);
--> statement-breakpoint
CREATE INDEX `audit_log_actor_idx` ON `audit_log` (`actor_id`);
--> statement-breakpoint
CREATE INDEX `audit_log_action_idx` ON `audit_log` (`action`);
