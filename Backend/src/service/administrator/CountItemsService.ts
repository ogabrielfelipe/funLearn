import prismaClient from "../../prisma"



class CountItemsService{
    async execute(){
        const count = await prismaClient.$queryRaw`
            SELECT COUNT(*) as count_students, 
                    (SELECT COUNT(*)  FROM theme) as count_themes,
                    (SELECT COUNT(*)  FROM ask) as count_asks,
                    (SELECT COUNT(*)  FROM teacher) as count_teachers,
                    (SELECT COUNT(*)  FROM team) as count_teams,
                    (SELECT COUNT(*)  FROM administrator) as count_administrators
                FROM student
        `
        console.log(count)
        return count
    }
}

export { CountItemsService }