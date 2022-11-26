import { Request, response, Response } from "express";
import { ChangeThemeService } from "../../service/theme/ChangeThemesService";



class ChangeThemeController{
    async handle(req: Request, res: Response){
        const { id, name, description, teacherID, active } = req.body;

        const changeTheme = new ChangeThemeService();
        const result = await changeTheme.execute({
            id: id,
            name: name,
            description: description,
            teacherID: teacherID,
            active: active
        })

        return res.status(200).json(result)
    }
}

export { ChangeThemeController }