import prismaClient from "../../prisma"



class FindClassificationByStudentService{
    async execute(teamID: string){
        const team = await prismaClient.team.findUnique({
            where: {
                id: teamID
            }
        })

        if (!team){
            throw new Error('team not found.')
        }

        const students = await prismaClient.$queryRaw`
            SELECT IFNULL(SUM(p.score), 0) as score, stu.name as nameStudent, stu.id as studentID FROM team as te
            INNER JOIN students_on_teams st ON st.teamID = te.id
            INNER JOIN student stu ON stu.id = st.studentID
            LEFT JOIN position as p ON p.studentID = st.studentID
            WHERE 
                te.id = ${teamID}
            GROUP BY stu.id    
            ORDER BY SUM(p.score) DESC
        `

        return students
    }
}

export { FindClassificationByStudentService }