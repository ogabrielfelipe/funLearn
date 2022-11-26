import { Request, Response } from "express";
import { FindThemesService } from "../../service/theme/FindThemesService";



class FindThemesController{
    async handle(req: Request, res: Response){
        const { name } = req.body;

        const findTheme = new FindThemesService()
        const result = await findTheme.execute({
            name: name,
            user: req.user
        })

        return res.status(200).json(result)
    }
}

export { FindThemesController }