import { Request, Response } from "express";
import { FindThemesByStudentService } from "../../service/theme/FindThemesByStudentService";



class FindThemesByStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/game/find/themes'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar todos os temas vinculado ao aluno logado.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Game']


        const findThemesByStudent = new FindThemesByStudentService();
        const result = await findThemesByStudent.execute({
            userRequest: req.user
        })

            /* #swagger.responses[403] = { 
                description: 'Usuário da requisição não é um aluno.\n ' 
            } */

            /* #swagger.responses[500] = { 
                description: 'Relacionado a erro de persistência no banco de dados.'

            } */
            /* #swagger.responses[200] = { 
                description: 'Busca efetuada com sucesso.',
                schema: { $ref: "#/definitions/FindThemesByStudentRes" }   
            } */

        return res.status(200).json(result);

    }
}

export { FindThemesByStudentController }