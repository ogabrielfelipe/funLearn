import { Request, Response } from "express";
import { FindTeamsService } from "../../service/team/FindTeamsService";




class FindTeamsController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teams'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar as turmas cadastradas.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Team']

        /*
            #swagger.parameters['name'] = {
                in: 'body',
                description: "Deverá ser preenchido com o nome da turma, função não diferencia Maiúsculo de Minúsculo e nem de Ordem de escrita (Like %_%).",
                schema: { $ref: "#/definitions/TeamFind" },
            }
         */

        const { name } = req.body;
        
        const findTeams = new FindTeamsService()
        const result = await findTeams.execute({
            name: name
        })

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/TeamsRes" },
            description: 'Busca realizada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { FindTeamsController }