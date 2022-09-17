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
