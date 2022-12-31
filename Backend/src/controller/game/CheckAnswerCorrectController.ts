import { Request, Response } from "express";
import { CheckAnswerCorrectService } from "../../service/answer/CheckAnswerCorrectService";
import GameConfig from "../../../configGame.json"
import { CreatePositionGameService } from "../../service/game/CreatePositionGameService";
import { FinishedGameOverService } from "../../service/game/FinishedGameOverService";

import moment from "moment-timezone";


enum TypeFinish {
    GAMEOVER = "GAMEOVER",
    TIME = "TIME",
    FINISHED = "FINISHED",
}



class CheckAnswerCorrectController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/game/answer/check'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para Iniciar o QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['askID', 'answerID', 'positionID', 'attempt', 'tip', 'time'] = {
                in: 'body',
                description: " askID: Deverá ser preenchido com o identificador da pergunta; \n
                        answerID: Deverá ser preenchido com o identificador da resposta selecionada; \n
                        positionID: Deverá ser preenchido com o identificador do registro que iniciou o jogo; \n
                        attempt: Deverá ser preenchido com o número de tentativas que foi utilizada para responder; \n
                        tip: Deverá ser preenchido com o número de dicas que foram utilziadas; \n
                        time: Deverá ser preenchido com o tempo utilizado para responder a pergunta.",
                requerid: true,
                schema: { $ref: "#/definitions/CheckAnswer" }        
            }
         */


        const { 
            askID, 
            answerID, 
            positionID, 
            attempt, 
            tip,
            time
        } = req.body;

        let point: number = 0;



        const checkAnswer = new CheckAnswerCorrectService();
        const answer = await checkAnswer.execute({
            answerID: answerID,
            userRequest: req.user
        })

        if (!answer){
            throw new Error("Answer not found.");
        }


        const setupGame = GameConfig.level.filter((value) => {
            if (value.description == answer.ask.level){
                return value
            }
        })[0]


        let auxPointAnswer: number = 0;
        auxPointAnswer = setupGame.punctuation.filter((value) => {
            if (value.attempt === attempt){
                return value.point
            }
        })[0].point;


        let auxPointTip: number = 0;
        for (let i = 0; i < tip; i++){
            auxPointTip += setupGame["used-tip"];
        }


        if (!answer.correct){
            point = 0;
        }else{
            point = auxPointAnswer - auxPointTip;
        }
        


        const createPositionGame = new CreatePositionGameService();
        const positionGame = await createPositionGame.execute({
            answerID: answerID,
            askID: askID,
            positionID: positionID,
            attempt: attempt,
            point: point,
            right: answer.correct,
            time: time,
            tip: tip,
            userRequest: req.user
        })


        let finishedGame;
        if (attempt === GameConfig.game.life && !answer.correct){
            let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");
            const finishedGameOver = new FinishedGameOverService();
            finishedGame = await finishedGameOver.execute({
                dateFinished: DateTimePTBR.format(),
                finished: true,
                life: attempt,
                positionID: positionID,
                score: point,
                userRequest: req.user,
                typeFinish: "GAMEOVER" as TypeFinish
            });
        }


        /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno.\n ' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Registro salvo com sucesso.',
            schema: { $ref: "#/definitions/CheckAnswerRes" }   
        } */

        return res.status(200).json( attempt < GameConfig.game.life ? positionGame : { positionGame, finishedGame })


    }
}

export { CheckAnswerCorrectController }