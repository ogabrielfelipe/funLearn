import prismaClient from "../../prisma"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface AuthTeacherRequest{
    username: string,
    password: string
}


class AuthTeacherService{
    async execute( {username, password}: AuthTeacherRequest ){

        const teacher = await prismaClient.teacher.findFirst({
            where:{
                username: username
            }
        })

        if (!teacher){
            throw new Error("username incorrect.")
        }

        if (!teacher.active){
            throw new Error("user inative.")
        }

        const passMatch = await compare(password, teacher.password)

        if (!passMatch){
            throw new Error("Password incorrect.")
        }

        const token = sign(
            {
                name: teacher.name,
                type: "teacher"
            },
            process.env.SECRET!,
            {
                subject: teacher.id,
                expiresIn: '15d'
            }
        )

        return {
            id: teacher.id,
            name: teacher.name,
            username: teacher.username,
            active: teacher.active,
            token: token
        };
    }
}

export { AuthTeacherService }