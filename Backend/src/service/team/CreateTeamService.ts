import prismaClient from "../../prisma"


interface TeamRequest{
    name: string,
    active: boolean,
    teacherID: string
}


class CreateTeamService{
    async execute( {name, active, teacherID}: TeamRequest ){

        const teacher = await prismaClient.teacher.findFirst({
            where:{
                id: teacherID
            }
        })

        if (!teacher){
            throw new Error('teacher not found.')
        }

        if (!teacher.active){
            throw new Error('teacher inative.')
        }

        const team = await prismaClient.team.create({
            data:{
                name: name,
                active: active,
                teacherID: teacher.id
            },
            select:{
                id: true,
                active: true,
                teacher:{
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
        })

        return team


    }
}

export { CreateTeamService }