-- CreateTable
CREATE TABLE `Administrator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `teacherID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `register` VARCHAR(50) NOT NULL,
    `password` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudantsOnTeams` (
    `studantID` INTEGER NOT NULL,
    `teamID` INTEGER NOT NULL,

    PRIMARY KEY (`studantID`, `teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finish` BOOLEAN NOT NULL DEFAULT true,
    `pointing` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `askID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudantOnPositions` (
    `studantID` INTEGER NOT NULL,
    `positionID` INTEGER NOT NULL,

    PRIMARY KEY (`studantID`, `positionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(512) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `image` VARCHAR(155) NOT NULL,
    `level` ENUM('INITIAL', 'INTERMEDIARY', 'ADVANCED') NOT NULL DEFAULT 'INITIAL',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `correct` BOOLEAN NOT NULL DEFAULT false,
    `askID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudantsOnTeams` ADD CONSTRAINT `StudantsOnTeams_studantID_fkey` FOREIGN KEY (`studantID`) REFERENCES `Studant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudantsOnTeams` ADD CONSTRAINT `StudantsOnTeams_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `Ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudantOnPositions` ADD CONSTRAINT `StudantOnPositions_studantID_fkey` FOREIGN KEY (`studantID`) REFERENCES `Studant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudantOnPositions` ADD CONSTRAINT `StudantOnPositions_positionID_fkey` FOREIGN KEY (`positionID`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `Ask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
