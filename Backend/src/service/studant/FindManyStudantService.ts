import prismaClient from "../../prisma"


interface FindManyStudantRequest{
    name: string,
    userRequest: {
        id: string,
        type: string
    }
}

class FindManyStudantService{
    async execute( { name, userRequest }:FindManyStudantRequest ){

        const studants = await prismaClient.studant.findMany({
            
            where:{
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
                ...(userRequest.type === "teacher" ? { teams:{ some:{ team: { teacher: { id: userRequest.id } } } } } : {} )
            },
            select: {
                id: true,
                name: true,
                active: true,
                teams: {
                    select:{
                        team:{
                            select: {
                                id: true,
                                name: true,
                                active: true
                            }
                        }
                    }
                }
            }                 
        })

        return studants
    }
}

export { FindManyStudantService }