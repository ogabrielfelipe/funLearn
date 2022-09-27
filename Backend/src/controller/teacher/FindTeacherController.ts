import { Request, Response } from "express";
import { FindTeacherService } from "../../service/teacher/FindTeacherService";



class FindTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar os detalhes do cadastro do Professor. Para usuários Professores so poderá buscar os detalhes do cadastro do mesmo. Para Usuários Administradores poderá ver os detalhes de todos os cadastros.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['teacherID'] = {
                in: 'query',
                description: " Deverá ser preenchido com o identificador do Professor;",     
            }
        */

        const teacherID = req.query['teacherID'] as string

        const user = req.user

        const findTeacher = new FindTeacherService();
        const result = await findTeacher.execute({
            teacherID: teacherID,
            user: user
        })

        /* #swagger.responses[401] = { 
            description: 'Identificador do registro é necessário. \n Usuário não tem permissão para buscar os dados.' 
        } */

        /* #swagger.responses[404] = { 
            description: 'Usuário Professor não encontrado' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindTeacher" } 
        } */

        return res.status(200).json(result)
    }
}

export { FindTeacherController }