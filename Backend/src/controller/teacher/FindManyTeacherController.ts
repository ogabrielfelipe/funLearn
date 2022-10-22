import { Request, Response } from "express";
import { FindManyTeacherService } from "../../service/teacher/FindManyTeacherService";



class FindManyTeacherController{
    async handle (req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teachers'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar cadastro de todos os professores ou filtrar pelo nome. Busca só é efetuada somente com usuários administratores.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['name'] = {
                in: 'body',
                description: " Deverá ser preenchido com o nome do professor, caso queira listar todos deixar o campo com aspas vazias.", 
                schema: { $ref: "#/definitions/FindTeachersReq" } 
                    
            }
        */

        const { name } = req.body;
        const user = req.user;

        const findManyTeacher = new FindManyTeacherService()
        const result = await findManyTeacher.execute({
            name: name,
            user: user
        })

        /* #swagger.responses[401] = { 
            description: 'Usuário não tem permissão para buscar os dados.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindTeachers" } 
        } */

        return res.status(200).json(result)
        
    }
}

export { FindManyTeacherController }