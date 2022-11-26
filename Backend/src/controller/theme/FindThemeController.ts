import { Request, Response } from "express";
import { FindThemeService } from "../../service/theme/FindThemeService";



class FindThemeController{
    async handle(req: Request, res: Response){
        const themeID = req.params.themeID as string;

        const findTheme = new FindThemeService();
        const result = await findTheme.execute(themeID);
    
        return res.status(200).json(result);
    }
}

export { FindThemeController }