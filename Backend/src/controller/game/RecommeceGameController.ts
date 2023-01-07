import { Request, Response } from "express";
import { RecommenceGameService } from "../../service/game/RecommenceGameService";

import moment from "moment-timezone";
import GameConfig from "../../../configGame.json"

class RecommenceGameController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/recommence/start/:positionID'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para recomeçar o QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['positionID'] = {
                in: 'path',
                description: " positionID: Deverá ser preenchido com o identificador do inicio do QUIZZ.",
                requerid: true      
            }
         */

        const positionID = req.params.positionID;

        let date = new Date();
        let DateTimePTBR = moment.tz(date, "America/Sao_Paulo");
        let DateTimeFinalizationPTBR = moment.tz(date.setMinutes(date.getMinutes() + GameConfig.game.timeMax), "America/Sao_Paulo");
        
        const recomeceGame = new RecommenceGameService();
        const result = await recomeceGame.execute({
            positionID: positionID,
            userRequest: req.user,
            dateRecommence: DateTimePTBR.format(),
            dateFinalizationRecommence: DateTimeFinalizationPTBR.format()
        })

        /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno. ' 
        } */

        /* #swagger.responses[404] = { 
            description: 'Posição não encontrada. \nToken não encontrado. \n ' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Reabertura do QUIZZ cadastrada com sucesso.',
            schema: { $ref: "#/definitions/ReaberturaRes" }   
        } */

        return res.status(200).json(result);
    }
}

export { RecommenceGameController }