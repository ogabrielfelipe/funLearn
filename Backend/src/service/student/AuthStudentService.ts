import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"


interface AuthstudentRequest{
    register: number,
    password: string
}

class AuthStudentService{
    async execute( {register, password}:AuthstudentRequest ){
        const student = await prismaClient.student.findUnique({
            where:{
                register: register
            }
        })

        if (!student){
            throw new Error("register incorrect.")
        }

        if (!student.active){
            throw new Error("student inative.")
        }

        const passMatch = await compare(password, student.password)

        if (!passMatch){
            throw new Error("Password incorrect.")
        }
        const token = sign(
            {
                name: student.name,
                type: "student"
            },
            process.env.SECRET!,
            {
                subject: student.id,
                expiresIn: '15d'
            }
        )

        return {
            id: student.id,
            name: student.name,
            register: student.register,
            active: student.active,
            token: token
        };

    }
}

export { AuthStudentService }