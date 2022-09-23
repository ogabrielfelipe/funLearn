import prismaClient from '../../prisma/index'
import { hash } from 'bcryptjs';

interface TeacherRequest{
    name: string,
    username: string,
    password: string,
    active: boolean
}

class CreateTeacherService{
    async execute( { name, username, password, active }:TeacherRequest ){

        if (!password){
            throw new Error("password invalid")
        }

        const passwordHash = await hash(password, 8)

        
        const create = prismaClient.teacher.create({
            data:{
                name: name,
                username: username,
                password: passwordHash,
                active: active
            },
            select: {
                id: true,
                name: true,
                username: true,
                active: true
            }
        })
        return create

    }
}

export { CreateTeacherService }