import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"


interface AuthAdministratorRequest{
    username: string,
    password: string
}

class AuthAdministratorService{
    async execute({ username, password }: AuthAdministratorRequest ){

        const admin = await prismaClient.administrator.findFirst({
            where:{
                username: username
            }
        })

        if(!admin){
            throw new Error('username incorrect.')
        }

        if(!admin.active){
            throw new Error('user inative.')
        }

        const passMatch = await compare(password, admin.password)

        if (!passMatch){
            throw new Error("Password incorrect.")
        }

        const token = sign(
            {
                name: admin.name,
                type: "administrator"
            },
            process.env.SECRET!,
            {
                subject: admin.id,
                expiresIn: '1h'
            }
        )

        return {
            id: admin.id,
            name: admin.name,
            username: admin.username,
            active: admin.active,
            token: token
        }
    }
}

export { AuthAdministratorService }