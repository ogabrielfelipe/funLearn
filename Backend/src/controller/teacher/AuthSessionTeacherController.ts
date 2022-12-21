import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string,
    type: string
}


class AuthSessionTeacherController{
    async handle(req: Request, res: Response){
        
        // #swagger.start

        // #swagger.path = '/teacher/auth/session'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para autenticar o usuário professor.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']
        
        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(404).json({msg: "Token not found"}).end();
          }
        const [, token] = authToken.split(" ");
        const { sub, type} = verify(token, process.env.SECRET!) as PayLoad;

        console.log(sub, type);
        
        const prisma = new PrismaClient();
        const admin = await prisma.teacher.findUnique({
            where: {
                id: sub
            }
        })
        if (!admin) {
            return res.status(404).json({msg: "teacher not found"}).end();
        }

        // #swagger.responses[404] = { description: 'Professor não encontrado. \nToken não encontrado.'  }

        return res.status(200).json("Ok"); // #swagger.responses[200] = { description: 'Ok.'  }
    }   
}

export { AuthSessionTeacherController }