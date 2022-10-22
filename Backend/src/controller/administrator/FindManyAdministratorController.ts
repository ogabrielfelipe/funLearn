import { Request, response, Response } from "express";
import { FindManyAdministratorService } from "../../service/administrator/FindManyAdministratorService";



class FindManyAdministratorController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/administrators'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para listar cadastro de todos ox administratores ou filtrar pelo nome. Busca só é efetuada somente com usuários administratores.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Administrator']

        /*
            #swagger.parameters['name'] = {
                in: 'body',
                description: " Deverá ser preenchido com o nome do administrator, caso queira listar todos deixar o campo com aspas vazias.", 
                schema: { $ref: "#/definitions/FindAdministratorsReq" } 
                    
            }
        */

        const { name } = req.body;
        const user = req.user;

        const findManyAdmin = new FindManyAdministratorService()
        const result = await findManyAdmin.execute({
            name: name,
            user: user
        })

        /* #swagger.responses[401] = { 
            description: 'Usuário não tem permissão para buscar os dados.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/FindAdministrators" } 
        } */

        return res.status(200).json(result)
    }
}

export { FindManyAdministratorController }