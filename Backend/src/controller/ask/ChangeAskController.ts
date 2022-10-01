import { Request, Response } from "express";
import { ChangeAskService } from "../../service/ask/ChangeAskService";



class ChangeAskController{
    async handle(req: Request, res: Response) {

        // #swagger.start

        // #swagger.path = '/ask'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para Alterar o cadastro pergunta. Essa alteração só ocorre para os campos question e active, os demais são alterados individualmente.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['askID', 'question', 'active'] = {
                in: 'body',
                description: "askID: Deverá ser informado com o identificador da pergunta; \n 
                    question: Deverá ser preenchido com enunciado da pergunta; \n
                    active: Deverá ser preenchido com o status da pergunta, se está ativa ou não.",
                schema: { $ref: "#/definitions/AskChange" },
            }
         */

        const { askID, question, active } = req.body;

        const changeAsk = new ChangeAskService();
        const result = await changeAsk.execute({
            id: askID,
            question: question,
            active: active
        })


        /* #swagger.responses[403] = { 
            description: 'Número de alternativas diferente de 4.\nDeve haver uma resposta correta.\nPergunta possui mais de uma alternativa correta.' 
        } */

        /* #swagger.responses[404] = { 
            description: 'Pergunta não encontrada.\nNão foi identificado uma resposta correta para a pergunta.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = {
            schema: { $ref: "#/definitions/AskResp" }, 
            description: 'Pergunta alterada com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
    }
}

export { ChangeAskController }