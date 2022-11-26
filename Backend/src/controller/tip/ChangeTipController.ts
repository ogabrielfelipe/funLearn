import { Request, Response } from "express";
import { ChangeTipService } from "../../service/tip/ChangeTipService";



class ChangeTipController{
    async handle(req: Request, res: Response){
        const { id, name, visible } = req.body;

        const changeTip = new ChangeTipService();
        const result = await changeTip.execute({
            id: id,
            name: name,
            visible: visible
        })

        return res.status(200).json(result);
    }
}

export { ChangeTipController }