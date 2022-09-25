import { Request, Response } from "express";
import { FindStudantService } from "../../service/studant/FindStudantService";



class FindStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studant'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar os detalhes do cadastro do aluno.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

        /*
            #swagger.parameters['studantID'] = {
                in: 'query',
                description: " Deverá ser preenchido com o identificador do Aluno;",     
            }
        */

        const studantID = req.query['studantID'] as string

        const findStudant = new FindStudantService()
        const result = await findStudant.execute(studantID)

    
        /* #swagger.responses[401] = { 
            description: 'É necessário preencher o identificador do Aluno.' 
        } */

        /* #swagger.responses[404] = { 
            description: 'Aluno não encontrado.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FindStudant" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { FindStudantController }