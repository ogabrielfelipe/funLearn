import { Request, Response } from "express";
import { CreateTipService } from "../../service/tip/CreateTipService";



class CreateTipController{
    async handle(req: Request, res: Response){
        const { askID, name, visible } = req.body;

        const createTip = new CreateTipService();
        const result = await createTip.execute({
            askID: askID,
            name: name,
            visible: visible
        })

        return res.status(200).json(result)
    }
}

export { CreateTipController }