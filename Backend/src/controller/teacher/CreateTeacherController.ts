import { Request, Response } from "express";
import { CreateTeacherService } from "../../service/teacher/CreateTeacherService";


class CreateTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar um novo usuário professor.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['name', 'username', 'password', 'active'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                     username: Deverá ser preenchido com o nome de usuário a ser utilizado para fazer o login;  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login; \n
                    active: Deverá ser preenchido com o status do usuário. ",
                requerid: true,
                schema: { $ref: "#/definitions/Teacher" }        
            }
         */

        const { name, username, password, active } = req.body

        const createTeacherService = new CreateTeacherService();
        const result = await createTeacherService.execute({
            name: name,
            username: username,
            password: password,
            active: active
        })


        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AddTeacher" },
            description: 'Usuário professor cadastrada com sucesso.' 
        } */
        return res.status(200).json(result)

        // #swagger.end
    }
}

export { CreateTeacherController }