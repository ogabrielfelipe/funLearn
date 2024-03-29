import { request, Request, Response } from "express";
import { CheckAnswerCorrectService } from "../../service/answer/CheckAnswerCorrectService";
import GameConfig from "../../../configGame.json";
import { CreatePositionGameService } from "../../service/game/[NOT USED]CreatePositionGameService";
import { FinishedGameOverService } from "../../service/game/FinishedGameOverService";

import moment from "moment-timezone";
import { ChangeGameByIDService } from "../../service/game/ChangeGameByIDService";
import { FindPositionService } from "../../service/game/FindPositionService";
import { RemoveLifeGameService } from "../../service/game/RemoveLifeGameService";

enum TypeFinish {
  GAMEOVER = "GAMEOVER",
  TIME = "TIME",
  FINISHED = "FINISHED",
}

class CheckAnswerCorrectController {
  async handle(req: Request, res: Response) {
    // #swagger.start

    // #swagger.path = '/game/answer/check'
    // #swagger.method = 'post'
    // #swagger.description = 'Endpoint para Iniciar o QUIZZ.'
    // #swagger.produces = ["application/json"]
    // #swagger.tags = ['Game']

    /*
            #swagger.parameters['askID', 'answerID', 'positionID', 'attempt', 'tip', 'time'] = {
                in: 'body',
                description: " answerID: Deverá ser preenchido com o identificador da resposta selecionada; \n
                        positionID: Deverá ser preenchido com o identificador do registro que iniciou o jogo; \n
                        attempt: Deverá ser preenchido com o número de tentativas do Jogador; \n
                        tip: Deverá ser preenchido com o número de dicas que foram utilziadas.",
                requerid: true,
                schema: { $ref: "#/definitions/CheckAnswer" }        
            }
         */

    const { gameID, answerID, positionID, attempt, tip } = req.body;

    console.log(gameID, answerID, positionID, attempt, tip);

    let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

    //Verificar o tempo que o aluno demorou para responder

    const findPositionByID = new FindPositionService();
    const position = await findPositionByID.execute(positionID);
    if (!position) {
      throw new Error("position not found.");
    }

    let finishedGame = {};
    if (
      moment.tz(position.dateFinalization, "America/Sao_Paulo") <
        DateTimePTBR &&
      position.recommence === true
    ) {
      const finishedGameOver = new FinishedGameOverService();
      finishedGame = await finishedGameOver.execute({
        dateFinished: DateTimePTBR.format(),
        finished: true,
        attempt: attempt,
        life: 0,
        positionID: position.id,
        score: 0,
        userRequest: req.user,
        typeFinish: "TIME" as TypeFinish,
      });
    }

    const checkAnswer = new CheckAnswerCorrectService();
    const answer = await checkAnswer.execute({
      answerID: answerID,
      userRequest: req.user,
    });

    if (!answer) {
      throw new Error("Answer not found.");
    }
    // Verifica se a resposta marcada pelo usuário é a correta
    let answerCorrectCheck: boolean = false;
    if (answer.correct) {
      answerCorrectCheck = true;
    }

    // Gerar a pontuação da resposta
    let pointAux: number = 0;

    // Busca as configurações de acordo com o nivel da pergunta
    const setupGame = GameConfig.level.filter((value) => {
      if (value.description == answer.ask.level) {
        return value;
      }
    })[0];

    //Filtra os pontos de acordo com a quantidade de tentativas que foram utilizadas
    let auxPointAnswer: number = 0;
    auxPointAnswer = setupGame.punctuation.filter((value) => {
      if (value.attempt === attempt) {
        return value.point;
      }
    })[0].point;

    //Calcula o total de pontos que deve ser tirado de acordo com o nivel da pergunta
    let auxPointTip: number = 0;
    for (let i = 0; i < tip; i++) {
      auxPointTip += setupGame["used-tip"];
    }

    if (answerCorrectCheck) {
      pointAux = auxPointAnswer - auxPointTip;
    }

    //Altera o cadastro do Game de acordo com as informações calculadas
    const changeGame = new ChangeGameByIDService();
    const changeGameResult = await changeGame.execute({
      gameID: gameID,
      answered: true,
      correct: answerCorrectCheck,
      point: pointAux,
      tip: tip,
      userRequest: req.user,
      dateFinalization: DateTimePTBR.format(),
    });

    let lifePosition = position.life as number;
    let removeLifeGame = {};

    if (lifePosition > 1 && !answer.correct) {
      const removeLife = new RemoveLifeGameService();
      removeLifeGame = await removeLife.execute({
        gameID: gameID,
        userRequest: req.user,
      });
    }

    if (lifePosition === 1 && !answer.correct) {
      const finishedGameOver = new FinishedGameOverService();
      finishedGame = await finishedGameOver.execute({
        dateFinished: DateTimePTBR.format(),
        life: 0,
        attempt: attempt,
        positionID: positionID,
        score: pointAux,
        userRequest: req.user,
        finished: true,
        typeFinish: "GAMEOVER" as TypeFinish,
      });
    }

    /* #swagger.responses[403] = { 
            description: 'Usuário da requisição não é um aluno.\n ' 
        } */

    /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
    /* #swagger.responses[200] = { 
            description: 'Registro salvo com sucesso. \nSe o jogo for finalizado irá retornar o exemplo abaixo, caso contrário, retorna vazio "{}".',
            schema: { $ref: "#/definitions/CheckAnswerRes" }   
        } */

    return res
      .status(200)
      .json({
        isCorrect: answerCorrectCheck,
        pointAsk: auxPointAnswer,
        changeGameResult,
        finishedGame,
        removeLifeGame,
      });
  }
}

export { CheckAnswerCorrectController };
