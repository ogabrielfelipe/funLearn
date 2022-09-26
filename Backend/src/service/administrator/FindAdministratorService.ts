import prismaClient from "../../prisma"

interface FindAdministratorRequest{
    adminID: string,
    user: {
        id: string,
        type: string
    } 
}

class FindAdministratorService{
    async execute( {adminID, user}:FindAdministratorRequest ){
        if (!adminID){
            throw new Error('identifier is required')
        }

        if (user.type != "administrator"){
            throw new Error('user is not permission.')
        }

        const admin = prismaClient.administrator.findUnique({
            where:{
                id: adminID
            },
            select:{
                id: true,
                name: true,
                active: true,
                username: true
            }

        })

        if (!admin){
            throw new Error("admin not found.")
        }

        return admin

    }
}

export { FindAdministratorService }