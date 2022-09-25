import { Request, Response } from "express";
import { FindManyStudantService } from "../../service/studant/FindManyStudantService";



class FindManyStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studants'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar todos os estudantes. Este Endpoint pega o usuário da requisição e filtra somente os alunos que estão vinculados as turma do professor que está efetuando a busca, essa funcionalidade fica suspensa para os usuáruios administradores.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

         /*
            #swagger.parameters['name'] = {
                in: 'body',
                description: " Deverá ser preenchido com o nome do aluno do Aluno, função não diferencia Maiúsculo de Minúsculo e nem de Ordem de escrita (Like %_%).", 
            schema: { $ref: "#/definitions/FindStudants" },    
            }
         */

        const { name } = req.body;

        

        const findManyStudant = new FindManyStudantService();
        const result = await findManyStudant.execute({
            name: name,
            userRequest: req.user
        })

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FindStudantsRes" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)

    }   
}

export { FindManyStudantController }