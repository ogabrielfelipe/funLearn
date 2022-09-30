import prismaClient from "../../prisma"



class FindTeamService{
    async execute( teamID: string ){
        if (!teamID){
            throw new Error('team is required.')
        }

        const findTeam = await prismaClient.team.findUnique({
            where:{
                id: teamID
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

        if(!findTeam){
            throw new Error('team not found.')
        }

        return findTeam
    }
}


export { FindTeamService }