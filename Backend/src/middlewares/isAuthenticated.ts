import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}


export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // #swagger.start

  // #swagger.description = 'Middleware para autenticação do usuário'
  //Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(404).json({msg: "Token not found"}).end(); // #swagger.responses[404] = { description: 'Token não encontrado'  }
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.SECRET!) as PayLoad;

    //Recuperar o id do token, foi necessario criar a pasta @types e alterar o tsconfig.json "typeRoots" do module "commonjs"
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({msg: "Token is invalid"}).end(); // #swagger.responses[401] = { description: 'Não autorizado.'  }
  }
}
