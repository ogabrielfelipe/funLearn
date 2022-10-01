import { Request, Response } from "express";
import { CreateTeamService } from "../../service/team/CreateTeamService";



class CreateTeamController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/team'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar uma nova turma.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Team']

        /*
            #swagger.parameters['name', 'teacherID', 'active'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome da Turma; \n
                     teacherID: Deverá ser preenchido com o identificador do professor a ser vinculado na turma;  \n 
                    active: Deverá ser preenchido com o status da turma, se está ativa ou não. ",
                schema: { $ref: "#/definitions/Team" }        
            }
         */

        const { name, active, teacherID } = req.body;

        const createTeam = new CreateTeamService();
        const result = await createTeam.execute({
            name: name,
            active: active,
            teacherID: teacherID
        })

        /* #swagger.responses[404] = { 
            description: 'Professor não encontrado.' 
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

export { CreateTeamController }