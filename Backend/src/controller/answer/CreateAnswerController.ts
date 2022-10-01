import { Request, Response } from "express";
import { CreateAnswerService } from "../../service/answer/CreateAnswerService";


class CreateAnswerController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/answer'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar uma resposta para a pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Answer']

        /*
            #swagger.parameters['answerID', 'description', 'correct'] = {
                in: 'body',
                description: "askID: Deverá ser informado com o identificador da pergunta; \n 
                    description: Deverá ser preenchido com a descrição da resposta; \n
                    correct: Deverá ser preenchido com o tipo da resposta se é correta ou não.",
                schema: { $ref: "#/definitions/Answer" },
            }
         */

        const { description, correct, askID } = req.body;

        const createAnswer = new CreateAnswerService();
        const result = await createAnswer.execute({
            description: description,
            correct: correct,
            askID: askID
        })

        /* #swagger.responses[403] = { 
            description: 'Número de alternativas diferente de 4.\nDeve haver uma resposta correta.\nTipo do campo description incorreto.\nTipo do campo correct incorreto.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = {
            schema: { $ref: "#/definitions/AnswerChangeRes" }, 
            description: 'Resposta criada com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end

    }
}

export { CreateAnswerController }