import { Request, Response } from "express";
import { FindManyStudentService } from "../../service/student/FindManyStudentService";



class FindManyStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/students'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar todos os estudentes. Este Endpoint pega o usuário da requisição e filtra somente os alunos que estão vinculados as turma do professor que está efetuando a busca, essa funcionalidade fica suspensa para os usuáruios administratores.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['student']

         /*
            #swagger.parameters['name'] = {
                in: 'body',
                description: " Deverá ser preenchido com o nome do aluno do Aluno, função não diferencia Maiúsculo de Minúsculo e nem de Ordem de escrita (Like %_%).", 
            schema: { $ref: "#/definitions/Findstudents" },    
            }
         */

        const { name } = req.body;

        

        const findManystudent = new FindManyStudentService();
        const result = await findManystudent.execute({
            name: name,
            userRequest: req.user
        })

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FindstudentsRes" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)

    }   
}

export { FindManyStudentController }