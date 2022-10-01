import { Request, Response } from "express";
import { DeleteAnswerService } from "../../service/answer/DeleteAnswerService";



class DeleteAnswerController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/answer'
        // #swagger.method = 'delete'
        // #swagger.description = 'Endpoint para excluir uma resposta da pergunta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Answer']

        /*
            #swagger.parameters['answerID'] = {
                in: 'query',
                description: "answerID: Deverá ser informado com o identificador da resposta.",
            }
         */

        const answerID = req.query['answerID'] as string;

        const deleteAnswer = new DeleteAnswerService();
        const result = await deleteAnswer.execute({
            askID: null,
            answerID: answerID
        })

        if (result?.count === 0){
            return res.status(200).json({ error: "Resposta não excluida."})
        }

        /* #swagger.responses[404] = { 
            description: 'Resposta não excluida.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = {
            description: 'Resposta excluida com sucesso.' 
        } */
        return res.status(200).json(result)

        // #swagger.end
    }
}

export { DeleteAnswerController }