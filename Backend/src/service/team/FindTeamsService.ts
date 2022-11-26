import prismaClient from "../../prisma";

interface TeamsRequest{
    name: string,
    user: {
        id: string,
        type: string
    } 
}

class FindTeamsService{
    async execute( { name, user }: TeamsRequest ){
        

        const teams = await prismaClient.team.findMany({
            where:{
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
                ...(user.type === 'teacher' ? {teacherID : user.id} : {})
            },
            select:{
                id: true,
                name: true,
                active: true,
                teacher: {
                    select:{
                        id: true,
                        name: true,
                        active: true
                    }
                }

            }
        })

        return teams

    }
}

export { FindTeamsService }