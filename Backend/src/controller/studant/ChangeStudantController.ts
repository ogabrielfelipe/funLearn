import { Request, Response } from "express";
import { ChangeStudantService } from "../../service/studant/ChangeStudantService";



class ChangeStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studant'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro do Aluno.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

        /*
            #swagger.parameters['studantID', 'name', 'password', 'teamID', 'active'] = {
                in: 'body',
                description: " studantID: Deverá ser preenchido com o identificador do Aluno; \n
                    name: Deverá ser preenchido com o nome do aluno, caso queira que seja alterado ou deixe com aspas duplas vaizas; \n 
                    password:  Deverá ser preenchido com a nova senha do usuário, caso queira que seja alterado ou deixe com sapas duplas vaizas; \n 
                    active:  Deverá ser preenchido com o status do usuário, caso queira que seja alterado ou deixe com null. ",
                schema: { $ref: "#/definitions/StudantChange" }        
            }
         */

        const { studantID, name, password, teamID, active } = req.body;

        const changeStudant = new ChangeStudantService()
        const result = await changeStudant.execute({
            studantID: studantID,
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
            schema: { $ref: "#/definitions/StudantChangeRes" },
            description: 'Usuário administrador alterado com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end

    }
}

export { ChangeStudantController }