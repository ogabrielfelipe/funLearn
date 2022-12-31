import { Request, Response } from "express";
import { FindThemesService } from "../../service/theme/FindThemesService";



class FindThemesController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/themes'
        // #swagger.method = 'get'
        // #swagger.description = "Endpoint para buscar todos os temas por Professor, caso o usuário da requisição for administrador o parâmetro para filtrar por professor é desativado."
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Theme']

        /*
            #swagger.parameters[ 'name'] = {
                in: 'body',
                description: " name: Deve ser preenchido com o nome do tema, função (LIKE %_%). \nCaso queira listar todos só deixar vazio.",
                requerid: true,
                schema: { $ref: "#/definitions/FindThemeMany" }        
            }
        */

        const { name } = req.body;

        const findTheme = new FindThemesService()
        const result = await findTheme.execute({
            name: name,
            user: req.user
        })


        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FindThemeManyRes" },
            description: 'Busca efetuada com sucesso.' 
        } */


        return res.status(200).json(result)
    }
}

export { FindThemesController }