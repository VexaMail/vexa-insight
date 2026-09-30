-- The default project name is now "Vexa Insight". Only rows still carrying the
-- old default are renamed; a name an operator chose is left alone. The column
-- default is not changed in SQLite, which would need a table rebuild; the one
-- row is seeded by 0003 and renamed here, so nothing reads that default.
UPDATE `app_settings` SET `project_name` = 'Vexa Insight' WHERE `project_name` = 'Vexa Mail Insight';
