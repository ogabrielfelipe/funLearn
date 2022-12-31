import { Request, Response } from "express";
import { FindThemeService } from "../../service/theme/FindThemeService";



class FindThemeController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/theme/:themeID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar detalhadamente um tema.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Theme']

        /*
            #swagger.parameters[ 'themeID'] = {
                in: 'params',
                description: " themeID: Deverá ser preenchido com o identificador da turma.",
                requerid: true        
            }
         */

        const themeID = req.params.themeID as string;

        const findTheme = new FindThemeService();
        const result = await findTheme.execute(themeID);

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FindThemeRes" },
            description: 'Busca efetuada com sucesso.' 
        } */
    
        return res.status(200).json(result);
    }
}

export { FindThemeController }