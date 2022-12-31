import { Request, Response } from "express"
import { DisconnectTeamService } from "../../service/theme/DisconnectTeamService";



class DisconnectTeamController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/theme/disconnectTeam'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para desvincular a turma do tema proposto.'
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
        
        const disconnectTeam = new DisconnectTeamService()
        const result = await disconnectTeam.execute({
            teamID: teamID,
            themeID: themeID,
            visible: visible
        })


        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ConnectTeamRes" },
            description: 'Turma desvinculada do tema com sucesso.' 
        } */

        return res.status(200).json(result);

    }
}

export { DisconnectTeamController }