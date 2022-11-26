import { Request, Response } from "express";
import { CreateThemeService } from "../../service/theme/CreateThemeService";



class CreateThemeController{
    async handle(req: Request, res: Response){
        const { name, description, teacherID, teams } = req.body


        const createTheme = new CreateThemeService();
        const result = await createTheme.execute({
            name: name,
            description: description,
            teacherID: teacherID,
            teams:teams
        })
        console.log(result);
        return res.status(200).json(result)
    }
}

export { CreateThemeController }