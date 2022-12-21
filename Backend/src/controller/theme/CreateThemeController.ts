import { Request, Response } from "express";
import { CreateThemeService } from "../../service/theme/CreateThemeService";



class CreateThemeController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/theme'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar um tema.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Theme']

        /*
            #swagger.parameters[ 'name', 'description', 'teacherID', 'teams', 'active'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do tema; \n
                    description: Deverá ser preenchido com a descrição do tema; \n
                    teacherID: Deverá ser preenchido com o identificador do professor; \n
                    teams: Deverá ser preenchido com uma lista de turmas a serem vinculadas; \n
                    active: Deverá ser preenchido informando se o tema está ativo ou não.",
                requerid: true,
                schema: { $ref: "#/definitions/CreateTheme" }        
            }
         */


        const { name, description, teacherID, teams, active } = req.body

        const createTheme = new CreateThemeService();
        const result = await createTheme.execute({
            name: name,
            description: description,
            teacherID: teacherID,
            teams:teams,
            active: active
        })

        
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
            } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/CreateThemeRes" },
            description: 'Tema cadastrada com sucesso.' 
        } */


        return res.status(200).json(result)
    }
}

export { CreateThemeController }