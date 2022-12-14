-- funLearn.administrator definition

CREATE TABLE `administrator` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `administrator_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.student definition

CREATE TABLE `student` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `register` bigint NOT NULL,
  `password` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_register_key` (`register`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.teacher definition

CREATE TABLE `teacher` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacher_username_key` (`username`),
  UNIQUE KEY `teacher_id_key` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.team definition

CREATE TABLE `team` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `teacherID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_name_key` (`name`),
  KEY `team_teacherID_fkey` (`teacherID`),
  CONSTRAINT `team_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.theme definition

CREATE TABLE `theme` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `teacherID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `theme_teacherID_fkey` (`teacherID`),
  CONSTRAINT `theme_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.ask definition

CREATE TABLE `ask` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `image` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('INITIAL','INTERMEDIARY','ADVANCED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INITIAL',
  `themeID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ask_themeID_fkey` (`themeID`),
  CONSTRAINT `ask_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.`position` definition

CREATE TABLE `position` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` bigint NOT NULL,
  `dateFinish` datetime(3) NOT NULL,
  `dateInitial` datetime(3) NOT NULL,
  `finished` tinyint(1) NOT NULL,
  `finishedOver` tinyint(1) NOT NULL,
  `finishedTime` tinyint(1) NOT NULL,
  `life` int NOT NULL,
  `started` tinyint(1) NOT NULL,
  `studentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `themeID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `position_studentID_fkey` (`studentID`),
  KEY `position_themeID_fkey` (`themeID`),
  CONSTRAINT `position_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `position_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.students_on_teams definition

CREATE TABLE `students_on_teams` (
  `studentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teamID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`studentID`,`teamID`),
  KEY `students_on_teams_teamID_fkey` (`teamID`),
  CONSTRAINT `students_on_teams_studentID_fkey` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `students_on_teams_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `team` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.teams_on_themes definition

CREATE TABLE `teams_on_themes` (
  `teamID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `themeID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`teamID`,`themeID`),
  KEY `teams_on_themes_themeID_fkey` (`themeID`),
  CONSTRAINT `teams_on_themes_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `team` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `teams_on_themes_themeID_fkey` FOREIGN KEY (`themeID`) REFERENCES `theme` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.tip definition

CREATE TABLE `tip` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `askID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tip_askID_fkey` (`askID`),
  CONSTRAINT `tip_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.answer definition

CREATE TABLE `answer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct` tinyint(1) NOT NULL DEFAULT '0',
  `askID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answer_askID_fkey` (`askID`),
  CONSTRAINT `answer_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- funLearn.game definition

CREATE TABLE `game` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` int NOT NULL,
  `right` tinyint(1) NOT NULL,
  `tip` int NOT NULL,
  `attempt` int NOT NULL,
  `time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `askID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `positionID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `game_askID_fkey` (`askID`),
  KEY `game_positionID_fkey` (`positionID`),
  CONSTRAINT `game_askID_fkey` FOREIGN KEY (`askID`) REFERENCES `ask` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `game_positionID_fkey` FOREIGN KEY (`positionID`) REFERENCES `position` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;