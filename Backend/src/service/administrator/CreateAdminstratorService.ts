import prisma from "../../prisma";
import { hash } from 'bcryptjs';

interface AdminRequest{
    name: string;
    username: string;
    password: string;
}

class CreateAdministratorService{
    async execute( {name, username, password}: AdminRequest ) {

        if (!password){
            throw new Error("password invalid")
        }

        const passwordHash = await hash(password, 8)

        const createAdmin = await prisma.administrator.create({
            data:{
                name: name,
                username: username,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                username: true
            }
        })
        return createAdmin
    }
}

export { CreateAdministratorService }