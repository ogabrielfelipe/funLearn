import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"


interface AuthStudantRequest{
    register: number,
    password: string
}

class AuthStudantService{
    async execute( {register, password}:AuthStudantRequest ){
        const studant = await prismaClient.studant.findUnique({
            where:{
                register: register
            }
        })

        if (!studant){
            throw new Error("register incorrect.")
        }

        if (!studant.active){
            throw new Error("studant inative.")
        }

        const passMatch = await compare(password, studant.password)

        if (!passMatch){
            throw new Error("Password incorrect.")
        }
        const token = sign(
            {
                name: studant.name,
                type: "studant"
            },
            process.env.SECRET!,
            {
                subject: studant.id,
                expiresIn: '15d'
            }
        )

        return {
            id: studant.id,
            name: studant.name,
            register: studant.register,
            active: studant.active,
            token: token
        };

    }
}

export { AuthStudantService }