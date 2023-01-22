import { Request, Response } from "express";
import { DashBoardTeacherService } from "../../service/teacher/DashBoardTeacherService";



class DashBoardTeacherController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/teacher/dashboard/:teamID/:themeID'
        // #swagger.method = 'get'
        // #swagger.description = 'Endpoint para buscar informações para preencher o dashboard do professor.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Teacher']

        /*
            #swagger.parameters['teamID'] = {
                in: 'path',
                description: " teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true    
            }

            #swagger.parameters['themeID'] = {
                in: 'path',
                description: " themeID: Deverá ser preenchido com o identificador do tema.",
                requerid: true    
            }


        */


        const teamID = req.params.teamID as string;
        const themeID = req.params.themeID as string;

        const dashboardTeacher = new DashBoardTeacherService();
        const result = await dashboardTeacher.execute(teamID, themeID)


        /* #swagger.responses[404] = { 
            description: 'Turma não encontrada.\nTema não encontrado.' 
        } */

        /* #swagger.responses[500] = { 
            description: 'Relacionado a erro de persistência no banco de dados.'

        } */
        /* #swagger.responses[200] = { 
            description: 'Busca efetuada com sucesso.',
            schema: { $ref: "#/definitions/Dashboard" }   
        } */

        return res.status(200).json(result)
    }
}

export { DashBoardTeacherController }