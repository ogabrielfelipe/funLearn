import { Request, Response } from "express";
import { FindAsksByPositionService } from "../../service/game/FindAsksByPositionService";



class FindAsksByPositionController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/find/askByPosition/:positionID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar todas as perguntas vinculadas ao tema e o estudante.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['positionID'] = {
                in: 'path',
                description: " positionID: Deverá ser preenchido com o identificador do inicio do game (ID da tabela Position).",
                requerid: true    
            }
         */

        const positionID = req.params.positionID;


        const findAskByPosition = new FindAsksByPositionService();
        const result = await findAskByPosition.execute({
            positionID: positionID,
            userRequest: req.user
        })

        /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno.\n ' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindAsksByPositionRes" }   
        } */

        return res.status(200).json(result);
    }
}

export { FindAsksByPositionController }