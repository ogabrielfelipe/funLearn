import { Request, response, Response } from "express";
import { ChangeThemeService } from "../../service/theme/ChangeThemesService";



class ChangeThemeController{
    async handle(req: Request, res: Response){


        // #swagger.start

        // #swagger.path = '/theme'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro de um tema.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Theme']

        /*
            #swagger.parameters[ 'id', 'name', 'description', 'teacherID', 'active'] = {
                in: 'body',
                description: " id: Deverá ser preenchido com o identificador da turma; \n 
                    name: Deverá ser preenchido com o nome do tema; \n
                    description: Deverá ser preenchido com a descrição do tema; \n
                    teacherID: Deverá ser preenchido com o identificador do professor; \n
                    active: Deverá ser preenchido informando se o tema está ativo ou não.",
                requerid: true,
                schema: { $ref: "#/definitions/ChangeTheme" }        
            }
         */


        const { id, name, description, teacherID, active } = req.body;

        const changeTheme = new ChangeThemeService();
        const result = await changeTheme.execute({
            id: id,
            name: name,
            description: description,
            teacherID: teacherID,
            active: active
        })

        /* #swagger.responses[404] = { 
            description: 'Turma não encontrada.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ChangeThemeRes" },
            description: 'Tema alterada com sucesso.' 
        } */


        return res.status(200).json(result)
    }
}

export { ChangeThemeController }