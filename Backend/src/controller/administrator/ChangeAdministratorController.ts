import { Request, Response } from "express";
import { ChangeAdministratorService } from "../../service/administrator/ChangeAdministratorService";



class ChangeAdministratorController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/admin'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro do Administrador.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']

        /*
            #swagger.parameters['id', 'name', 'password', 'active'] = {
                in: 'body',
                description: " id: Deverá ser preenchido com o identificador do usuário; \n
                    name: Deverá ser preenchido com o nome do usuário, caso queira que seja alterado ou deixe com aspas vaizas; \n 
                    password:  Deverá ser preenchido com a nova senha do usuário, caso queira que seja alterado ou deixe com aspas vaizas; \n 
                    active:  Deverá ser preenchido com o status do usuário, caso queira que seja alterado ou deixe com aspas vaizas. ",
                schema: { $ref: "#/definitions/AdministratorChange" }        
            }
         */

        const { id, name, active, password } = req.body;

        const adminChange = new ChangeAdministratorService();
        const result = await adminChange.execute({
            id: id,
            name: name,
            active: active,
            password: password
        })


        /* #swagger.responses[400] = { 
            description: 'Administrador não encontrado.' 
            } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AdministratorChangeRes" },
            description: 'Usuário administrador alterado com sucesso.' 
        } */

        return res.status(200).json(result)

        // #swagger.end
    }
}

export { ChangeAdministratorController }