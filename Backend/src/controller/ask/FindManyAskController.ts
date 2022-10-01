import { Request, Response } from "express";
import { FindManyAskService } from "../../service/ask/FindManyAskService";



class FindManyAskController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/ask'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar todas as perguntas cadastradas ou apenas a que utilizar o filtro.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Ask']

        /*
            #swagger.parameters['question'] = {
                in: 'body',
                description: " Deverá informar o enunciado da questão, podendo digitar parte do nome (LIKE %_%) ou para pesquisar todos deixar com aspas vaizas.",
            schema: { $ref: "#/definitions/AskFindMany" }
            }
         */


        const { question } = req.body;

        const findManyAsk = new FindManyAskService();
        const result = await findManyAsk.execute({
            question: question
        })

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AskFindManyRes" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)
        // #swagger.end
    }
}

export { FindManyAskController }