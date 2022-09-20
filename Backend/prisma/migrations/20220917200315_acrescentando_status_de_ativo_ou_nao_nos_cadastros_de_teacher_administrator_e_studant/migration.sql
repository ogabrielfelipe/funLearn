-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `studant` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `teacher` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
