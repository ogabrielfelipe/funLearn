import prismaClient from "../../prisma"

interface FindManyAdministratorRequest{
    name: string,
    user: {
        id: string,
        type: string
    } 
}

class FindManyAdministratorService{
    async execute( {name, user}:FindManyAdministratorRequest ){
        if (user.type != "administrator"){
            throw new Error('user is not permission.')
        }

        const admin = await prismaClient.administrator.findMany({
            where:{
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
            },
            select:{
                id: true,
                name: true,
                username: true,
                active: true
            }
        })

        return admin
    }
}

export { FindManyAdministratorService }