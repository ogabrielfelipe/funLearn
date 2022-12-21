import { Request, Response } from "express";
import { ObjectMapper } from "jackson-js";
import { CreateAskService } from "../../service/ask/CreateAskService";



class CreateAskController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/ask'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar uma nova pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['question', 'active', 'image', 'level', 'answer'] = {
                in: 'body',
                description: " question: Deverá ser preenchido com enunciado da pergunta; \n
                    active: Deverá ser preenchido com o status da pergunta, se está ativa ou não; \n
                    image: Deverá ser informado uma imagem, para ilustrar (Não é obrigatório); \n
                    level: Deverá ser informado o nível da pergunta, podendo ser Iniciante, Intermediária ou avançada; \n
                    answer: Deverá ser preenchido com uma lista de 4 perguntas, sendo uma delas verdadeira e o restante falsas.,
                    answer: Deverá ser preenchido com uma lista contendo as dicas.",
                schema: { $ref: "#/definitions/Ask" }        
            }
         */

        const { question,
            active,
            level,
            answer,
            tip,
            themeID
        } = req.body

        const image = req.file
        let answerConverter = JSON.parse(answer)
        let tipConverter = JSON.parse(tip)

        console.log(question,
            active,
            level,
            answer,
            tip,
            themeID)

        const createAskService = new CreateAskService();
        const result = await createAskService.execute({
            question: question,
            level: level,
            image: image?.filename,
            active: Boolean(active),
            answer: answerConverter,
            tip: tipConverter,
            themeID: themeID
        })
         /* #swagger.responses[403] = { 
            description: 'Número de alternativas diferente de 4.\nDeve haver uma resposta correta.\nTipo do campo description incorreto.\nTipo do campo correct incorreto.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AskResp" },
            description: 'Pergunta cadastrada com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
    }
}

export { CreateAskController }