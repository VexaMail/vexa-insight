ALTER TABLE `app_settings` ADD `geoip_maxmind_license_key` text;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `geoip_last_db_update_at` integer;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `geoip_last_db_update_error` text;--> statement-breakpoint
ALTER TABLE `normalized_events` ADD `ip_address_id` integer REFERENCES ip_addresses(id);