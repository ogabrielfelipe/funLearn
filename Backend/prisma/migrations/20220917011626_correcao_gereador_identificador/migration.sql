/*
  Warnings:

  - The primary key for the `administrator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `studant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `studant_on_positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `studants_on_teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `answer` DROP FOREIGN KEY `answer_askID_fkey`;

-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `position_askID_fkey`;

-- DropForeignKey
ALTER TABLE `studant_on_positions` DROP FOREIGN KEY `studant_on_positions_positionID_fkey`;

-- DropForeignKey
ALTER TABLE `studant_on_positions` DROP FOREIGN KEY `studant_on_positions_studantID_fkey`;

-- DropForeignKey
ALTER TABLE `studants_on_teams` DROP FOREIGN KEY `studants_on_teams_studantID_fkey`;

-- DropForeignKey
ALTER TABLE `studants_on_teams` DROP FOREIGN KEY `studants_on_teams_teamID_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `team_teacherID_fkey`;

-- AlterTable
ALTER TABLE `administrator` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `answer` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `askID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ask` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `position` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `askID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `studant` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `studant_on_positions` DROP PRIMARY KEY,
    MODIFY `studantID` VARCHAR(191) NOT NULL,
    MODIFY `positionID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`studantID`, `positionID`);

-- AlterTable
ALTER TABLE `studants_on_teams` DROP PRIMARY KEY,
    MODIFY `studantID` VARCHAR(191) NOT NULL,
    MODIFY `teamID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`studantID`, `teamID`);

-- AlterTable
ALTER TABLE `teacher` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `team` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `teacherID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studants_on_teams` ADD CONSTRAINT `studants_on_teams_studantID_fkey` FOREIGN KEY (`studantID`) REFERENCES `studant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studants_on_teams` ADD CONSTRAINT `studants_on_teams_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `position_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studant_on_positions` ADD CONSTRAINT `studant_on_positions_studantID_fkey` FOREIGN KEY (`studantID`) REFERENCES `studant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studant_on_positions` ADD CONSTRAINT `studant_on_positions_positionID_fkey` FOREIGN KEY (`positionID`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
