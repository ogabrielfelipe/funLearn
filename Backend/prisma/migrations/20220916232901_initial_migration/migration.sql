/*
  Warnings:

  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudantOnPositions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudantsOnTeams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_askID_fkey`;

-- DropForeignKey
ALTER TABLE `Position` DROP FOREIGN KEY `Position_askID_fkey`;

-- DropForeignKey
ALTER TABLE `StudantOnPositions` DROP FOREIGN KEY `StudantOnPositions_positionID_fkey`;

-- DropForeignKey
ALTER TABLE `StudantOnPositions` DROP FOREIGN KEY `StudantOnPositions_studantID_fkey`;

-- DropForeignKey
ALTER TABLE `StudantsOnTeams` DROP FOREIGN KEY `StudantsOnTeams_studantID_fkey`;

-- DropForeignKey
ALTER TABLE `StudantsOnTeams` DROP FOREIGN KEY `StudantsOnTeams_teamID_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_teacherID_fkey`;

-- DropTable
DROP TABLE `Administrator`;

-- DropTable
DROP TABLE `Answer`;

-- DropTable
DROP TABLE `Ask`;

-- DropTable
DROP TABLE `Position`;

-- DropTable
DROP TABLE `Studant`;

-- DropTable
DROP TABLE `StudantOnPositions`;

-- DropTable
DROP TABLE `StudantsOnTeams`;

-- DropTable
DROP TABLE `Teacher`;

-- DropTable
DROP TABLE `Team`;

-- CreateTable
CREATE TABLE `administrator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `teacherID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `register` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studants_on_teams` (
    `studantID` INTEGER NOT NULL,
    `teamID` INTEGER NOT NULL,

    PRIMARY KEY (`studantID`, `teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finish` BOOLEAN NOT NULL DEFAULT true,
    `pointing` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `askID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studant_on_positions` (
    `studantID` INTEGER NOT NULL,
    `positionID` INTEGER NOT NULL,

    PRIMARY KEY (`studantID`, `positionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(512) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `image` VARCHAR(155) NOT NULL,
    `level` ENUM('INITIAL', 'INTERMEDIARY', 'ADVANCED') NOT NULL DEFAULT 'INITIAL',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `correct` BOOLEAN NOT NULL DEFAULT false,
    `askID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
