import { Request, Response } from "express";
import { ChangeAnswerService } from "../../service/answer/ChangeAnswerService";



class ChangeAnswerController{
   async handle(req: Request, res: Response) {

        // #swagger.start

        // #swagger.path = '/answer'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para Alterar o cadastro da resposta da pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Answer']

        /*
            #swagger.parameters['answerID', 'description', 'correct'] = {
                in: 'body',
                description: "answerID: Deverá ser informado com o identificador da resposta; \n 
                    description: Deverá ser preenchido com a descrição da resposta; \n
                    correct: Deverá ser preenchido com o tipo da resposta se é correta ou não.",
                schema: { $ref: "#/definitions/AnswerChange" },
            }
         */

        const {description, correct, answerID} = req.body;

        const changeAnswer = new ChangeAnswerService();
        const result = await changeAnswer.execute({
            answerID: answerID,
            correct: correct,
            description: description
        })

        /* #swagger.responses[401] = { 
            description: 'Já existe uma alteranativa correta para a pergunta vinculada.' 
        } */
        /* #swagger.responses[404] = { 
            description: 'Resposta não encontrada.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = {
            schema: { $ref: "#/definitions/AnswerChangeRes" }, 
            description: 'Resposta alterada com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
   }
}


export { ChangeAnswerController }