import prismaClient from "../../prisma"

interface FindTeachersRequest{
    name: string,
    user: {
        id: string,
        type: string
    }
}

class FindManyTeacherService{
    async execute( {name, user}:FindTeachersRequest ){

        if (user.type === "studant" || user.type === "teacher"){
            throw new Error('user is not permission.')
        }

        const teachers = await prismaClient.teacher.findMany({
            where:{
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
            },
            select:{
                id: true,
                name: true,
                username: true,
                active: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        active: true
                    }
                }
            }
        })

        return teachers

        
    }
}

export { FindManyTeacherService }