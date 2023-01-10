import { Request, Response } from "express";
import { FindClassificationByStudentService } from "../../service/game/FindClassificationByStudentService";



class FindClassificationByTeamController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/find/classification/:teamID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para calcular e exibir a classificação os alunos por turma.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['teamID'] = {
                in: 'path',
                description: " teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true    
            }
         */

        const teamID = req.params.teamID;

        const findClassification = new FindClassificationByStudentService();
        const result = await findClassification.execute(teamID)


        return res.status(200).json(result);
    }
}

export { FindClassificationByTeamController }