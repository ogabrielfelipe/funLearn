import { Request, Response } from "express";
import { CreateTipService } from "../../service/tip/CreateTipService";



class CreateTipController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/tip'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar uma dica para uma pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Tip']

        /*
            #swagger.parameters['name', 'askID', 'visible'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com a descrição da dica; \n
                    askID: Deverá ser preenchido com o identificador da pergunta; \n
                    visible: Deverá ser preenchido informando se a dica está visível ou não (true ou falso).",
                requerid: true,
                schema: { $ref: "#/definitions/CreateTip" }        
            }
         */


        const { askID, name, visible } = req.body;

        const createTip = new CreateTipService();
        const result = await createTip.execute({
            askID: askID,
            name: name,
            visible: visible
        })

        /* #swagger.responses[404] = { 
            description: 'Pergunta não encontrada. \nToken não encontrado.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/CreateTipRes" },
            description: 'Dica cadastrada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { CreateTipController }