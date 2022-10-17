import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface PayLoad{
    sub: string,
    type: string
}


class AuthSessionAdministratorController{
    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(404).json({msg: "Token not found"}).end(); // #swagger.responses[404] = { description: 'Token não encontrado'  }
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

        return res.status(200).json("Ok");
    }
}

export { AuthSessionAdministratorController }