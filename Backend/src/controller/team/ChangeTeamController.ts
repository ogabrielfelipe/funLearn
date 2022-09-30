import { Request, Response } from "express";
import { ChangeTeamService } from "../../service/team/ChangeTeamService";



class ChangeTeamController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/team'
        // #swagger.method = 'put'
        // #swagger.description = 'Endpoint para alterar o cadastro da turma.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Team']

        /*
            #swagger.parameters['id','name', 'teacherID', 'active'] = {
                in: 'body',
                description: " id: Deverá ser preenchido com o identificador da turma que deseja realizar a alteração; \n 
                     name: Deverá ser preenchido com o nome da Turma; \n
                     teacherID: Deverá ser preenchido com o identificador do professor a ser vinculado na turma;  \n 
                     active: Deverá ser preenchido com o status da turma, se está ativa ou não. ",
                schema: { $ref: "#/definitions/TeamChange" }        
            }
         */

        const { id, name, active, teacherID } = req.body;

        const changeTeam = new ChangeTeamService();
        const result = await changeTeam.execute({
            id: id,
            name: name,
            active: active,
            teacherID: teacherID
        })

        /* #swagger.responses[404] = { 
            description: 'Turma não encontrada ou Professor não encontrado.' 
        } */
        /* #swagger.responses[403] = { 
            description: 'Professor inativo.' 
        } */
        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados ou erros internos.' 
        } */

        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/TeamRes" },
            description: 'Turma cadastrada com sucesso.' 
        } */


        return res.status(200).json(result)
        // #swagger.end
    }
}

export { ChangeTeamController }