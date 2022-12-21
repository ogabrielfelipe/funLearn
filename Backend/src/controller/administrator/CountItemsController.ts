import { Request, Response } from "express";
import { CountItemsService } from "../../service/administrator/CountItemsService";



class CountItemsController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/administrator/countItems'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar os totais de registros no banco de dados.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']


        const countService = new CountItemsService();
        const result = await countService.execute();

        

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/countItems" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result);
    }
}

export { CountItemsController }