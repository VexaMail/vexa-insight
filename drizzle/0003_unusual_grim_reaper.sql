CREATE TABLE `app_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_name` text DEFAULT 'Vexa Mail Insight' NOT NULL,
	`api_v1_str` text DEFAULT '/api/v1' NOT NULL,
	`imap_server` text DEFAULT '' NOT NULL,
	`imap_port` integer DEFAULT 993 NOT NULL,
	`imap_username` text DEFAULT '' NOT NULL,
	`imap_password` text DEFAULT '' NOT NULL,
	`ingestion_interval_minutes` integer DEFAULT 60 NOT NULL,
	`ingestion_days_back` integer DEFAULT 7 NOT NULL,
	`secret_key` text DEFAULT 'CHANGE_ME' NOT NULL,
	`backend_cors_origins` text DEFAULT 'http://localhost:3000' NOT NULL,
	`environment` text DEFAULT 'development' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `app_settings` (`id`, `project_name`, `api_v1_str`, `imap_server`, `imap_port`, `imap_username`, `imap_password`, `ingestion_interval_minutes`, `ingestion_days_back`, `secret_key`, `backend_cors_origins`, `environment`, `updated_at`) VALUES (1, 'Vexa Mail Insight', '/api/v1', '', 993, '', '', 60, 7, 'CHANGE_ME', 'http://localhost:3000', 'development', (strftime('%s','now') * 1000));
