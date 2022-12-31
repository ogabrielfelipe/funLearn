import { Request, Response } from "express";
import { RemoveLifeGameService } from "../../service/game/RemoveLifeGameService";



class RemoveLifeGameController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/removeLife/:positionID'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para remover ou finalizar, caso não tenha mais vida.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['positionID'] = {
                in: 'path',
                description: " positionID: Deverá ser preenchido com o identificador do jogo.",
                requerid: true,
                schema: { $ref: "#/definitions/CheckAnswer" }        
            }
         */


        const positionID = req.params.positionID as string;

        const removeLifeGame = new RemoveLifeGameService();
        const result = await removeLifeGame.execute({
            positionID: positionID,
            userRequest: req.user
        })


        /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno.\n ' 
        } */

        /* #swagger.responses[404] = { 
            description: 'Jogo não encontrado.\nToken não encontrado ' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Vida removida com sucesso ou jogo finalizado.',
            schema: { $ref: "#/definitions/RemoveLifeRes" }   
        } */


        return res.status(200).json(result);

    }
}

export { RemoveLifeGameController }