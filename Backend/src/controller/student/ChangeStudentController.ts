import { Request, Response } from "express";
import { ChangeStudentService } from "../../service/student/ChangeStudentService";



class ChangestudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/student'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro do Aluno.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Student']

        /*
            #swagger.parameters['studentID', 'name', 'password', 'teamID', 'active'] = {
                in: 'body',
                description: " studentID: Deverá ser preenchido com o identificador do Aluno; \n
                    name: Deverá ser preenchido com o nome do aluno, caso queira que seja alterado ou deixe com aspas duplas vaizas; \n 
                    password:  Deverá ser preenchido com a nova senha do usuário, caso queira que seja alterado ou deixe com sapas duplas vaizas; \n 
                    active:  Deverá ser preenchido com o status do usuário, caso queira que seja alterado ou deixe com null. ",
                schema: { $ref: "#/definitions/studentChange" }        
            }
         */

        const { studentID, name, password, teamID, active } = req.body;

        const changestudent = new ChangeStudentService()
        const result = await changestudent.execute({
            studentID: studentID,
            name: name,
            password: password,
            teamID: teamID,
            active: active
        })


        /* #swagger.responses[404] = { 
            description: 'Aluno ou Turma não encontrado ou Aluno não encontrado no relacionamento com a Turma.' 
        } */

        /* #swagger.responses[401] = { 
            description: 'É necessário preencher a turma.' 
        } */

        /* #swagger.responses[403] = { 
            description: 'Turma Inativa.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/studentChangeRes" },
            description: 'Usuário administrator alterado com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end

    }
}

export { ChangestudentController }