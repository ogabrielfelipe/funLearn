import { Request, Response } from "express";
import { FindTeamService } from "../../service/team/FindTeamService";



class FindTeamController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/team'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar detalhes do cadastro da turma.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Team']

        /*
            #swagger.parameters['teamID'] = {
                in: 'query',
                description: "Deverá ser preenchido com o identificador da turma que deseja realizar a busca."
            }
         */

        const teamID = req.query['teamID'] as string

        const findTeam = new FindTeamService();
        const result = await findTeam.execute(teamID)

        /* #swagger.responses[401] = { 
            description: 'É necessário informar uma turma.' 
        } */
        /* #swagger.responses[404] = { 
            description: 'Turma não encontrada.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/TeamRes" },
            description: 'Busca realizada com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
    }
}

export { FindTeamController }