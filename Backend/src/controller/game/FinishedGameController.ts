import { Request, Response } from "express";
import moment from "moment-timezone";
import { FinishedGameOverService } from "../../service/game/FinishedGameOverService";



enum TypeFinish {
    GAMEOVER = "GAMEOVER",
    TIME = "TIME",
    FINISHED = "FINISHED",
}

class FinishedGameController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/finish'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para Finalizar o QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['positionID', 'typeFinish', 'attempt'] = {
                in: 'body',
                description: " positionID: Deverá ser preenchido com o identificador do jogo; \n
                        typeFinish: Deverá ser preenchido com o tipo de finalização; \n
                        positionID: Deverá ser preenchido com o identificador do registro que iniciou o jogo.",
                requerid: true,
                schema: { $ref: "#/definitions/FinishGame" }        
            }
         */

        const {positionID, typeFinish, attempt } = req.body;
        let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

        const finishedGame = new FinishedGameOverService();
        const result = await finishedGame.execute({
            userRequest: req.user,
            dateFinished: DateTimePTBR.format(),
            typeFinish: typeFinish as TypeFinish,
            finished: true,
            life: attempt,
            positionID: positionID,
            score: 0
        })


        /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno.\n ' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Jogo Finalizado com sucesso.',
            schema: { $ref: "#/definitions/FinishGameRes" }   
        } */

        return res.status(200).json(result);

    }
}

export { FinishedGameController }