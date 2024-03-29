import { Request, Response } from "express";
import { AuthStudentService } from "../../service/student/AuthStudentService";



class AuthStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/student/auth'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para realizar o login do aluno. Token e o tipo de login é enviado no HEADER da resposta.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Student']

        /*
            #swagger.parameters['register', 'password'] = {
                in: 'body',
                description: " register: Deverá ser preenchido com numero de matricula do aluno a ser utilizado para fazer o login;  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login. ",
                requerid: true,            
                schema: { $ref: "#/definitions/Authstudent" }        
            }
         */

        const { register, password } = req.body;

        const authstudent = new AuthStudentService();
        const result = await authstudent.execute({
            register: register,
            password: password
        })


        /* #swagger.responses[401] = {            
            description: 'Número de matrícula ou senha incorreta' 
        } */
        /* #swagger.responses[403] = {            
            description: 'Aluno inativo.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AuthstudentRes" },
            description: 'Usuário autenticado com sucesso. \n
                Token é passado pelo header, nome da variável: "x-access-token". \n
                É passado tambem o tipo de usuário pelo Header: "x-access-type" \n
                Token com tempo de validade de 15 dias.
            ' 
        } */


        res.setHeader('x-access-token', result.token);
        res.setHeader('x-access-type', 'student')
        return res.status(200).json({
            id: result.id, 
            name: result.name,
            register: result.register,
            active: result.active
         })
        // #swagger.end
    }
}

export { AuthStudentController }