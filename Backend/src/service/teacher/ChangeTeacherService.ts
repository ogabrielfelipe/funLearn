import { hash } from "bcryptjs"
import prismaClient from "../../prisma"


interface TeacherRequest{
    id: string
    name: string,
    password: string,
    active: boolean
}

class ChangeTeacherService{
    async execute( { id, name, password, active }: TeacherRequest ){

        const teacher = await prismaClient.teacher.findFirst({
            where: {
                id: id
            }
        })

        if (!teacher){
            throw new Error("Professor não encontrado")
        }

        var passwordHash = '';

        if(password != null){
            passwordHash = await hash(password, 8)
        }

        const teacherChange = await prismaClient.teacher.update({
            where: {
                id: teacher.id
            },
            data:{
                name: name != "" ? name : teacher.name,
                active: active != null ? active : teacher.active,
                password: password != "" ? passwordHash : teacher.password

            },
            select: {
                id: true,
                name: true,
                username: true,
                active: true,
            }
        })

        return teacherChange

    }
}

export { ChangeTeacherService }
