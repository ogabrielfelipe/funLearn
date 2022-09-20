import { Request, Response } from "express";
import { ChangeTeacherService } from "../../service/teacher/ChangeTeacherService";



class ChangeTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro do professor.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['id', 'name', 'password', 'active'] = {
                in: 'body',
                description: " id: Deverá ser preenchido com o identificador do usuário; \n
                    name: Deverá ser preenchido com o nome do usuário, caso queira que seja alterado ou deixe com aspas vaizas; \n 
                    password:  Deverá ser preenchido com a nova senha do usuário, caso queira que seja alterado ou deixe com aspas vaizas; \n 
                    active:  Deverá ser preenchido com o status do usuário, caso queira que seja alterado ou deixe com aspas vaizas. ",
                schema: { $ref: "#/definitions/TeacherChange" }        
            }
         */

        const { id, name, active, password } = req.body;

        const changeTeacherService = new ChangeTeacherService();
        const result = await changeTeacherService.execute({
            id: id,
            name: name,
            active: active,
            password: password
        })

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/TeacherChangeRes" },
            description: 'Usuário autenticado com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
    }
}

export { ChangeTeacherController }