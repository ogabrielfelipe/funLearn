import { Request, Response } from "express";
import { FindAskService } from "../../service/ask/FindAskService";



class FindAskController{
    async handle (req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/ask'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para dedtalhar o cadastro da pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['askID'] = {
                in: 'query',
                description: " Deverá informar o identificador da pergunta que deseja detalhar."
            }
         */

        const askID = req.query['askID'] as string

        const findAsk = new FindAskService();
        const result = await findAsk.execute(askID)


        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AskResp" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)
        // #swagger.end
    }
}

export { FindAskController }