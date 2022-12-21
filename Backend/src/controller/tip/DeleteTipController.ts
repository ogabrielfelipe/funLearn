import { Request, Response } from "express";
import { DeleteTipService } from "../../service/tip/DeleteTipService";



class DeleteTipController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/tip'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para excluir o cadastro da dica.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Tip']

        /*
            #swagger.parameters['id'] = {
                in: 'query',
                description: " id: Deverá ser preenchido com identificador da dica.",
                requerid: true,
                schema: { $ref: "#/definitions/CreateTip" }        
            }
         */

        const id = req.query['id'] as string;

        const deleteTip = new DeleteTipService()
        const result = await deleteTip.execute(id)


        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            description: 'Dica excluida com sucesso.' 
        } */

        
        return res.status(200).json(result)
    }
}

export { DeleteTipController }