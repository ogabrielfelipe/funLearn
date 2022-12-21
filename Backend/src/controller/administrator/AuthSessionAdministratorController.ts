import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface PayLoad{
    sub: string,
    type: string
}


class AuthSessionAdministratorController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/administrator/auth/session'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para autenticar o usuário administrador.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']

        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(404).json({msg: "Token not found"}).end();
          }
        const [, token] = authToken.split(" ");
        const { sub, type} = verify(token, process.env.SECRET!) as PayLoad;

        console.log(sub, type);
        
        const prisma = new PrismaClient();
        const admin = await prisma.administrator.findUnique({
            where: {
                id: sub
            }
        })
        if (!admin) {
            return res.status(404).json({msg: "admin not found"}).end();
        }
        // #swagger.responses[404] = { description: 'Administrador não encontrado. \nToken não encontrado.'  }

        return res.status(200).json("Ok"); // #swagger.responses[200] = { description: 'Ok.'  }
    }
}

export { AuthSessionAdministratorController }