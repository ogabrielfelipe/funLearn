import { Request, Response } from "express";
import { CreateTeamService } from "../../service/team/CreateTeamService";



class CreateTeamController{
    async handle(req: Request, res: Response){
        const { name, active, teacherID } = req.body;

        const createTeam = new CreateTeamService();
        const result = await createTeam.execute({
            name: name,
            active: active,
            teacherID: teacherID
        })

        return res.status(200).json(result)

    }
}

export { CreateTeamController }