import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

interface AdministratorRequest{
    id: string
    name: string,
    password: string,
    active: boolean
}

class ChangeAdministratorService{
    async execute( {id, name, password, active}: AdministratorRequest ){

        const admin = await prismaClient.administrator.findFirst({
            where:{
                id: id
            }
        })

        if (!admin){
            throw new Error("admin not found.")
        }

        var passwordHash = '';

        if(password != null){
            passwordHash = await hash(password, 8)
        }

        const adminChange = await prismaClient.administrator.update({
            where:{
                id: id
            },
            data:{
                name: name != "" ? name : admin.name,
                active: active != null ? active : admin.active,
                password: password != "" ? passwordHash: admin.password
            },
            select:{
                id: true,
                name: true,
                username: true,
                active: true
            }
        })

        return adminChange
    }
}

export { ChangeAdministratorService }