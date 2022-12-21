import { Request, Response } from "express";
import { ChangeTipService } from "../../service/tip/ChangeTipService";



class ChangeTipController{
    async handle(req: Request, res: Response){
        
        // #swagger.start

        // #swagger.path = '/tip'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro de uma dica.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Tip']

        /*
            #swagger.parameters['name', 'id', 'visible'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com a descrição da dica; \n
                    id: Deverá ser preenchido com o identificador da dica; \n
                    visible: Deverá ser preenchido informando se a dica está visível ou não (true ou falso).",
                requerid: true,
                schema: { $ref: "#/definitions/ChangeTip" }        
            }
         */
        
        const { id, name, visible } = req.body;

        const changeTip = new ChangeTipService();
        const result = await changeTip.execute({
            id: id,
            name: name,
            visible: visible
        })


        /* #swagger.responses[404] = { 
            description: 'Dica não encontrada.  \nToken não encontrado.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ChangeTipRes" },
            description: 'Dica alterada com sucesso.' 
        } */


        return res.status(200).json(result);
    }
}

export { ChangeTipController }