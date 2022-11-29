import { Request, Response } from "express";
import { CountItemsService } from "../../service/administrator/CountItemsService";



class CountItemsController{
    async handle(req: Request, res: Response){
        const countService = new CountItemsService();
        const result = await countService.execute();

        return res.status(200).json(result);
    }
}

export { CountItemsController }