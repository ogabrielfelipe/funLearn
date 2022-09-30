import prismaClient from "../../prisma";

interface TeamsRequest{
    name: string,

}

class FindTeamsService{
    async execute( { name }: TeamsRequest ){

        const teams = await prismaClient.team.findMany({
            where:{
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
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