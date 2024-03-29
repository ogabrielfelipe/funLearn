import prismaClient from "../../prisma"


interface FindManystudentRequest{
    name: string,
    userRequest: {
        id: string,
        type: string
    }
}

class FindManyStudentService{
    async execute( { name, userRequest }:FindManystudentRequest ){

        const students = await prismaClient.student.findMany({
            
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

        return students
    }
}

export { FindManyStudentService }