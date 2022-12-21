import { Request, Response } from "express";
import { StartGameService } from "../../service/game/StartGameService";

import moment from "moment-timezone";


// Observação: SOMENTE ALUNO PODERÁ ACESSAR ESSA API


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


        const startGame = new StartGameService();
        const result = await startGame.execute({
            studentID: studentID,
            dataInitial: DateTimePTBR.format(),
            themeID: themeID,
            userRequest: req.user
        })


            /* #swagger.responses[403] = { 
                description: 'Usuário da requisição não é um aluno.\n ' 
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

        return res.status(200).json(result);

    }
}

export { StartGameController }