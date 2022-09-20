import { Request, Response } from "express";
import { AuthTeacherService } from "../../service/teacher/AuthTeacherService";



class AuthTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher/auth'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para realizar o login do professor. \n token é enviado no body da resposta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['username', 'password'] = {
                in: 'body',
                description: " username: Deverá ser preenchido com o nomde de usuário a ser utilizado para fazer o login;  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login. ",
                requerid: true,            
                schema: { $ref: "#/definitions/AuthTeacher" }        
            }
         */

        const { username, password } = req.body;

        const authTeacherService = new AuthTeacherService();
        const result = await authTeacherService.execute({
            username: username,
            password: password
        })

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AuthTeacherRes" },
            description: 'Usuário autenticado com sucesso.' 
        } */
        return res.status(200).json(result)

        // #swagger.end
    }
}

export { AuthTeacherController }