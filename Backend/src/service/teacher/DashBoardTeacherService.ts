import prismaClient from "../../prisma"
import { FindClassificationByStudentService } from "../game/FindClassificationByStudentService"



class DashBoardTeacherService{
    async execute(teamID: string, themeID: string){
        const team = await prismaClient.team.findUnique({
            where: {
                id: teamID
            }
        })

        if (!team){
            throw new Error('team not found.')
        }


        const theme = await prismaClient.theme.findUnique({
            where: {
                id: themeID
            }
        })

        if (!theme){
            throw new Error('theme not found.')
        }


        const positions = await prismaClient.$queryRaw`
            SELECT p.id as idPosition, p.score, p.dateInitial, p.finished, p.finishedOver, p.finishedTime, p.life, p.dateFinalization,
                p.recommence, p.dateRecommence, p.qtdRecommence, p.attempt, t.id as idTeam, t.name as nameTeam, st.id as idStudent, 
                st.name as nameStudent, th.id as idTheme, th.name as nameTheme
            FROM position as p

            INNER JOIN teams_on_themes as teth ON teth.themeID=p.themeID
            INNER JOIN theme as th ON th.id=teth.themeID
            INNER JOIN team as t ON t.id = teth.teamID
            INNER JOIN student as st ON st.id = p.studentID

            WHERE
                p.themeID= ${theme.id} and teth.teamID= ${team.id}

            GROUP BY p.id, t.id, st.id
        `

        const students = await prismaClient.$queryRaw`
            SELECT s.id as idStudent, s.name as nameStudent 
            FROM student as s
            INNER JOIN students_on_teams as stte ON stte.studentID=s.id
            INNER JOIN teams_on_themes as teth ON teth.teamID=stte.teamID
            WHERE
                teth.themeID= ${theme.id} and teth.teamID=${team.id}
            GROUP BY s.id
        `


        const games = await prismaClient.$queryRaw`
            SELECT g.id as idGame, g.point, g.tip, g.positionID, g.answered, g.correct as handleCorrect, g.dateCreated,
                g.dateFinalization, g.dateVisualized, a.id as idAsk, a.question as descriptionQuestion, a.level, 
                an.id as idAnswer, an.description as descriptionAnswer
            FROM game as g
            INNER JOIN ask as a ON a.id=g.askID
            INNER JOIN answer as an ON an.askID=a.id and an.correct=true
            WHERE
                g.positionID IN (
                    SELECT p.id FROM position as p
                    INNER JOIN teams_on_themes as teth ON teth.themeID=p.themeID
                    INNER JOIN theme as th ON th.id=teth.themeID
                    INNER JOIN team as t ON t.id = teth.teamID
                    INNER JOIN student as st ON st.id = p.studentID
                    WHERE
                        p.themeID=${theme.id} and teth.teamID=${team.id}

                )
            ORDER BY 
                g.positionID
        `

        const StudentsOnComplete = await prismaClient.$queryRaw`
            SELECT stu.id as studentID, p.finished, p.finishedOver, p.finishedTime, p.dateFinalization,
                stu.name as nameStudent 
            FROM team as te
            INNER JOIN students_on_teams st ON st.teamID = te.id
            INNER JOIN teams_on_themes as tt ON tt.teamID=st.teamID
            INNER JOIN student stu ON stu.id = st.studentID
            LEFT JOIN position as p ON p.studentID = st.studentID and p.themeID = tt.themeID
            WHERE 
                te.id = ${team.id} and tt.themeID= ${theme.id}
            GROUP BY stu.id, p.finished, p.finishedOver, p.finishedTime, p.dateFinalization
            ORDER BY stu.id
        `

        const classificationsStudents = await prismaClient.$queryRaw`
            SELECT IFNULL(SUM(g.point), 0) as score, stu.name as nameStudent, stu.id as studentID FROM team as te
            INNER JOIN students_on_teams st ON st.teamID = te.id
            INNER JOIN teams_on_themes as teth ON teth.teamID=te.id
            INNER JOIN student stu ON stu.id = st.studentID
            LEFT JOIN position as p ON p.studentID = st.studentID and p.themeID=teth.themeID
            LEFT JOIN game as g ON g.positionID=p.id
            WHERE 
                te.id = ${team.id} and teth.themeID= ${theme.id}
            GROUP BY stu.id    
            ORDER BY SUM(p.score) DESC
        `

        return {
            infoPositions: positions,
            infoStudents: students,
            infoGames: games,
            statistics: {
                studentsComplete: StudentsOnComplete,
                classificationsStudents: classificationsStudents

            }
        }


    }
}

export { DashBoardTeacherService }