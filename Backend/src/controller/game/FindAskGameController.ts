import { Request, Response } from "express";
import { FindAskGameService } from "../../service/ask/FindAskGameService";



class FindAskGameController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/game/ask/find/:askID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar uma pergunta do QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['askID'] = {
                in: 'params',
                description: " askID: Deverá ser preenchido com o identificador da pergunta proposto.",
                requerid: true    
            }
         */


        const askID = req.params.askID;

        const findAsk = new FindAskGameService();
        const result = await findAsk.execute({
            askID: askID,
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
                schema: { $ref: "#/definitions/FindAskGameRes" }   
            } */


        return res.status(200).json(result);

    }
}

export { FindAskGameController }