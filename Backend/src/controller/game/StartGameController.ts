import { Request, Response } from "express";
import { StartGameService } from "../../service/game/StartGameService";

import moment from "moment-timezone";
import GameConfig from "../../../configGame.json"
import { FindAskSortedByThemeService } from "../../service/ask/FindAskSortedByThemeService";
import { CreateGameByAskAndPositionService } from "../../service/game/CreateGameByAskAndPositionService";


// Observação: SOMENTE ALUNO PODERÁ ACESSAR ESSA API

enum Level {
    INITIAL = "INITIAL",
    INTERMEDIARY = "INTERMEDIARY",
    ADVANCED = "ADVANCED",
}

class StartGameController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/start'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para Iniciar o QUIZZ.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']

        /*
            #swagger.parameters['themeID', 'studentID'] = {
                in: 'body',
                description: " themeID: Deverá ser preenchido com o identificador do tema proposto; \n
                    studentID: Deverá ser preenchido com o identificador do aluno que iniciará o jogo.",
                requerid: true,
                schema: { $ref: "#/definitions/StartGame" }        
            }
         */

        const { themeID, studentID } = req.body;
        
        let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");
        let date = new Date();
        let DateTimeFinalizationPTBR = moment.tz(date.setMinutes(date.getMinutes() + GameConfig.game.timeMax), "America/Sao_Paulo");
        const startGame = new StartGameService();
        const startPosition = await startGame.execute({
            studentID: studentID,
            themeID: themeID,
            dataInitial: DateTimePTBR.format(),
            dateFinalization: DateTimeFinalizationPTBR.format(),
            userRequest: req.user,
            score: GameConfig.game.scoreMin,
            life: GameConfig.game.life,
        })


        const findAskByTheme = new FindAskSortedByThemeService()
        let listAsks = Array()
        for (var level in GameConfig.level) {
            var asks = await findAskByTheme.execute({
                themeID: themeID,
                level: GameConfig.level[level].description as Level,
                quantity: GameConfig.level[level].quantityAsks
            })

            listAsks.push( { asks: asks } )

        }

       
        const createGameByAskAndPosition = new CreateGameByAskAndPositionService()
        let listAsksByGame = Array()
        for (let i = 0; i < listAsks.length; i++) {
            for (let x = 0; x < listAsks[i].asks.length; x++) {
                var games = await createGameByAskAndPosition.execute({
                    answered: false,
                    attempt: 0,
                    correct: false,
                    point: 0,
                    tip: 0,
                    dateCreated: DateTimePTBR.format(),
                    dateFinalization: null,
                    askID: listAsks[i].asks[x].id,
                    positionID: startPosition.id
                })

                listAsksByGame.push(games.id)
            }
            
        }



            /* #swagger.responses[403] = { 
                description: 'Usuário da requisição não é um aluno.\n Aluno já possui registro. ' 
            } */

            /* #swagger.responses[404] = { 
                description: 'Tema não encontrado. \nEstudante não encontrado. \n ' 
            } */


            /* #swagger.responses[500] = { 
                description: 'Relacionado a erro de persistência no banco de dados.'

            } */
            /* #swagger.responses[200] = { 
                description: 'Abertura do QUIZZ cadastrada com sucesso.',
                schema: { $ref: "#/definitions/StartGameRes" }   
            } */

        return res.status(200).json({ "initialDatas": startPosition, "ListAsks": listAsksByGame});

    }
}

export { StartGameController }