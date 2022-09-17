/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[register]` on the table `studant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `administrator_username_key` ON `administrator`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `studant_register_key` ON `studant`(`register`);

-- CreateIndex
CREATE UNIQUE INDEX `teacher_username_key` ON `teacher`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `team_name_key` ON `team`(`name`);
