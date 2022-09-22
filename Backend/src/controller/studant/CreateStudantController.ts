import { Request, Response } from "express";
import { CreateStudantService } from "../../service/studant/CreateStudantService";


class CreateStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studant'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar um novo usuário Estudante.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

        /*
            #swagger.parameters['name', 'register', 'password', 'active'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                     register: Deverá ser preenchido com o numero de matrícula do aluno a ser utilizado para fazer o login;  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login; \n
                    active: Deverá ser preenchido com o status do usuário. ",
                requerid: true,
                schema: { $ref: "#/definitions/Studant" }        
            }
         */

        const { name, register, password, active } = req.body

        const createService = new CreateStudantService();
        const result = await createService.execute({
            name: name,
            register: register,
            password: password,
            active: active
        })

         /* #swagger.responses[401] = { 
            description: 'Senha inválida.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AddStudant" },
            description: 'Usuário estudante cadastrada com sucesso.' 
        } */

        return res.status(200).json(result)
    }
}

export { CreateStudantController }