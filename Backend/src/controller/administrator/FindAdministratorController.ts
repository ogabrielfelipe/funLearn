import { Request, Response } from "express";
import { FindAdministratorService } from "../../service/administrator/FindAdministratorService";



class FindAdministratorController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/administrator'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar os detalhes do cadastro do administrador. Busca só é efetuada somente com usuários administradores.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']

        /*
            #swagger.parameters['adminID'] = {
                in: 'query',
                description: " Deverá ser preenchido com o identificador do Administrador;",     
            }
        */

        const adminID = req.query['adminID'] as string;
        const user = req.user;

        const findAdmin = new FindAdministratorService()
        const result = await findAdmin.execute({
            adminID: adminID,
            user: user
        })

        /* #swagger.responses[401] = { 
            description: 'Identificador do registro é necessário. \n Usuário não tem permissão para buscar os dados.' 
        } */
        /* #swagger.responses[404] = { 
            description: 'Usuário Administrador não encontrado' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindAdministrator" } 
        } */

        return res.status(200).json(result)
    }
}

export { FindAdministratorController }