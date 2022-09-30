import { Request, Response } from "express";
import xlsxFile from 'read-excel-file/node'
import { CreateManyStudantService } from "../../service/studant/CreateManyStudantService";
import { CreateStudantService } from "../../service/studant/CreateStudantService";

class CreateManyStudantController{
    async handle(req: Request, res: Response){

        // #swagger.start

        // #swagger.path = '/studant/many'
        // #swagger.method = 'post'
        // #swagger.description = 'Endpoint para cadastrar usuários Estudantes através da importação de arquivo.'
        // #swagger.produces = ["application/json"]
        // #swagger.tags = ['Studant']

        /*
            #swagger.parameters['name', 'teamID'] = {
                in: 'body',
                description: " name: Deverá ser preenchido com o nome do usuário; \n
                    teamID: Deverá ser preenchido com o identificador da turma.",
                requerid: true,
                schema: { $ref: "#/definitions/StudantFile" }        
            }

            #swagger.parameters['file'] = {
                in: 'file',
                description: " file: Arquivo que deverá ser importado seguindo o modelo disponibilizado para importar os alunos.",
                requerid: true,      
            }
         */

        const { password, teamID } = req.body;

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
        const createStudants = new CreateManyStudantService();

        
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

            const result = await createStudants.execute({
                studants: listUsers,
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
                schema: { $ref: "#/definitions/CreateManyStudants500" }   

            } */
            /* #swagger.responses[200] = { 
                description: 'Usuários cadastrados com sucesso',
                schema: { $ref: "#/definitions/CreateManyStudant200" }   
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

export { CreateManyStudantController }
