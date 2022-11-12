import prismaClient from "../../prisma"

interface TeamRequest{
    id: string,
    name: string,
    teacherID: string,
    active: boolean | null
}

class ChangeTeamService{
    async execute( { id, name, teacherID, active }:TeamRequest ){
        const team = await prismaClient.team.findUnique({
            where:{
                id: id
            }
        })

        if (!team){
            throw new Error('team not found.')
        }

        if (teacherID != ""){
            const teacher = await prismaClient.teacher.findUnique({
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
        }

        const changeTeam = await prismaClient.team.update({
            where:{
                id: team.id
            },
            data:{
                name: name != "" ? name : team.name,
                active: active != null ? active : team.active,
                teacherID: teacherID != "" ? teacherID : team.teacherID
            },
            select:{
                id: true,
                name: true,
                active: true,
                teacher:{
                    select:{
                        id: true,
                        name: true,
                        active: true
                    }
                }
            }
        })


        return changeTeam
    }
}

export { ChangeTeamService }