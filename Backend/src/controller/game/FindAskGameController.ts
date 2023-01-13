import { Request, Response } from "express";
import moment from "moment-timezone";
import { FindAskGameService } from "../../service/ask/FindAskGameService";



class FindAskGameController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/game/find/ask/:askID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar uma pergunta do QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['askID'] = {
                in: 'path',
                description: " askID: Deverá ser preenchido com o identificador da pergunta proposto.",
                requerid: true    
            }
            #swagger.parameters['gameID'] = {
                in: 'path',
                description: " gameID: Deverá ser preenchido com o identificador da game segundo a pergunta.",
                requerid: true    
            }
         */


        const askID = req.params.askID;
        const gameID = req.params.gameID;

        let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

        const findAsk = new FindAskGameService();
        const result = await findAsk.execute({
            askID: askID,
            gameID: gameID,
            dateVisualized: DateTimePTBR.format(),
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