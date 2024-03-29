import { Request, Response } from "express";
import { AuthTeacherService } from "../../service/teacher/AuthTeacherService";



class AuthTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher/auth'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para realizar o login do professor. \n token é enviado no HEADER da resposta.'
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

        /* #swagger.responses[401] = {            
            description: 'Nome de usuário ou senha incorreta' 
        } */
        /* #swagger.responses[403] = {            
            description: 'Usuário inativo.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AuthTeacherRes" },
            description: 'Usuário autenticado com sucesso. \n
                Token é passado pelo header, nome da variável: "x-access-token". \n
                É passado tambem o tipo de usuário pelo Header: "x-access-type" \n
                Token com tempo de validade de 15 dias.
            ' 
        } */
        res.setHeader('x-access-token', result.token);
        res.setHeader('x-access-type', 'teacher')
        return res.status(200).json({
            id: result.id, 
            name: result.name,
            username: result.username,
            active: result.active
         })

        // #swagger.end
    }
}

export { AuthTeacherController }