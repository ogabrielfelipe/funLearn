import { Request, Response } from "express"
import { ConnectTeamService } from "../../service/theme/ConnectTeamService";



class ConnectTeamController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/theme/connectTeam'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para vincular uma turma no tema proposto.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Theme']

        /*
            #swagger.parameters[ 'teamID', 'themeID', 'visible'] = {
                in: 'body',
                description: " teamID: Deverá ser preenchido com o identificador da turma; \n 
                    themeID: Deverá ser preenchido com o identificador do tema; \n
                    visible: Deverá ser preenchido com a situação de visualização do tema (true: Visível, false: Invisível).",
                requerid: true,
                schema: { $ref: "#/definitions/ConnectTeam" }        
            }
         */

        const { teamID, themeID, visible } = req.body;

        const connectTeam = new ConnectTeamService();
        const result = await connectTeam.execute({
            teamID: teamID,
            themeID: themeID,
            visible: visible
        })

         /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ConnectTeamRes" },
            description: 'Turma vinculada com tema com sucesso.' 
        } */


        return res.status(200).json(result);
    }
}

export { ConnectTeamController }