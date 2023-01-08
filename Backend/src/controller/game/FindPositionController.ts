import { Request, Response } from "express";
import { FindPositionService } from "../../service/game/FindPositionService";



class FindPositionController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/find/position/:positionID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar detalhes da position.'
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


        const findPosition = new FindPositionService();
        const result = await findPosition.execute(positionID);




        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindPositionRes" }   
        } */

        return res.status(200).json(result);

        
    }
}

export { FindPositionController }