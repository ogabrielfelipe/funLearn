import { Request, Response } from "express"
import { ConnectTeamService } from "../../service/theme/ConnectTeamService";



class ConnectTeamController{
    async handle(req: Request, res: Response){
        const { teamID, themeID, visible } = req.body;
        console.log(teamID, themeID, visible)

        const connectTeam = new ConnectTeamService();
        const result = await connectTeam.execute({
            teamID: teamID,
            themeID: themeID,
            visible: visible
        })
        return res.status(200).json(result);
    }
}

export { ConnectTeamController }