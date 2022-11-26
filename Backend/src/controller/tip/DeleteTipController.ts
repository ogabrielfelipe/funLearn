import { Request, Response } from "express";
import { DeleteTipService } from "../../service/tip/DeleteTipService";



class DeleteTipController{
    async handle(req: Request, res: Response){
        const id = req.query['id'] as string;

        const deleteTip = new DeleteTipService()
        const result = await deleteTip.execute(id)
        
        return res.status(200).json(result)
    }
}

export { DeleteTipController }