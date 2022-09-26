import { Request, response, Response } from "express";
import { FindManyAdministratorService } from "../../service/administrator/FindManyAdministratorService";



class FindManyAdministratorController{
    async handle(req: Request, res: Response){
        const { name } = req.body;
        const user = req.user;

        const findManyAdmin = new FindManyAdministratorService()
        const result = await findManyAdmin.execute({
            name: name,
            user: user
        })

        return res.status(200).json(result)
    }
}

export { FindManyAdministratorController }