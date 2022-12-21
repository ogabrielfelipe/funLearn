import { Request, Response } from "express";
import { FindStudentService } from "../../service/student/FindStudentService";



class FindStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/student'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar os detalhes do cadastro do aluno.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Student']

        /*
            #swagger.parameters['studentID'] = {
                in: 'query',
                description: " Deverá ser preenchido com o identificador do Aluno;",     
            }
        */

        const studentID = req.query['studentID'] as string

        const findstudent = new FindStudentService()
        const result = await findstudent.execute(studentID)

    
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
            schema: { $ref: "#/definitions/Findstudent" },
            description: 'Busca efetuada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { FindStudentController }