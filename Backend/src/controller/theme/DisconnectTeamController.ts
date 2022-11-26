import { Request, Response } from "express"
import { DisconnectTeamService } from "../../service/theme/DisconnectTeamService";



class DisconnectTeamController{
    async handle(req: Request, res: Response){
        const { teamID, themeID } = req.body;
        
        const disconnectTeam = new DisconnectTeamService()
        const result = await disconnectTeam.execute({
            teamID: teamID,
            themeID: themeID
        })

        return res.status(200).json(result);

    }
}

export { DisconnectTeamController }