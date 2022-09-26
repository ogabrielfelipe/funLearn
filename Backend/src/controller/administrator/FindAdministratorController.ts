import { Request, Response } from "express";
import { FindAdministratorService } from "../../service/administrator/FindAdministratorService";



class FindAdministratorController{
    async handle(req: Request, res: Response){
        const adminID = req.query['adminID'] as string;
        const user = req.user;

        const findAdmin = new FindAdministratorService()
        const result = await findAdmin.execute({
            adminID: adminID,
            user: user
        })

        return res.status(200).json(result)
    }
}

export { FindAdministratorController }