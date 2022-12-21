import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface PayLoad{
    sub: string,
    type: string
}

class AuthSessionStudentController{
    async handle(req: Request, res: Response){

         // #swagger.start

        // #swagger.path = '/student/auth/session'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para autenticar o usuário estudante.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Student']

        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(404).json({msg: "Token not found"}).end();
          }
        const [, token] = authToken.split(" ");
        const { sub, type} = verify(token, process.env.SECRET!) as PayLoad;

        console.log(sub, type);
        
        const prisma = new PrismaClient();
        const admin = await prisma.student.findUnique({
            where: {
                id: sub
            }
        })
        if (!admin) {
            return res.status(404).json({msg: "student not found"}).end(); 
        }

        // #swagger.responses[404] = { description: 'Estudante não encontrado. \nToken não encontrado.'  }

        return res.status(200).json("Ok");// #swagger.responses[200] = { description: 'Ok'  }
    }
}

export { AuthSessionStudentController }