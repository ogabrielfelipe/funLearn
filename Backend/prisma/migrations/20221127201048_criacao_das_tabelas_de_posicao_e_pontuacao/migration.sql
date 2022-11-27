/*
  Warnings:

  - You are about to drop the column `askID` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `finish` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `pointing` on the `position` table. All the data in the column will be lost.
  - You are about to drop the `studant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studant_on_positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studants_on_teams` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `themeID` to the `ask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFinish` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateInitial` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finished` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedOver` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedTime` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `life` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeID` to the `position` table without a default value. This is not possible if the table is not empty.

*/
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

-- AlterTable
ALTER TABLE `ask` ADD COLUMN `themeID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `position` DROP COLUMN `askID`,
    DROP COLUMN `finish`,
    DROP COLUMN `pointing`,
    ADD COLUMN `dateFinish` DATETIME(3) NOT NULL,
    ADD COLUMN `dateInitial` DATETIME(3) NOT NULL,
    ADD COLUMN `finished` BOOLEAN NOT NULL,
    ADD COLUMN `finishedOver` BOOLEAN NOT NULL,
    ADD COLUMN `finishedTime` BOOLEAN NOT NULL,
    ADD COLUMN `life` INTEGER NOT NULL,
    ADD COLUMN `started` BOOLEAN NOT NULL,
    ADD COLUMN `studentID` VARCHAR(191) NOT NULL,
    ADD COLUMN `themeID` VARCHAR(191) NOT NULL,
    MODIFY `score` BIGINT NOT NULL;

-- DropTable
DROP TABLE `studant`;

-- DropTable
DROP TABLE `studant_on_positions`;

-- DropTable
DROP TABLE `studants_on_teams`;

-- CreateTable
CREATE TABLE `students_on_teams` (
    `studentID` VARCHAR(191) NOT NULL,
    `teamID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`studentID`, `teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `register` BIGINT NOT NULL,
    `password` VARCHAR(155) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `student_register_key`(`register`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `theme` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `teacherID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams_on_themes` (
    `teamID` VARCHAR(191) NOT NULL,
    `themeID` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`teamID`, `themeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `punctuation` (
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `right` BOOLEAN NOT NULL,
    `tip` INTEGER NOT NULL,
    `attempt` INTEGER NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `askID` VARCHAR(191) NOT NULL,
    `positionID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tip` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `askID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `teacher_id_key` ON `teacher`(`id`);

-- AddForeignKey
ALTER TABLE `students_on_teams` ADD CONSTRAINT `students_on_teams_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students_on_teams` ADD CONSTRAINT `students_on_teams_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `theme` ADD CONSTRAINT `theme_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams_on_themes` ADD CONSTRAINT `teams_on_themes_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams_on_themes` ADD CONSTRAINT `teams_on_themes_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `position_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `position_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `punctuation` ADD CONSTRAINT `punctuation_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `punctuation` ADD CONSTRAINT `punctuation_positionID_fkey` FOREIGN KEY (`positionID`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ask` ADD CONSTRAINT `ask_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tip` ADD CONSTRAINT `tip_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
