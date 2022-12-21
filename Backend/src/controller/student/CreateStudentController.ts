import { Request, Response } from "express";
import { CreateStudentService } from "../../service/student/CreateStudentService";


class CreateStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/student'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar um novo usuário Estudente.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Student']

        /*
            #swagger.parameters['name', 'register', 'password', 'active', 'teamID'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                     register: Deverá ser preenchido com o numero de matrícula do aluno a ser utilizado para fazer o login;  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login; \n
                    active: Deverá ser preenchido com o status do usuário. \n
                    teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true,
                schema: { $ref: "#/definitions/student" }        
            }
         */

        const { name, register, password, active, teamID } = req.body

        const createService = new CreateStudentService();
        const result = await createService.execute({
            name: name,
            register: register,
            password: password,
            active: active,
            teamID: teamID
        })

        /* #swagger.responses[400] = { 
            description: 'Turma não encontrada ou Inativa' 
        } */
        /* #swagger.responses[401] = { 
            description: 'Senha inválida.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Addstudent" },
            description: 'Usuário estudente cadastrada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { CreateStudentController }