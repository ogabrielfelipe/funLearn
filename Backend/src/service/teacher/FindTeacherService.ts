import prismaClient from "../../prisma"

interface FindTeacherRequest{
    teacherID: string,
    user: {
        id: string,
        type: string
    }
}

class FindTeacherService{
    async execute( {teacherID, user}:FindTeacherRequest ){

        if(!teacherID){
            throw new Error('identifier is required')
        }

        if (user.type === "teacher"){
            if (user.id != teacherID ){
                throw new Error('user is not permission.')
            }
        }
        if (user.type === "student"){
            throw new Error('user is not permission.')
        }

        const teacher = await prismaClient.teacher.findUnique({
            where:{
                id: teacherID
            },
            select:{
                id: true,
                name: true,
                active: true,
                username: true,
                team: {
                    select:{
                        id: true,
                        name: true,
                        active: true
                    }
                }
            }
        })

        if (!teacher){
            throw new Error('teacher not found.')
        }

        return teacher

    }
}

export { FindTeacherService }