import { Request, Response } from "express";
import xlsxFile from 'read-excel-file/node'
import { CreateManyStudentService } from "../../service/student/CreateManyStudentService";

class CreateManyStudentController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/student/many'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar usuários Estudentes através da importação de arquivo.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['student']

        /*
            #swagger.parameters['name', 'teamID'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                    teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true,
                schema: { $ref: "#/definitions/studentFile" }        
            }

            #swagger.parameters['file'] = {
                in: 'file',
                description: " file: Arquivo que deverá ser importado seguindo o modelo disponibilizado para importar os alunos.",
                requerid: true,      
            }
         */

        const { password, teamID } = req.body;
        console.log(password, teamID, req.file)

        const file = req.file;

        if (!file){
            throw new Error('file not found.')
        }

        if (password === "" || !password){
            throw new Error('password not sent.')
        }

        if (teamID === "" || !teamID){
            throw new Error('team not sent.')
        }

        const path = require('path')
        let fs = require('fs');
        const createstudents = new CreateManyStudentService();

        
        xlsxFile(path.resolve(`tmp/import/${file.filename}`)).then(async (rows) => {
            var listUsers = Array();
            rows.slice(3, rows.length).forEach( (row) => {
                listUsers.push( {
                        name: row[0].toString(), 
                        register: Number(row[1].toString()),
                        password: password,
                        active: true
                    } )
            })

            const result = await createstudents.execute({
                students: listUsers,
                teamID: teamID
            })

            fs.unlink(path.resolve(`tmp/import/${file.filename}`), (er: any) => {
                if (er) throw er;
            })

            /* #swagger.responses[404] = { 
                description: 'Turma não encontrada; \nTurma Inativa; \n Arquivo não importado. \n Turma ou Senha não enviada na requisição ' 
            } */

            /* #swagger.responses[500] = { 
                description: 'Relacionado a erro de persistência no banco de dados. \n **É necessário verificar o atributo CODE para verificar o status da requisição',
                schema: { $ref: "#/definitions/CreateManystudents500" }   

            } */
            /* #swagger.responses[200] = { 
                description: 'Usuários cadastrados com sucesso',
                schema: { $ref: "#/definitions/CreateManystudent200" }   
            } */

            //console.log(result)
            if(result.code === 500){
                return res.status(500).json(result)
            }

            return res.status(200).json(result)
        
        })     
        // #swagger.end
    }
}

export { CreateManyStudentController }
