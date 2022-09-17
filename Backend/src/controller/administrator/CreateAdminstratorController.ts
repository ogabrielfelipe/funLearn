import { Request, Response } from "express";
import { CreateAdministratorService } from "../../service/administrator/CreateAdminstratorService";


class CreateAdministratorController{
    async handle(req: Request, res: Response) {

        // #swagger.start

        // #swagger.path = '/admin'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar um novo usuário administrador.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']

        /*
            #swagger.parameters['name', 'username', 'password'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário \n
                     username: Deverá ser preenchido com o nomde de usuário a ser utilizado para fazer o login  \n 
                     password:  Deverá ser preenchido com a senha a ser utilziada para realizar o login ",
                requerid: true            
            }


         */

        const { name, username, password } = req.body;

        const createAdmin = new CreateAdministratorService();
        const result = await createAdmin.execute({
            name: name,
            username: username,
            password: password
        })


        /* #swagger.responses[200] = { 
            description: 'Usuário administrador cadastrada com sucesso.' 
        } */
        return res.status(200).json(result)

        // #swagger.end
    }
}

export { CreateAdministratorController }