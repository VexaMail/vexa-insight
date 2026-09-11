ALTER TABLE `raw_reports` ADD `is_demo` integer DEFAULT false NOT NULL;--> statement-breakpoint
-- Backfill: rows the seeder wrote before the column existed. Matching on the
-- report-id prefix alone is what this column replaces, so pair it with the two
-- other values only the seeder writes.
UPDATE `raw_reports`
SET `is_demo` = 1
WHERE `report_id` LIKE 'demo-%'
  AND `source_email` = 'demo@vexamail.local'
  AND `raw_xml` LIKE '<demo>%';
