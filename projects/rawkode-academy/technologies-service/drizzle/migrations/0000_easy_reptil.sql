CREATE TABLE `technologies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`license` text NOT NULL,
	`website` text,
	`documentation` text,
	`githubRepository` text
);
